import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import PropertyCard from "@/components/properties/property-card";
import type { Hotel } from "@shared/schema";

export default function Home() {
  const { data: hotels = [], isLoading: hotelsLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ["/api/market/overview"],
  });

  const featuredHotels = hotels.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Invest in Premium Hotel Assets
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Tokenized real-world hotel investments with transparent returns, professional management, and global diversification opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg" className="bg-white text-primary hover:bg-neutral-100">
                  Browse Properties
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {marketLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6 text-center">
                    <div className="h-8 bg-neutral-200 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">
                  ${marketData?.totalValue ? (marketData.totalValue / 100000000).toFixed(1) : '0'}B
                </div>
                <div className="text-sm text-neutral-600">Total Asset Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">
                  {marketData?.avgReturn ? marketData.avgReturn.toFixed(1) : '0'}%
                </div>
                <div className="text-sm text-neutral-600">Avg. Annual Return</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">
                  {marketData?.properties || 0}
                </div>
                <div className="text-sm text-neutral-600">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">
                  {marketData?.investors || 0}
                </div>
                <div className="text-sm text-neutral-600">Active Investors</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Featured Investment Opportunities
            </h2>
            <p className="text-neutral-600">
              Carefully curated hotel properties with exceptional return potential
            </p>
          </div>

          {hotelsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-neutral-200"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-neutral-200 rounded mb-4"></div>
                    <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHotels.map((hotel) => (
                <PropertyCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/properties">
              <Button size="lg" className="bg-primary text-white hover:bg-blue-700">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
