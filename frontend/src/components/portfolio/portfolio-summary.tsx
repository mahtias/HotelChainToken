import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Portfolio } from "@shared/schema";

interface PortfolioSummaryProps {
  portfolio?: Portfolio;
}

export default function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  if (!portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-neutral-600">No portfolio data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-neutral-600">Total Investment</span>
            <span className="font-semibold text-neutral-900">
              {formatCurrency(portfolio.totalInvestment)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Current Value</span>
            <span className="font-semibold text-neutral-900">
              {formatCurrency(portfolio.currentValue)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Total Return</span>
            <span className="font-semibold text-secondary">
              +{formatCurrency(portfolio.totalReturn)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Return Rate</span>
            <span className="font-semibold text-secondary">
              +{portfolio.returnRate.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
