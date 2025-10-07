import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, BarChart3, PieChart } from "lucide-react";

export default function Analytics() {
  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ["/api/market/overview"],
  });

  const { data: portfolioData, isLoading: portfolioLoading } = useQuery({
    queryKey: ["/api/portfolio/1/details"],
  });

  if (marketLoading || portfolioLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded mb-4 w-64"></div>
            <div className="h-4 bg-neutral-200 rounded mb-8 w-96"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-6 bg-neutral-200 rounded mb-4"></div>
                    <div className="h-8 bg-neutral-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { portfolio } = portfolioData || {};

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Investment Analytics
          </h1>
          <p className="text-neutral-600">
            Comprehensive analysis of your portfolio and market performance
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${portfolio ? (portfolio.currentValue / 100).toLocaleString() : '0'}
              </div>
              <p className="text-xs text-muted-foreground">
                {portfolio && portfolio.returnRate >= 0 ? '+' : ''}{portfolio?.returnRate?.toFixed(2) || 0}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                ${portfolio ? (portfolio.totalReturn / 100).toLocaleString() : '0'}
              </div>
              <p className="text-xs text-muted-foreground">
                {portfolio?.returnRate?.toFixed(2) || 0}% return rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${marketData?.totalValue ? (marketData.totalValue / 100000000).toFixed(1) : '0'}B
              </div>
              <p className="text-xs text-muted-foreground">
                Total market capitalization
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Return</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {marketData?.avgReturn?.toFixed(1) || '0'}%
              </div>
              <p className="text-xs text-muted-foreground">
                Market average annual return
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Portfolio Value</span>
                  <span className="text-sm font-bold">
                    ${portfolio ? (portfolio.currentValue / 100).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Investment</span>
                  <span className="text-sm">
                    ${portfolio ? (portfolio.totalInvestment / 100).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Unrealized Gains</span>
                  <span className="text-sm text-secondary">
                    ${portfolio ? (portfolio.totalReturn / 100).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Return Rate</span>
                  <span className="text-sm text-secondary">
                    {portfolio?.returnRate?.toFixed(2) || 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Properties</span>
                  <span className="text-sm font-bold">
                    {marketData?.properties || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Investors</span>
                  <span className="text-sm">
                    {marketData?.investors || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Market Average Return</span>
                  <span className="text-sm text-secondary">
                    {marketData?.avgReturn?.toFixed(1) || '0'}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Market Value</span>
                  <span className="text-sm">
                    ${marketData?.totalValue ? (marketData.totalValue / 100000000).toFixed(1) : '0'}B
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
