// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./HotelInvestmentManager.sol";

/**
 * @title HotelRoyaltyManager
 * @dev Manages revenue distribution and royalty payments for hotel assets
 * Handles booking fees, revenue sharing, and automatic dividend distribution
 */
contract HotelRoyaltyManager is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    HotelInvestmentManager public investmentManager;
    
    struct RevenueStream {
        uint256 poolId;
        uint256 totalRevenue;
        uint256 totalDistributed;
        uint256 lastDistribution;
        uint256 distributionFrequency; // in seconds
        uint256 platformFee; // in basis points (100 = 1%)
        bool isActive;
    }
    
    struct BookingRevenue {
        uint256 poolId;
        uint256 amount;
        uint256 timestamp;
        address booker;
        string bookingReference;
    }
    
    mapping(uint256 => RevenueStream) public revenueStreams;
    mapping(uint256 => BookingRevenue[]) public bookingHistory;
    mapping(uint256 => uint256) public totalHotelRevenue;
    
    uint256 public platformFeeRate = 500; // 5% platform fee
    uint256 public totalPlatformFees;
    
    event RevenueStreamCreated(
        uint256 indexed poolId,
        uint256 distributionFrequency,
        uint256 platformFee
    );
    
    event BookingRevenueAdded(
        uint256 indexed poolId,
        uint256 amount,
        address indexed booker,
        string bookingReference
    );
    
    event RevenueDistributed(
        uint256 indexed poolId,
        uint256 totalAmount,
        uint256 platformFee,
        uint256 investorAmount,
        uint256 timestamp
    );
    
    event PlatformFeesWithdrawn(
        uint256 amount,
        address indexed recipient
    );
    
    constructor(address _investmentManager) {
        investmentManager = HotelInvestmentManager(_investmentManager);
    }
    
    /**
     * @dev Create a revenue stream for a hotel investment pool
     */
    function createRevenueStream(
        uint256 _poolId,
        uint256 _distributionFrequency,
        uint256 _platformFee
    ) public onlyOwner {
        require(_platformFee <= 2000, "Platform fee cannot exceed 20%");
        
        revenueStreams[_poolId] = RevenueStream({
            poolId: _poolId,
            totalRevenue: 0,
            totalDistributed: 0,
            lastDistribution: block.timestamp,
            distributionFrequency: _distributionFrequency,
            platformFee: _platformFee,
            isActive: true
        });
        
        emit RevenueStreamCreated(_poolId, _distributionFrequency, _platformFee);
    }
    
    /**
     * @dev Add booking revenue to a hotel pool
     */
    function addBookingRevenue(
        uint256 _poolId,
        string memory _bookingReference,
        address _booker
    ) public payable nonReentrant {
        require(msg.value > 0, "Revenue amount must be greater than 0");
        require(revenueStreams[_poolId].isActive, "Revenue stream not active");
        
        // Record booking revenue
        bookingHistory[_poolId].push(BookingRevenue({
            poolId: _poolId,
            amount: msg.value,
            timestamp: block.timestamp,
            booker: _booker,
            bookingReference: _bookingReference
        }));
        
        // Update revenue stream
        revenueStreams[_poolId].totalRevenue = revenueStreams[_poolId].totalRevenue.add(msg.value);
        totalHotelRevenue[_poolId] = totalHotelRevenue[_poolId].add(msg.value);
        
        emit BookingRevenueAdded(_poolId, msg.value, _booker, _bookingReference);
    }
    
    /**
     * @dev Distribute accumulated revenue to investors
     */
    function distributeRevenue(uint256 _poolId) public nonReentrant {
        RevenueStream storage stream = revenueStreams[_poolId];
        require(stream.isActive, "Revenue stream not active");
        require(
            block.timestamp >= stream.lastDistribution.add(stream.distributionFrequency),
            "Distribution frequency not met"
        );
        
        uint256 pendingRevenue = stream.totalRevenue.sub(stream.totalDistributed);
        require(pendingRevenue > 0, "No revenue to distribute");
        
        // Calculate platform fee
        uint256 platformFee = pendingRevenue.mul(stream.platformFee).div(10000);
        uint256 investorAmount = pendingRevenue.sub(platformFee);
        
        // Update tracking
        stream.totalDistributed = stream.totalDistributed.add(pendingRevenue);
        stream.lastDistribution = block.timestamp;
        totalPlatformFees = totalPlatformFees.add(platformFee);
        
        // Distribute to investors through investment manager
        investmentManager.distributeDividends{value: investorAmount}(_poolId);
        
        emit RevenueDistributed(_poolId, pendingRevenue, platformFee, investorAmount, block.timestamp);
    }
    
    /**
     * @dev Auto-distribute revenue if conditions are met
     */
    function autoDistributeRevenue(uint256 _poolId) public {
        RevenueStream storage stream = revenueStreams[_poolId];
        
        if (stream.isActive && 
            block.timestamp >= stream.lastDistribution.add(stream.distributionFrequency) &&
            stream.totalRevenue.sub(stream.totalDistributed) > 0) {
            distributeRevenue(_poolId);
        }
    }
    
    /**
     * @dev Batch auto-distribute for multiple pools
     */
    function batchAutoDistribute(uint256[] memory _poolIds) public {
        for (uint256 i = 0; i < _poolIds.length; i++) {
            autoDistributeRevenue(_poolIds[i]);
        }
    }
    
    /**
     * @dev Get revenue stream details
     */
    function getRevenueStream(uint256 _poolId) public view returns (RevenueStream memory) {
        return revenueStreams[_poolId];
    }
    
    /**
     * @dev Get booking history for a pool
     */
    function getBookingHistory(uint256 _poolId) public view returns (BookingRevenue[] memory) {
        return bookingHistory[_poolId];
    }
    
    /**
     * @dev Get pending revenue for distribution
     */
    function getPendingRevenue(uint256 _poolId) public view returns (uint256) {
        RevenueStream memory stream = revenueStreams[_poolId];
        return stream.totalRevenue.sub(stream.totalDistributed);
    }
    
    /**
     * @dev Get revenue statistics for a pool
     */
    function getRevenueStats(uint256 _poolId) public view returns (
        uint256 totalRevenue,
        uint256 totalDistributed,
        uint256 pendingRevenue,
        uint256 averageBookingAmount,
        uint256 totalBookings
    ) {
        RevenueStream memory stream = revenueStreams[_poolId];
        BookingRevenue[] memory bookings = bookingHistory[_poolId];
        
        uint256 avgBooking = 0;
        if (bookings.length > 0) {
            avgBooking = stream.totalRevenue.div(bookings.length);
        }
        
        return (
            stream.totalRevenue,
            stream.totalDistributed,
            stream.totalRevenue.sub(stream.totalDistributed),
            avgBooking,
            bookings.length
        );
    }
    
    /**
     * @dev Get time until next distribution
     */
    function getTimeUntilNextDistribution(uint256 _poolId) public view returns (uint256) {
        RevenueStream memory stream = revenueStreams[_poolId];
        uint256 nextDistribution = stream.lastDistribution.add(stream.distributionFrequency);
        
        if (block.timestamp >= nextDistribution) {
            return 0;
        }
        
        return nextDistribution.sub(block.timestamp);
    }
    
    /**
     * @dev Update distribution frequency (only owner)
     */
    function updateDistributionFrequency(uint256 _poolId, uint256 _newFrequency) public onlyOwner {
        revenueStreams[_poolId].distributionFrequency = _newFrequency;
    }
    
    /**
     * @dev Update platform fee rate (only owner)
     */
    function updatePlatformFeeRate(uint256 _newRate) public onlyOwner {
        require(_newRate <= 2000, "Platform fee cannot exceed 20%");
        platformFeeRate = _newRate;
    }
    
    /**
     * @dev Update pool platform fee (only owner)
     */
    function updatePoolPlatformFee(uint256 _poolId, uint256 _newFee) public onlyOwner {
        require(_newFee <= 2000, "Platform fee cannot exceed 20%");
        revenueStreams[_poolId].platformFee = _newFee;
    }
    
    /**
     * @dev Toggle revenue stream active status (only owner)
     */
    function toggleRevenueStreamActive(uint256 _poolId) public onlyOwner {
        revenueStreams[_poolId].isActive = !revenueStreams[_poolId].isActive;
    }
    
    /**
     * @dev Withdraw platform fees (only owner)
     */
    function withdrawPlatformFees() public onlyOwner {
        require(totalPlatformFees > 0, "No platform fees to withdraw");
        
        uint256 amount = totalPlatformFees;
        totalPlatformFees = 0;
        
        payable(owner()).transfer(amount);
        
        emit PlatformFeesWithdrawn(amount, owner());
    }
    
    /**
     * @dev Emergency withdrawal (only owner)
     */
    function emergencyWithdraw() public onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Get total platform fees earned
     */
    function getTotalPlatformFees() public view returns (uint256) {
        return totalPlatformFees;
    }
}