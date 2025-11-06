import InvestmentCalculator from "@/components/calculator/investment-calculator";

export default function Calculator() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Investment Calculator
          </h1>
          <p className="text-neutral-600">
            Calculate potential returns on your hotel investment portfolio
          </p>
        </div>

        <InvestmentCalculator />
      </div>
    </div>
  );
}
