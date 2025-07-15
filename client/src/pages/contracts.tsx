import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, FileText, Shield, Zap, Users, TrendingUp, Building, Coins } from "lucide-react";

export default function Contracts() {
  const contracts = [
    {
      name: "HotelAssetToken",
      type: "ERC-721",
      description: "NFT representing ownership of hotel real estate assets",
      features: ["Unique hotel properties", "Metadata storage", "Ownership transfer", "Asset valuation"],
      icon: <Building className="w-6 h-6" />
    },
    {
      name: "HotelInvestmentToken",
      type: "ERC-20",
      description: "Fractional ownership tokens for hotel assets",
      features: ["Fractional ownership", "Dividend distribution", "Emergency withdrawals", "Investment tracking"],
      icon: <Coins className="w-6 h-6" />
    },
    {
      name: "HotelInvestmentManager",
      type: "Manager",
      description: "Main contract coordinating hotel asset tokenization",
      features: ["Investment pool creation", "Portfolio management", "Platform statistics", "User tracking"],
      icon: <Users className="w-6 h-6" />
    },
    {
      name: "HotelRoyaltyManager",
      type: "Revenue",
      description: "Manages revenue distribution and royalty payments",
      features: ["Revenue collection", "Automated distribution", "Platform fees", "Booking tracking"],
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const securityFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "ReentrancyGuard",
      description: "Protection against reentrancy attacks"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Access Control",
      description: "Ownable pattern for administrative functions"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "SafeMath",
      description: "Overflow protection for arithmetic operations"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Emergency Functions",
      description: "Emergency withdrawal and pause capabilities"
    }
  ];

  const codeExamples = {
    asset: `// Mint a new hotel asset NFT
function mintHotelAsset(
    address to,
    string memory name,
    string memory location,
    string memory hotelType,
    uint256 totalValue,
    uint256 rooms,
    uint256 rating,
    string memory tokenURI
) public onlyOwner returns (uint256)`,
    
    investment: `// Create investment pool for hotel
function createInvestmentPool(
    uint256 hotelAssetId,
    string memory tokenName,
    string memory tokenSymbol,
    uint256 fundingGoal,
    uint256 minInvestment,
    uint256 expectedReturn,
    uint256 fundingDuration
) public onlyOwner returns (uint256)`,
    
    revenue: `// Add booking revenue to pool
function addBookingRevenue(
    uint256 poolId,
    string memory bookingReference,
    address booker
) public payable nonReentrant`
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Smart Contracts
          </h1>
          <p className="text-neutral-600 mb-6">
            Decentralized hotel asset tokenization and investment platform built on Ethereum blockchain
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">Solidity ^0.8.19</Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">OpenZeppelin</Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">ERC-721 & ERC-20</Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">Hardhat</Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="code">Code Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Asset Tokenization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-4">
                    Convert hotel real estate into NFTs (ERC-721) representing unique property ownership
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Each hotel becomes a unique NFT
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Metadata includes location, value, rooms, rating
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Transferable ownership on blockchain
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Fractional Investment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-4">
                    Enable fractional ownership through ERC-20 tokens for each hotel property
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Invest in hotel shares with minimum amounts
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Receive dividends from hotel revenue
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Trade tokens on secondary markets
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Revenue Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-4">
                    Automated revenue collection from bookings and distribution to investors
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Booking revenue automatically collected
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Scheduled dividend distributions
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Transparent platform fees (5%)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Portfolio Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-4">
                    Comprehensive investment tracking and portfolio analytics
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Track investments across multiple hotels
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Real-time portfolio valuation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Investment history and performance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contracts.map((contract, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {contract.icon}
                      {contract.name}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {contract.type}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4">
                      {contract.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {contract.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.icon}
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Access Control</h4>
                    <ul className="space-y-1 text-sm text-neutral-600">
                      <li>• Owner-only administrative functions</li>
                      <li>• Multi-signature support ready</li>
                      <li>• Role-based permissions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Fund Protection</h4>
                    <ul className="space-y-1 text-sm text-neutral-600">
                      <li>• Emergency withdrawal mechanisms</li>
                      <li>• Reentrancy attack prevention</li>
                      <li>• Overflow protection</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hotel Asset Tokenization</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.asset}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Pool Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.investment}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Management</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExamples.revenue}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Setup Environment</h4>
                    <pre className="bg-neutral-100 p-3 rounded text-sm">
                      <code>cd contracts{'\n'}npm install{'\n'}npx hardhat compile</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2. Deploy Contracts</h4>
                    <pre className="bg-neutral-100 p-3 rounded text-sm">
                      <code>npx hardhat run deployment/deploy.js --network localhost</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">3. Run Tests</h4>
                    <pre className="bg-neutral-100 p-3 rounded text-sm">
                      <code>npx hardhat test</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-primary text-white hover:bg-blue-700">
            View Full Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}