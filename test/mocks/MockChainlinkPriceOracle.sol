// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockChainlinkPriceOracle {
    int256 public mockPrice;
    uint256 public mockTimestamp;
    uint8 public decimals;
   
   

    constructor (int256 _initialPrice) {
        mockPrice = _initialPrice;
        mockTimestamp = block.timestamp;
        decimals = 8; // Mimics Chainlink's ETH/USD feed
    }

    function getPriceInUsd(string memory /*asset*/) external view returns (uint256) {
        return uint256(mockPrice) * (10 ** (18 - decimals));
    }

    function getLatestPrice(string memory /*asset*/) external view returns (int256 price, uint256 updatedAt) {
        return (mockPrice, mockTimestamp);
    }

    function calculateUsdValue(string memory asset, uint256 amount) external view returns (uint256) {
        uint256 priceInUsd = this.getPriceInUsd(asset);
        return (amount * priceInUsd) / 1e18;
    }

    function setMockPrice(int256 _newPrice) external {
        mockPrice = _newPrice;
        mockTimestamp = block.timestamp;
    }
}