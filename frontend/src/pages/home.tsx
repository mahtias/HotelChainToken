// src/pages/home.tsx
import React from "react";
export default function Home() {
  const topHotels = [
  { name: "Burj Al Arab", location: "Dubai, UAE", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde" },
  { name: "The Plaza", location: "New York, USA", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOYCoUjxZ2GQ6t454z_zJXPt33OQ41N1IvA&s" },
  { name: "Marina Bay Sands", location: "Singapore", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPWaZbi99r2BHP-A3SqXbZ5lRje6kqdXLnA&s" },
  { name: "Ritz Paris", location: "Paris, France", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbmZSEWl1OO9rYqhNJKDccLatRkGO2sn-fgw&s" },
  { name: "Taj Mahal Palace", location: "Mumbai, India", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mS_2on2dLSgvDyQ0y93f04XPFgMALv8L_w&s" },
  { name: "Four Seasons Bora Bora", location: "Bora Bora, French Polynesia", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyzju3nJaVljKt1D9JOVfCmGJaDyE2yOSUlg&s" },
  { name: "The Beverly Hills Hotel", location: "Los Angeles, USA", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB-KAGoOM_v6LK6r9bJaLxkAV1zg0j5q7UMA&s" },
  { name: "Hotel de Paris", location: "Monte Carlo, Monaco", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsF3cJf4ZDpFWOebtlGI0QCri-CjXG2KFoFg&s" },
  { name: "The Savoy", location: "London, UK", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOuqojJ2jipRSJPRFNyPa_py13lIaOQ3RPhw&s" },
  { name: "Aman Tokyo", location: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
  { name: "Hong Kong", location: "Hk, Hong Kong", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslLTqVHKPGeX5fXtgFXjleNHvs4MH6rhziA&s" },
    { name: "Asinie Ivory coast", location: "Tokyo, Japan", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYErsA9GOJnfMNuAr-Om50DuLMP1r98ZmsWA&s" }

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
