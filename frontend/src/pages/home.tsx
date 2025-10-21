// src/pages/home.tsx
import React from "react";
export default function Home() {
  const topHotels = [
      {
    name: "Burj Al Arab, Dubai",
    location: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  },
  {
    name: "The Plaza, New York",
    location: "USA",
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2108b",
  },
  {
    name: "Marina Bay Sands, Singapore",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    name: "Ritz Paris, France",
    location: "France",
    image: "https://images.unsplash.com/photo-1505691723518-36a1f88a37f2",
  },
  {
    name: "Taj Mahal Palace, Mumbai",
    location: "India",
    image: "https://images.unsplash.com/photo-1503437313881-503a91226422",
  },
  {
    name: "Four Seasons Resort Bora Bora",
    location: "French Polynesia",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    name: "The Beverly Hills Hotel",
    location: "Los Angeles, USA",
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2108b",
  },
  {
    name: "Hotel de Paris, Monte Carlo",
    location: "Monaco",
    image: "https://images.unsplash.com/photo-1503437313881-503a91226422",
  },
  {
    name: "The Savoy, London",
    location: "United Kingdom",
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2d7",
  },
  {
    name: "Aman Tokyo, Japan",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/assets/images/image3.jpg')" }}
      >
        <div className="bg-black/50 p-8 rounded-md text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Invest in Premium Hotel Assets
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 animate-pulse">
            Tokenized real-world hotel investments with transparent returns, professional management, and global diversification opportunities.
          </p>

        </div>
      </div>

      {/* Featured Properties Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Top popular Hotel in the world 
            </h2>
            <p className="text-neutral-600">
              Carefully curated hotel properties with exceptional return potential
            </p>
             
          </div>
         
            {/* Top 10 Hotels Section */}
          {/* Hotel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {topHotels.map((hotel, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold text-center px-2">
                    {hotel.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
       
        </div>
      </section>

     
     
    </div>
  );
}
