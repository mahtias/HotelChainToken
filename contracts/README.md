# HotelVest Smart Contracts

This directory contains the smart contracts for the HotelVest platform - a decentralized hotel asset tokenization and investment platform.

## Overview

The HotelVest smart contract system consists of four main contracts:

1. **HotelAssetToken** - ERC-721 NFT representing ownership of hotel real estate assets
2. **HotelInvestmentToken** - ERC-20 token for fractional ownership in hotel assets
3. **HotelInvestmentManager** - Main contract coordinating hotel asset tokenization and investments
4. **HotelRoyaltyManager** - Manages revenue distribution and royalty payments

## Architecture

### HotelAssetToken (ERC-721)
- Each token represents a unique hotel property
- Stores hotel metadata (name, location, type, value, rooms, rating)
- Owned by the platform initially, then can be transferred
- Supports standard NFT functionality with hotel-specific features

### HotelInvestmentToken (ERC-20)
- Fractional ownership tokens for specific hotel properties
- Each hotel has its own investment token contract
- Handles investment contributions, dividend distribution
- Supports emergency withdrawals if funding goals aren't met

### HotelInvestmentManager
- Factory contract for creating investment pools
- Coordinates between hotel assets and investment tokens
- Tracks user portfolios and platform statistics
- Manages investment lifecycle from creation to funding

### HotelRoyaltyManager
- Handles booking revenue collection
- Distributes dividends to token holders
- Manages platform fees and revenue streams
- Supports automated distribution based on time intervals

## Key Features

### For Hotel Owners
- Tokenize hotel assets as NFTs
- Create investment pools for fractional ownership
- Collect revenue from bookings
- Distribute profits to investors automatically

### For Investors
- Browse available hotel investment opportunities
- Invest in fractional hotel ownership
- Receive dividends from hotel revenue
- Trade investment tokens on secondary markets

### For Platform
- Collect platform fees from investments and revenue
- Manage multiple hotel properties
- Provide analytics and portfolio tracking
- Ensure compliance and transparency

## Smart Contract Functions

### HotelAssetToken
```solidity
function mintHotelAsset(address to, string memory name, string memory location, ...)
function getHotelAsset(uint256 tokenId)
function updateHotelValue(uint256 tokenId, uint256 newValue)
```

### HotelInvestmentManager
```solidity
function createInvestmentPool(uint256 hotelAssetId, string memory tokenName, ...)
function investInHotel(uint256 poolId)
function getUserPortfolioSummary(address user)
function getPlatformStats()
```

### HotelRoyaltyManager
```solidity
function addBookingRevenue(uint256 poolId, string memory bookingReference, address booker)
function distributeRevenue(uint256 poolId)
function autoDistributeRevenue(uint256 poolId)
```

## Security Features

- **ReentrancyGuard**: Protection against reentrancy attacks
- **Ownable**: Access control for administrative functions
- **SafeMath**: Overflow protection for arithmetic operations
- **Emergency Functions**: Emergency withdrawal and pause capabilities

## Token Economics

### Investment Tokens
- Represent fractional ownership in hotel properties
- Dividends distributed based on token holdings
- Can be traded on secondary markets
- Redeemable for underlying asset value

### Platform Fees
- 5% default platform fee on revenue distributions
- Configurable per investment pool
- Collected automatically during revenue distribution
- Used for platform maintenance and development

## Deployment

1. Deploy `HotelAssetToken` contract
2. Deploy `HotelInvestmentManager` with HotelAssetToken address
3. Deploy `HotelRoyaltyManager` with HotelInvestmentManager address
4. Mint hotel assets and create investment pools
5. Set up revenue streams for automated distribution

## Testing

Run the test suite:
```bash
npm test
```

## Deployment Scripts

Deploy to local network:
```bash
npm run deploy
```

Deploy to testnet:
```bash
npm run deploy:testnet
```

## Verification

Verify contracts on Etherscan:
```bash
npm run verify -- --network goerli <contract-address>
```

## Security Considerations

- All contracts use OpenZeppelin security patterns
- Emergency pause functionality for critical issues
- Multi-signature requirements for sensitive operations
- Regular audits recommended before mainnet deployment

## License

MIT License - see LICENSE file for details