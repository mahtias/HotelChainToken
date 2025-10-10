// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {HotelInvestmentManager} from "./HotelInvestmentManager.sol";

contract HotelRoyaltyManager is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    HotelInvestmentManager public investmentManager;

    struct RevenueStream {
        uint256 poolId;
        uint256 totalRevenue;
        uint256 totalDistributed;
        uint256 lastDistribution;
        uint256 distributionFrequency;
        uint256 platformFee;
        bool isActive;
    }

    mapping(uint256 => RevenueStream) public revenueStreams;
    mapping(uint256 => uint256) public totalHotelRevenue;
    uint256 public totalPlatformFees;

    event RevenueDistributed(
        uint256 indexed poolId, uint256 totalAmount, uint256 platformFee, uint256 investorAmount, uint256 timestamp
    );

    constructor(address _investmentManager) {
        investmentManager = HotelInvestmentManager(_investmentManager);
    }

    function createRevenueStream(uint256 _poolId, uint256 _distributionFrequency, uint256 _platformFee)
        public
        onlyOwner
    {
        require(_platformFee <= 2000, "Max 20%");
        revenueStreams[_poolId] = RevenueStream({
            poolId: _poolId,
            totalRevenue: 0,
            totalDistributed: 0,
            lastDistribution: block.timestamp,
            distributionFrequency: _distributionFrequency,
            platformFee: _platformFee,
            isActive: true
        });
    }

    function addBookingRevenue(uint256 _poolId) public payable {
        require(msg.value > 0, "Revenue must be > 0");
        RevenueStream storage stream = revenueStreams[_poolId];
        require(stream.isActive, "Stream not active");

        stream.totalRevenue = stream.totalRevenue.add(msg.value);
        totalHotelRevenue[_poolId] = totalHotelRevenue[_poolId].add(msg.value);
    }

    function distributeRevenue(uint256 _poolId) public nonReentrant {
        RevenueStream storage stream = revenueStreams[_poolId];
        require(stream.isActive, "Stream inactive");
        require(block.timestamp >= stream.lastDistribution + stream.distributionFrequency, "Frequency not met");

        uint256 pendingRevenue = stream.totalRevenue.sub(stream.totalDistributed);
        require(pendingRevenue > 0, "No revenue");

        uint256 platformFee = pendingRevenue.mul(stream.platformFee).div(10000);
        uint256 investorAmount = pendingRevenue.sub(platformFee);

        stream.totalDistributed = stream.totalDistributed.add(pendingRevenue);
        stream.lastDistribution = block.timestamp;
        totalPlatformFees = totalPlatformFees.add(platformFee);

        // ✅ Call distributeDividends on HotelInvestmentManager

        investmentManager.distributeDividends{value: investorAmount}(_poolId);
        emit RevenueDistributed(_poolId, pendingRevenue, platformFee, investorAmount, block.timestamp);
    }
}
