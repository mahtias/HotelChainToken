import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InvestmentCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8.5);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [results, setResults] = useState({
    initialInvestment: 10000,
    annualReturn: 850,
    totalReturn: 4250,
    finalValue: 14250,
  });

  const calculateReturns = () => {
    const annualReturn = investmentAmount * (expectedReturn / 100);
    const totalReturn = annualReturn * investmentPeriod;
    const finalValue = investmentAmount + totalReturn;

    setResults({
      initialInvestment: investmentAmount,
      annualReturn,
      totalReturn,
      finalValue,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-center">Investment Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Calculate Your Returns
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="investment-amount">Investment Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-neutral-500">$</span>
                  <Input
                    id="investment-amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="pl-8"
                    placeholder="10,000"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="expected-return">Expected Annual Return</Label>
                <div className="relative">
                  <Input
                    id="expected-return"
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    placeholder="8.5"
                  />
                  <span className="absolute right-3 top-2 text-neutral-500">%</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="investment-period">Investment Period</Label>
                <Select value={investmentPeriod.toString()} onValueChange={(value) => setInvestmentPeriod(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={calculateReturns}
                className="w-full bg-primary text-white hover:bg-blue-700"
              >
                Calculate Returns
              </Button>
            </div>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Projected Returns
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Initial Investment</span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(results.initialInvestment)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Annual Return</span>
                <span className="font-semibold text-secondary">
                  {formatCurrency(results.annualReturn)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Total Return ({investmentPeriod} years)</span>
                <span className="font-semibold text-secondary">
                  {formatCurrency(results.totalReturn)}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg">
                  <span className="text-neutral-900 font-semibold">Final Value</span>
                  <span className="font-bold text-neutral-900">
                    {formatCurrency(results.finalValue)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-xs text-neutral-600">
              * Calculations are estimates based on expected returns and do not guarantee actual performance.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
