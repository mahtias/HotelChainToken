import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Investment, Hotel } from "@shared/schema";

interface PortfolioTableProps {
  investments: (Investment & { hotel?: Hotel })[];
}

export default function PortfolioTable({ investments }: PortfolioTableProps) {
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  const calculateReturn = (investment: Investment) => {
    const returnAmount = investment.currentValue - investment.amount;
    const returnPercent = (returnAmount / investment.amount) * 100;
    return { amount: returnAmount, percent: returnPercent };
  };

  if (investments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-neutral-600">No investments found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Investment</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => {
                const returns = calculateReturn(investment);
                return (
                  <TableRow key={investment.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-neutral-200 rounded-lg mr-4">
                          {investment.hotel?.imageUrl && (
                            <img 
                              src={investment.hotel.imageUrl} 
                              alt={investment.hotel.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900">
                            {investment.hotel?.name || 'Unknown Property'}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {investment.hotel?.location || 'Unknown Location'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(investment.amount)}</TableCell>
                    <TableCell>{formatCurrency(investment.currentValue)}</TableCell>
                    <TableCell className="text-secondary">
                      +{returns.percent.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                        {investment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
