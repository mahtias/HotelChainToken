// src/pages/home.tsx

//import { useQuery } from "@tanstack/react-query";
//import { Button } from "@/components/ui/button";
//import { Card, CardContent } from "@/components/ui/card";
//import { Link } from "wouter";
//import PropertyCard from "@/components/properties/property-card";
//import type { Hotel } from "../../../backend/shared/schema";


export default function Home() {
  // const { data: hotels = [], isLoading: hotelsLoading } = useQuery<Hotel[]>({
  //   queryKey: ["/api/hotels"],
  // });

  // const featuredHotels = hotels.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-white"
           style={{ backgroundImage: "url('/assets/images/image3.jpg')" }}
           
       >
       
        <div className="bg-black/50 p-8 rounded-md text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Invest in Premium Hotel Assets
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 animate-pulse">
            Tokenized real-world hotel investments with transparent returns, professional management, and global diversification opportunities.
          </p>
          {/* Uncomment below when ready to link */}
          {/* 
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
          */}
        </div>
      </div>

      {/* Featured Properties Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Featured Investment Opportunities
            </h2>
            <p className="text-neutral-600">
              Carefully curated hotel properties with exceptional return potential
            </p>
          </div>

          {/* Placeholder grid for properties */}
          {/* 
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
          )} */}
        </div>
      </section>
    </div>
  );
}
