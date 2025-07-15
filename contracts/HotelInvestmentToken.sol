// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title HotelInvestmentToken
 * @dev ERC-20 token representing fractional ownership in hotel assets
 * Each hotel property has its own investment token for fractional ownership
 */
contract HotelInvestmentToken is ERC20, Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    struct HotelInvestment {
        uint256 hotelAssetId;
        string hotelName;
        string location;
        uint256 totalSupply;
        uint256 pricePerToken;
        uint256 minInvestment;
        uint256 maxInvestment;
        uint256 expectedReturn; // Annual return percentage (in basis points, 1000 = 10%)
        uint256 fundingGoal;
        uint256 currentFunding;
        uint256 fundingDeadline;
        bool isActive;
        bool isFunded;
        address hotelAssetContract;
    }
    
    HotelInvestment public hotelInvestment;
    
    mapping(address => uint256) public investmentAmounts;
    mapping(address => uint256) public investmentTimestamps;
    address[] public investors;
    
    event InvestmentMade(
        address indexed investor,
        uint256 amount,
        uint256 tokens,
        uint256 timestamp
    );
    
    event DividendPaid(
        address indexed investor,
        uint256 amount,
        uint256 timestamp
    );
    
    event FundingGoalReached(
        uint256 totalFunding,
        uint256 timestamp
    );
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _hotelAssetId,
        string memory _hotelName,
        string memory _location,
        uint256 _totalSupply,
        uint256 _pricePerToken,
        uint256 _minInvestment,
        uint256 _maxInvestment,
        uint256 _expectedReturn,
        uint256 _fundingGoal,
        uint256 _fundingDuration,
        address _hotelAssetContract
    ) ERC20(_name, _symbol) {
        hotelInvestment = HotelInvestment({
            hotelAssetId: _hotelAssetId,
            hotelName: _hotelName,
            location: _location,
            totalSupply: _totalSupply,
            pricePerToken: _pricePerToken,
            minInvestment: _minInvestment,
            maxInvestment: _maxInvestment,
            expectedReturn: _expectedReturn,
            fundingGoal: _fundingGoal,
            currentFunding: 0,
            fundingDeadline: block.timestamp + _fundingDuration,
            isActive: true,
            isFunded: false,
            hotelAssetContract: _hotelAssetContract
        });
    }
    
    /**
     * @dev Invest in hotel by purchasing tokens
     */
    function invest() public payable nonReentrant {
        require(hotelInvestment.isActive, "Investment not active");
        require(block.timestamp <= hotelInvestment.fundingDeadline, "Funding period ended");
        require(msg.value >= hotelInvestment.minInvestment, "Below minimum investment");
        require(msg.value <= hotelInvestment.maxInvestment, "Above maximum investment");
        require(
            hotelInvestment.currentFunding.add(msg.value) <= hotelInvestment.fundingGoal,
            "Would exceed funding goal"
        );
        
        uint256 tokensToMint = msg.value.div(hotelInvestment.pricePerToken);
        require(tokensToMint > 0, "Investment too small");
        
        // Update investment tracking
        if (investmentAmounts[msg.sender] == 0) {
            investors.push(msg.sender);
            investmentTimestamps[msg.sender] = block.timestamp;
        }
        
        investmentAmounts[msg.sender] = investmentAmounts[msg.sender].add(msg.value);
        hotelInvestment.currentFunding = hotelInvestment.currentFunding.add(msg.value);
        
        // Mint tokens to investor
        _mint(msg.sender, tokensToMint);
        
        emit InvestmentMade(msg.sender, msg.value, tokensToMint, block.timestamp);
        
        // Check if funding goal is reached
        if (hotelInvestment.currentFunding >= hotelInvestment.fundingGoal) {
            hotelInvestment.isFunded = true;
            emit FundingGoalReached(hotelInvestment.currentFunding, block.timestamp);
        }
    }
    
    /**
     * @dev Distribute dividends to token holders
     */
    function distributeDividends() public payable onlyOwner {
        require(msg.value > 0, "No dividends to distribute");
        require(totalSupply() > 0, "No tokens issued");
        
        uint256 dividendPerToken = msg.value.div(totalSupply());
        
        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint256 investorTokens = balanceOf(investor);
            
            if (investorTokens > 0) {
                uint256 dividendAmount = investorTokens.mul(dividendPerToken);
                
                if (dividendAmount > 0) {
                    payable(investor).transfer(dividendAmount);
                    emit DividendPaid(investor, dividendAmount, block.timestamp);
                }
            }
        }
    }
    
    /**
     * @dev Calculate investor's share percentage
     */
    function getInvestorShare(address investor) public view returns (uint256) {
        if (totalSupply() == 0) return 0;
        return balanceOf(investor).mul(10000).div(totalSupply()); // Return in basis points
    }
    
    /**
     * @dev Get investment details for an investor
     */
    function getInvestorDetails(address investor) public view returns (
        uint256 investmentAmount,
        uint256 tokenBalance,
        uint256 sharePercentage,
        uint256 investmentDate
    ) {
        return (
            investmentAmounts[investor],
            balanceOf(investor),
            getInvestorShare(investor),
            investmentTimestamps[investor]
        );
    }
    
    /**
     * @dev Get hotel investment details
     */
    function getHotelInvestmentDetails() public view returns (HotelInvestment memory) {
        return hotelInvestment;
    }
    
    /**
     * @dev Get funding progress percentage
     */
    function getFundingProgress() public view returns (uint256) {
        if (hotelInvestment.fundingGoal == 0) return 0;
        return hotelInvestment.currentFunding.mul(100).div(hotelInvestment.fundingGoal);
    }
    
    /**
     * @dev Get all investors
     */
    function getAllInvestors() public view returns (address[] memory) {
        return investors;
    }
    
    /**
     * @dev Get number of investors
     */
    function getInvestorCount() public view returns (uint256) {
        return investors.length;
    }
    
    /**
     * @dev Update expected return (only owner)
     */
    function updateExpectedReturn(uint256 _newReturn) public onlyOwner {
        hotelInvestment.expectedReturn = _newReturn;
    }
    
    /**
     * @dev Toggle investment active status (only owner)
     */
    function toggleInvestmentActive() public onlyOwner {
        hotelInvestment.isActive = !hotelInvestment.isActive;
    }
    
    /**
     * @dev Extend funding deadline (only owner)
     */
    function extendFundingDeadline(uint256 _additionalTime) public onlyOwner {
        hotelInvestment.fundingDeadline = hotelInvestment.fundingDeadline.add(_additionalTime);
    }
    
    /**
     * @dev Emergency withdrawal (only if funding goal not reached and deadline passed)
     */
    function emergencyWithdraw() public nonReentrant {
        require(
            !hotelInvestment.isFunded && block.timestamp > hotelInvestment.fundingDeadline,
            "Cannot withdraw: funding successful or deadline not reached"
        );
        require(investmentAmounts[msg.sender] > 0, "No investment to withdraw");
        
        uint256 investmentAmount = investmentAmounts[msg.sender];
        uint256 tokenBalance = balanceOf(msg.sender);
        
        // Reset investor data
        investmentAmounts[msg.sender] = 0;
        _burn(msg.sender, tokenBalance);
        
        // Transfer investment back to investor
        payable(msg.sender).transfer(investmentAmount);
    }
    
    /**
     * @dev Withdraw contract funds (only owner, only if funded)
     */
    function withdrawFunds() public onlyOwner {
        require(hotelInvestment.isFunded, "Funding goal not reached");
        require(address(this).balance > 0, "No funds to withdraw");
        
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}