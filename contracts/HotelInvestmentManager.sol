// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {HotelAssetToken} from "./HotelAssetToken.sol";
import {HotelInvestmentToken} from "./HotelInvestmentToken.sol";
import {ChainlinkPriceOracle} from "./ChainlinkPriceOracle.sol";
import {HotelCompliance} from "./HotelCompliance.sol";

contract HotelInvestmentManager is Ownable, ReentrancyGuard {
    ChainlinkPriceOracle public priceOracle;
    HotelAssetToken public hotelAssetToken;
    HotelCompliance public compliance;

    struct InvestmentPool {
        uint256 hotelAssetId;
        address investmentToken;
        uint256 totalInvested;
        uint256 startTime;
        uint256 endTime;
        uint256 targetAmount;
        bool isActive;
        uint256 minInvestment;
    }

    mapping(uint256 => InvestmentPool) public investmentPools;
    mapping(address => uint256) public userInvestments;

    constructor(address _hotelAssetToken, address _priceOracleAddress, address _complianceAddress) {
        hotelAssetToken = HotelAssetToken(_hotelAssetToken);
        priceOracle = ChainlinkPriceOracle(_priceOracleAddress);
        compliance = HotelCompliance(_complianceAddress);
    }

    function getHotelValueInUsd(uint256 _poolId) public view returns (uint256) {
        InvestmentPool memory pool = investmentPools[_poolId];
        HotelAssetToken.HotelAsset memory asset = hotelAssetToken.getHotelAsset(pool.hotelAssetId);
        return asset.totalValue; // Placeholder: Use priceOracle if needed
    }

    function getInvestmentValueInUsd(uint256 _ethAmount) public view returns (uint256) {
        uint256 ethPriceInUsd = priceOracle.getPriceInUsd("ETH");
        return (_ethAmount * ethPriceInUsd) / 1e18;
    }

    function calculateEthForUsdInvestment(uint256 _usdAmount) public view returns (uint256) {
        uint256 ethPriceInUsd = priceOracle.getPriceInUsd("ETH");
        return (_usdAmount * 1e18) / ethPriceInUsd;
    }

    function invest(uint256 poolId) public payable returns (bool) {
        require(msg.value > 0, "Must send ETH");
        require(compliance.checkCompliance(msg.sender), "KYC not approved");
        hotelAssetToken.transferFrom(msg.sender, address(this), poolId);
        userInvestments[msg.sender] += msg.value;
        investmentPools[poolId].totalInvested += msg.value;
        return true;
    }

    function getInvestmentPoolStruct(uint256 poolId) public view returns (InvestmentPool memory) {
        return investmentPools[poolId];
    }

    function getUserTotalInvestment(address user) public view returns (uint256) {
        return userInvestments[user];
    }

    function distributeDividends(uint256 _poolId) public payable {
        require(investmentPools[_poolId].isActive, "Pool not active");
        // Placeholder: Implement dividend distribution logic
        // For now, just emit an event to confirm function call
        emit DividendsDistributed(_poolId, msg.value);
    }

    event DividendsDistributed(uint256 indexed poolId, uint256 amount);
}
