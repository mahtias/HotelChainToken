# HotelVest - Hotel Investment Platform

## Overview

HotelVest is a tokenized hotel investment platform that enables users to invest in premium hotel assets through blockchain technology. The application provides a full-stack solution with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Development**: Hot module replacement and error overlay for development experience

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Validation**: Zod for schema validation
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **Development**: TSX for TypeScript execution in development

### Smart Contract Architecture
- **Platform**: Ethereum blockchain using Solidity ^0.8.19
- **Development Framework**: Hardhat for contract development and testing
- **Security**: OpenZeppelin contracts for security patterns
- **Token Standards**: ERC-721 for hotel assets, ERC-20 for investment tokens
- **Deployment**: Local, testnet, and mainnet deployment scripts

### Database Schema
The system uses four main entities:
- **Hotels**: Core investment properties with metadata, pricing, and performance data
- **Investments**: User investment records linking users to hotels
- **Portfolios**: Aggregated investment data per user
- **Users**: User account information and wallet addresses

## Key Components

### Data Storage
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Database Schema**: Drizzle schema with proper relationships and constraints
- **Seed Data**: Pre-populated hotel data for development and testing
- **Value Storage**: All monetary values stored in cents for precision

### API Endpoints
- **Hotel Routes**: CRUD operations, search, and filtering
- **Investment Management**: Create and track user investments
- **Portfolio Analytics**: Aggregated investment performance data
- **Search Functionality**: Advanced filtering by location, type, and investment amount

### Frontend Features
- **Property Discovery**: Search and filter hotel investments
- **Portfolio Management**: Track investment performance and returns
- **Investment Calculator**: Calculate potential returns on investments
- **Analytics Dashboard**: Visualize investment performance and market data
- **Smart Contract Interface**: View and interact with blockchain components
- **Responsive Design**: Mobile-first approach with responsive layouts

### Smart Contract System
- **HotelAssetToken (ERC-721)**: NFT representing unique hotel property ownership
- **HotelInvestmentToken (ERC-20)**: Fractional ownership tokens for hotel investments
- **HotelInvestmentManager**: Main contract coordinating asset tokenization and investments
- **HotelRoyaltyManager**: Revenue distribution and royalty payment management

## Data Flow

1. **User Interaction**: Users interact with React components that trigger API calls
2. **Query Management**: TanStack Query manages API requests, caching, and state
3. **API Processing**: Express routes handle requests and interact with storage layer
4. **Data Storage**: Drizzle ORM manages database operations with type safety
5. **Response Handling**: API responses are processed and displayed in the UI

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Query for UI and state management
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS for utility-first styling
- **Database**: Neon Database for serverless PostgreSQL hosting
- **ORM**: Drizzle ORM for type-safe database operations

### Development Tools
- **Build Tools**: Vite for frontend bundling, esbuild for backend bundling
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development Experience**: Hot reload, error overlays, and debugging tools
- **Code Quality**: ESLint and Prettier configurations (implied by project structure)

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations handle schema changes
- **Static Assets**: Frontend assets served from Express in production

### Environment Configuration
- **Development**: Uses TSX for direct TypeScript execution
- **Production**: Runs compiled JavaScript with NODE_ENV=production
- **Database**: Uses DATABASE_URL environment variable for connection
- **Build Scripts**: Separate scripts for development, build, and production

### Production Considerations
- **Database Migrations**: `db:push` command for schema deployment
- **Asset Serving**: Express serves static files in production
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Logging**: Request logging with performance metrics