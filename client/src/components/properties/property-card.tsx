import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Star } from "lucide-react";
import type { Hotel } from "@shared/schema";

interface PropertyCardProps {
  hotel: Hotel;
}

export default function PropertyCard({ hotel }: PropertyCardProps) {
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  return (
    <Card className="bg-white shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
      <img 
        src={hotel.imageUrl} 
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-1">
              {hotel.name}
            </h3>
            <p className="text-neutral-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {hotel.location}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-neutral-900">
              {formatCurrency(hotel.totalValue)}
            </div>
            <div className="text-sm text-neutral-600">Total Value</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-neutral-50 p-3 rounded-lg">
            <div className="text-secondary font-semibold">
              {hotel.expectedReturn}%
            </div>
            <div className="text-xs text-neutral-600">Expected ROI</div>
          </div>
          <div className="bg-neutral-50 p-3 rounded-lg">
            <div className="text-neutral-900 font-semibold">
              {formatCurrency(hotel.minInvestment)}
            </div>
            <div className="text-xs text-neutral-600">Min Investment</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-600">Funding Progress</span>
            <span className="text-neutral-900 font-medium">
              {hotel.fundingProgress}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${hotel.fundingProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-neutral-600">
            <Bed className="w-4 h-4 mr-1" />
            <span>{hotel.rooms} rooms</span>
            <span className="mx-2">•</span>
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{hotel.rating}</span>
          </div>
          <Button className="bg-primary text-white hover:bg-blue-700">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
