// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ChainlinkPriceOracle is Ownable, ReentrancyGuard {
    struct PriceFeed {
        AggregatorV3Interface priceFeed;
        uint8 decimals;
        string description;
        bool isActive;
    }

    mapping(string => PriceFeed) public priceFeeds;
    string[] public supportedAssets;

    event PriceFeedAdded(string indexed asset, address indexed priceFeedAddress, uint8 decimals, string description);
    event PriceFeedUpdated(string indexed asset, address indexed newPriceFeedAddress, uint8 decimals);
    event PriceFeedDeactivated(string indexed asset);

    constructor() {
        _addPriceFeed("ETH", 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419, "ETH / USD");
        _addPriceFeed("BTC", 0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c, "BTC / USD");
        _addPriceFeed("LINK", 0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c, "LINK / USD");
        _addPriceFeed("USDC", 0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6, "USDC / USD");
    }

    function addPriceFeed(string memory asset, address priceFeedAddress, string memory description) public onlyOwner {
        _addPriceFeed(asset, priceFeedAddress, description);
    }

    function _addPriceFeed(string memory asset, address priceFeedAddress, string memory description) internal {
        require(priceFeedAddress != address(0), "Invalid price feed address");

        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        uint8 decimals = priceFeed.decimals();

        priceFeeds[asset] =
            PriceFeed({priceFeed: priceFeed, decimals: decimals, description: description, isActive: true});

        bool exists = false;
        for (uint256 i = 0; i < supportedAssets.length; i++) {
            if (keccak256(bytes(supportedAssets[i])) == keccak256(bytes(asset))) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            supportedAssets.push(asset);
        }

        emit PriceFeedAdded(asset, priceFeedAddress, decimals, description);
    }

    function getLatestPrice(string memory asset) public view returns (int256 price, uint256 updatedAt) {
        PriceFeed memory feed = priceFeeds[asset];
        require(feed.isActive, "Price feed not active");

        (
            , // roundId
            int256 price_,
            , // startedAt
            uint256 timeStamp,
            // answeredInRound
        ) = feed.priceFeed.latestRoundData();
        return (price_, timeStamp);
    }

    function getPriceWithDecimals(string memory asset) public view returns (int256, uint8, uint256) {
        PriceFeed memory feed = priceFeeds[asset];
        require(feed.isActive, "Price feed not active");

        (int256 price, uint256 updatedAt) = getLatestPrice(asset);
        return (price, feed.decimals, updatedAt);
    }

    function getPriceInUsd(string memory asset) public view virtual returns (uint256) {
        (int256 price, uint8 decimals,) = getPriceWithDecimals(asset);

        if (decimals < 18) {
            return uint256(price) * (10 ** (18 - decimals));
        } else if (decimals > 18) {
            return uint256(price) / (10 ** (decimals - 18));
        }

        return uint256(price);
    }

    function calculateUsdValue(string memory asset, uint256 amount) public view returns (uint256) {
        uint256 priceInUsd = getPriceInUsd(asset);
        return (amount * priceInUsd) / 1e18;
    }

    function calculateAssetAmount(string memory asset, uint256 usdValue) public view returns (uint256) {
        uint256 priceInUsd = getPriceInUsd(asset);
        return (usdValue * 1e18) / priceInUsd;
    }

    function getPriceFeedInfo(string memory asset)
        public
        view
        returns (address priceFeedAddress, uint8 decimals, string memory description, bool isActive)
    {
        PriceFeed memory feed = priceFeeds[asset];
        return (address(feed.priceFeed), feed.decimals, feed.description, feed.isActive);
    }

    function getHistoricalPrice(string memory asset, uint80 roundId)
        public
        view
        returns (int256 price, uint256 timestamp)
    {
        PriceFeed memory feed = priceFeeds[asset];
        require(feed.isActive, "Price feed not active");

        (
            , // id
            int256 historicalPrice,
            , // startedAt
            uint256 updatedAt,
            // answeredInRound
        ) = feed.priceFeed.getRoundData(roundId);

        require(historicalPrice > 0, "Invalid historical price");
        return (historicalPrice, updatedAt);
    }

    function getMultiplePrices(string[] memory assets)
        public
        view
        returns (int256[] memory prices, uint256[] memory timestamps)
    {
        prices = new int256[](assets.length);
        timestamps = new uint256[](assets.length);

        for (uint256 i = 0; i < assets.length; i++) {
            (prices[i], timestamps[i]) = getLatestPrice(assets[i]);
        }
    }

    function isPriceStale(string memory asset, uint256 maxAge) public view returns (bool) {
        (, uint256 updatedAt) = getLatestPrice(asset);
        return (block.timestamp - updatedAt) > maxAge;
    }

    function getSupportedAssets() public view returns (string[] memory) {
        return supportedAssets;
    }

    function updatePriceFeed(string memory asset, address newPriceFeedAddress, string memory description)
        public
        onlyOwner
    {
        require(priceFeeds[asset].isActive, "Price feed does not exist");

        AggregatorV3Interface newPriceFeed = AggregatorV3Interface(newPriceFeedAddress);
        uint8 decimals = newPriceFeed.decimals();

        priceFeeds[asset].priceFeed = newPriceFeed;
        priceFeeds[asset].decimals = decimals;
        priceFeeds[asset].description = description;

        emit PriceFeedUpdated(asset, newPriceFeedAddress, decimals);
    }

    function deactivatePriceFeed(string memory asset) public onlyOwner {
        require(priceFeeds[asset].isActive, "Price feed already inactive");
        priceFeeds[asset].isActive = false;

        emit PriceFeedDeactivated(asset);
    }

    function reactivatePriceFeed(string memory asset) public onlyOwner {
        require(!priceFeeds[asset].isActive, "Price feed already active");
        priceFeeds[asset].isActive = true;
    }

    function batchUpdatePriceFeeds(string[] memory assets, address[] memory newAddresses, string[] memory descriptions)
        public
        onlyOwner
    {
        require(assets.length == newAddresses.length, "Arrays length mismatch");
        require(assets.length == descriptions.length, "Arrays length mismatch");

        for (uint256 i = 0; i < assets.length; i++) {
            updatePriceFeed(assets[i], newAddresses[i], descriptions[i]);
        }
    }
}
