import { useQuery } from "@tanstack/react-query";
import PortfolioSummary from "@/components/portfolio/portfolio-summary";
import PortfolioTable from "@/components/portfolio/portfolio-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, DollarSign } from "lucide-react";

export default function Portfolio() {
  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ["/api/portfolio/1/details"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded mb-4 w-64"></div>
            <div className="h-4 bg-neutral-200 rounded mb-8 w-96"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-6 bg-neutral-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-4 bg-neutral-200 rounded"></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { portfolio, investments = [] } = portfolioData || {};

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Your Portfolio
          </h1>
          <p className="text-neutral-600">
            Track your hotel investment performance and manage your assets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <PortfolioSummary portfolio={portfolio} />
          
          {/* Asset Allocation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                    <span className="text-neutral-600">Luxury Resorts</span>
                  </div>
                  <span className="font-semibold text-neutral-900">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-secondary rounded-full mr-3"></div>
                    <span className="text-neutral-600">Business Hotels</span>
                  </div>
                  <span className="font-semibold text-neutral-900">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="text-neutral-600">Boutique Hotels</span>
                  </div>
                  <span className="font-semibold text-neutral-900">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-secondary mr-2" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900">
                        Invested in Ocean Vista
                      </div>
                      <div className="text-xs text-neutral-600">2 days ago</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-secondary">+$2,500</div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-secondary mr-2" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900">
                        Dividend from Manhattan Hub
                      </div>
                      <div className="text-xs text-neutral-600">1 week ago</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-secondary">+$127</div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 text-secondary mr-2" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900">
                        Invested in Le Petit Château
                      </div>
                      <div className="text-xs text-neutral-600">2 weeks ago</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-secondary">+$1,500</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <PortfolioTable investments={investments} />
      </div>
    </div>
  );
}
