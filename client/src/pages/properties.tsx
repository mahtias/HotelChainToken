import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PropertyCard from "@/components/properties/property-card";
import PropertySearch from "@/components/properties/property-search";
import type { Hotel } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMinInvestment, setSelectedMinInvestment] = useState("");

  const { data: hotels = [], isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels/search", searchQuery, selectedLocation, selectedType, selectedMinInvestment],
    queryFn: async () => {
      const params = new URLSearchParams({
        query: searchQuery,
        ...(selectedLocation && { location: selectedLocation }),
        ...(selectedType && { type: selectedType }),
        ...(selectedMinInvestment && { minInvestment: selectedMinInvestment }),
      });
      
      const response = await fetch(`/api/hotels/search?${params}`);
      if (!response.ok) throw new Error('Failed to fetch hotels');
      return response.json();
    },
  });

  const handleSearch = (query: string, location: string, type: string, minInvestment: string) => {
    setSearchQuery(query);
    setSelectedLocation(location);
    setSelectedType(type);
    setSelectedMinInvestment(minInvestment);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Hotel Investment Properties
          </h1>
          <p className="text-neutral-600">
            Discover tokenized hotel assets with transparent returns and professional management
          </p>
        </div>

        <PropertySearch onSearch={handleSearch} />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              {isLoading ? "Loading..." : `${hotels.length} Properties Available`}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
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
          ) : hotels.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-neutral-500 text-lg">
                No properties found matching your criteria
              </div>
              <p className="text-neutral-400 mt-2">
                Try adjusting your search filters or browse all properties
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <PropertyCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
