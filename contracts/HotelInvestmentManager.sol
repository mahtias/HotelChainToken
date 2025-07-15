// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./HotelAssetToken.sol";
import "./HotelInvestmentToken.sol";
import "./ChainlinkPriceOracle.sol";

/**
 * @title HotelInvestmentManager
 * @dev Main contract for managing hotel asset tokenization and investments
 * Coordinates between hotel assets (NFTs) and investment tokens (ERC-20)
 */
contract HotelInvestmentManager is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    HotelAssetToken public hotelAssetToken;
    ChainlinkPriceOracle public priceOracle;
    
    struct InvestmentPool {
        uint256 hotelAssetId;
        address investmentToken;
        string hotelName;
        string location;
        uint256 totalValue;
        uint256 fundingGoal;
        uint256 currentFunding;
        uint256 minInvestment;
        uint256 expectedReturn;
        uint256 createdAt;
        uint256 fundingDeadline;
        bool isActive;
        bool isFunded;
        address creator;
    }
    
    mapping(uint256 => InvestmentPool) public investmentPools;
    mapping(address => uint256[]) public userInvestments;
    mapping(address => uint256) public totalUserInvestments;
    
    uint256 public poolCounter;
    uint256 public totalValueLocked;
    uint256 public totalInvestors;
    
    event InvestmentPoolCreated(
        uint256 indexed poolId,
        uint256 indexed hotelAssetId,
        address indexed investmentToken,
        string hotelName,
        uint256 fundingGoal
    );
    
    event InvestmentMade(
        uint256 indexed poolId,
        address indexed investor,
        uint256 amount,
        uint256 timestamp
    );
    
    event PoolFunded(
        uint256 indexed poolId,
        uint256 totalFunding,
        uint256 timestamp
    );
    
    event DividendsDistributed(
        uint256 indexed poolId,
        uint256 totalAmount,
        uint256 timestamp
    );
    
    constructor(address _hotelAssetToken, address _priceOracleAddress) {
        hotelAssetToken = HotelAssetToken(_hotelAssetToken);
        priceOracle = ChainlinkPriceOracle(_priceOracleAddress);
    }
    
    /**
     * @dev Create a new investment pool for a hotel asset
     */
    function createInvestmentPool(
        uint256 _hotelAssetId,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _fundingGoal,
        uint256 _minInvestment,
        uint256 _maxInvestment,
        uint256 _expectedReturn,
        uint256 _fundingDuration,
        uint256 _pricePerToken
    ) public onlyOwner returns (uint256) {
        require(
            hotelAssetToken.ownerOf(_hotelAssetId) == owner(),
            "Must own hotel asset to create investment pool"
        );
        
        HotelAssetToken.HotelAsset memory hotelAsset = hotelAssetToken.getHotelAsset(_hotelAssetId);
        require(hotelAsset.isActive, "Hotel asset is not active");
        
        // Calculate total supply based on funding goal and price per token
        uint256 totalSupply = _fundingGoal.div(_pricePerToken);
        
        // Deploy new investment token contract
        HotelInvestmentToken investmentToken = new HotelInvestmentToken(
            _tokenName,
            _tokenSymbol,
            _hotelAssetId,
            hotelAsset.name,
            hotelAsset.location,
            totalSupply,
            _pricePerToken,
            _minInvestment,
            _maxInvestment,
            _expectedReturn,
            _fundingGoal,
            _fundingDuration,
            address(hotelAssetToken)
        );
        
        uint256 poolId = poolCounter;
        poolCounter = poolCounter.add(1);
        
        investmentPools[poolId] = InvestmentPool({
            hotelAssetId: _hotelAssetId,
            investmentToken: address(investmentToken),
            hotelName: hotelAsset.name,
            location: hotelAsset.location,
            totalValue: hotelAsset.totalValue,
            fundingGoal: _fundingGoal,
            currentFunding: 0,
            minInvestment: _minInvestment,
            expectedReturn: _expectedReturn,
            createdAt: block.timestamp,
            fundingDeadline: block.timestamp.add(_fundingDuration),
            isActive: true,
            isFunded: false,
            creator: msg.sender
        });
        
        emit InvestmentPoolCreated(
            poolId,
            _hotelAssetId,
            address(investmentToken),
            hotelAsset.name,
            _fundingGoal
        );
        
        return poolId;
    }
    
    /**
     * @dev Invest in a hotel through investment pool
     */
    function investInHotel(uint256 _poolId) public payable nonReentrant {
        InvestmentPool storage pool = investmentPools[_poolId];
        require(pool.isActive, "Investment pool not active");
        require(block.timestamp <= pool.fundingDeadline, "Funding period ended");
        require(msg.value >= pool.minInvestment, "Below minimum investment");
        
        HotelInvestmentToken investmentToken = HotelInvestmentToken(pool.investmentToken);
        
        // Track user investment
        if (totalUserInvestments[msg.sender] == 0) {
            totalInvestors = totalInvestors.add(1);
        }
        
        userInvestments[msg.sender].push(_poolId);
        totalUserInvestments[msg.sender] = totalUserInvestments[msg.sender].add(msg.value);
        
        // Update pool funding
        pool.currentFunding = pool.currentFunding.add(msg.value);
        totalValueLocked = totalValueLocked.add(msg.value);
        
        // Forward investment to investment token contract
        investmentToken.invest{value: msg.value}();
        
        emit InvestmentMade(_poolId, msg.sender, msg.value, block.timestamp);
        
        // Check if pool is fully funded
        if (pool.currentFunding >= pool.fundingGoal) {
            pool.isFunded = true;
            emit PoolFunded(_poolId, pool.currentFunding, block.timestamp);
        }
    }
    
    /**
     * @dev Distribute dividends to investors in a pool
     */
    function distributeDividends(uint256 _poolId) public payable onlyOwner {
        InvestmentPool storage pool = investmentPools[_poolId];
        require(pool.isFunded, "Pool not funded");
        require(msg.value > 0, "No dividends to distribute");
        
        HotelInvestmentToken investmentToken = HotelInvestmentToken(pool.investmentToken);
        investmentToken.distributeDividends{value: msg.value}();
        
        emit DividendsDistributed(_poolId, msg.value, block.timestamp);
    }
    
    /**
     * @dev Get investment pool details
     */
    function getInvestmentPool(uint256 _poolId) public view returns (InvestmentPool memory) {
        return investmentPools[_poolId];
    }
    
    /**
     * @dev Get user's investments
     */
    function getUserInvestments(address _user) public view returns (uint256[] memory) {
        return userInvestments[_user];
    }
    
    /**
     * @dev Get user's total investment amount
     */
    function getUserTotalInvestment(address _user) public view returns (uint256) {
        return totalUserInvestments[_user];
    }
    
    /**
     * @dev Get user's investment details for a specific pool
     */
    function getUserInvestmentDetails(address _user, uint256 _poolId) public view returns (
        uint256 investmentAmount,
        uint256 tokenBalance,
        uint256 sharePercentage,
        uint256 investmentDate
    ) {
        InvestmentPool memory pool = investmentPools[_poolId];
        HotelInvestmentToken investmentToken = HotelInvestmentToken(pool.investmentToken);
        
        return investmentToken.getInvestorDetails(_user);
    }
    
    /**
     * @dev Get user's portfolio summary
     */
    function getUserPortfolioSummary(address _user) public view returns (
        uint256 totalInvestment,
        uint256 totalTokens,
        uint256 portfolioValue,
        uint256 numberOfInvestments
    ) {
        uint256[] memory userPoolIds = userInvestments[_user];
        uint256 totalTokenValue = 0;
        
        for (uint256 i = 0; i < userPoolIds.length; i++) {
            InvestmentPool memory pool = investmentPools[userPoolIds[i]];
            HotelInvestmentToken investmentToken = HotelInvestmentToken(pool.investmentToken);
            
            uint256 tokenBalance = investmentToken.balanceOf(_user);
            HotelInvestmentToken.HotelInvestment memory investment = investmentToken.getHotelInvestmentDetails();
            
            totalTokenValue = totalTokenValue.add(tokenBalance.mul(investment.pricePerToken));
        }
        
        return (
            totalUserInvestments[_user],
            totalTokenValue,
            totalTokenValue, // For now, portfolio value equals token value
            userPoolIds.length
        );
    }
    
    /**
     * @dev Get platform statistics
     */
    function getPlatformStats() public view returns (
        uint256 totalPools,
        uint256 totalValueLockedAmount,
        uint256 totalInvestorsCount,
        uint256 totalHotelAssets
    ) {
        return (
            poolCounter,
            totalValueLocked,
            totalInvestors,
            hotelAssetToken.getTotalHotelAssets()
        );
    }
    
    /**
     * @dev Get all active investment pools
     */
    function getActiveInvestmentPools() public view returns (uint256[] memory) {
        uint256 activeCount = 0;
        
        // Count active pools
        for (uint256 i = 0; i < poolCounter; i++) {
            if (investmentPools[i].isActive && block.timestamp <= investmentPools[i].fundingDeadline) {
                activeCount++;
            }
        }
        
        // Create array of active pool IDs
        uint256[] memory activePools = new uint256[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < poolCounter; i++) {
            if (investmentPools[i].isActive && block.timestamp <= investmentPools[i].fundingDeadline) {
                activePools[index] = i;
                index++;
            }
        }
        
        return activePools;
    }
    
    /**
     * @dev Toggle pool active status (only owner)
     */
    function togglePoolActive(uint256 _poolId) public onlyOwner {
        investmentPools[_poolId].isActive = !investmentPools[_poolId].isActive;
    }
    
    /**
     * @dev Extend pool funding deadline (only owner)
     */
    function extendPoolDeadline(uint256 _poolId, uint256 _additionalTime) public onlyOwner {
        investmentPools[_poolId].fundingDeadline = investmentPools[_poolId].fundingDeadline.add(_additionalTime);
    }
    
    /**
     * @dev Update pool expected return (only owner)
     */
    function updatePoolExpectedReturn(uint256 _poolId, uint256 _newReturn) public onlyOwner {
        investmentPools[_poolId].expectedReturn = _newReturn;
        
        // Also update the investment token contract
        HotelInvestmentToken investmentToken = HotelInvestmentToken(investmentPools[_poolId].investmentToken);
        investmentToken.updateExpectedReturn(_newReturn);
    }
    
    /**
     * @dev Emergency functions for contract upgrades
     */
    function pause() public onlyOwner {
        // Pause all active pools
        for (uint256 i = 0; i < poolCounter; i++) {
            if (investmentPools[i].isActive) {
                investmentPools[i].isActive = false;
            }
        }
    }
    
    function unpause() public onlyOwner {
        // Unpause all pools (manual activation required)
        for (uint256 i = 0; i < poolCounter; i++) {
            investmentPools[i].isActive = true;
        }
    }
    
    /**
     * @dev Get hotel value in USD using Chainlink price feed
     */
    function getHotelValueInUSD(uint256 _poolId) public view returns (uint256) {
        InvestmentPool memory pool = investmentPools[_poolId];
        require(pool.isActive, "Investment pool not active");
        
        // Get ETH price in USD
        uint256 ethPriceInUSD = priceOracle.getPriceInUSD("ETH");
        
        // Convert hotel value from ETH to USD
        return pool.totalValue.mul(ethPriceInUSD).div(1e18);
    }

    /**
     * @dev Get investment value in USD
     */
    function getInvestmentValueInUSD(uint256 _poolId, uint256 _ethAmount) public view returns (uint256) {
        // Get ETH price in USD
        uint256 ethPriceInUSD = priceOracle.getPriceInUSD("ETH");
        
        // Convert ETH amount to USD
        return _ethAmount.mul(ethPriceInUSD).div(1e18);
    }

    /**
     * @dev Calculate required ETH for USD investment amount
     */
    function calculateETHForUSDInvestment(uint256 _usdAmount) public view returns (uint256) {
        // Get ETH price in USD
        uint256 ethPriceInUSD = priceOracle.getPriceInUSD("ETH");
        
        // Convert USD to ETH
        return _usdAmount.mul(1e18).div(ethPriceInUSD);
    }

    /**
     * @dev Get multiple asset prices for portfolio valuation
     */
    function getMultipleAssetPrices() public view returns (
        uint256 ethPrice,
        uint256 btcPrice,
        uint256 linkPrice,
        uint256 usdcPrice
    ) {
        ethPrice = priceOracle.getPriceInUSD("ETH");
        btcPrice = priceOracle.getPriceInUSD("BTC");
        linkPrice = priceOracle.getPriceInUSD("LINK");
        usdcPrice = priceOracle.getPriceInUSD("USDC");
    }

    /**
     * @dev Update price oracle address (only owner)
     */
    function updatePriceOracle(address _newPriceOracle) public onlyOwner {
        require(_newPriceOracle != address(0), "Invalid price oracle address");
        priceOracle = ChainlinkPriceOracle(_newPriceOracle);
    }
}