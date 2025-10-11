import { useState, useMemo } from "react";
import PropertySearch from "@/components/properties/property-search";
import { Card, CardContent } from "@/components/ui/card";

interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  minInvestment: number;
  image: string;
}

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMinInvestment, setSelectedMinInvestment] = useState("");

  // Example properties (you can replace with dynamic data later)
  const properties: Property[] = [
    {
      id: 1,
      name: "The Grand New York",
      location: "New York, NY",
      type: "luxury",
      minInvestment: 1000,
      image:"/assets/images/property1.jpg"
    },
    {
      id: 2,
      name: "Tokyo Business Suites",
      location: "Tokyo, Japan",
      type: "business",
      minInvestment: 5000,
      image: "/assets/images/property2.jpg",
    },
    {
      id: 3,
      name: "Paris Boutique Charm",
      location: "Paris, France",
      type: "boutique",
      minInvestment: 10000,
      image: "/assets/images/property3.jpg",
    },
    {
      id: 4,
      name: "Maldives Resort Haven",
      location: "Maldives",
      type: "luxury",
      minInvestment: 25000,
      image: "/assets/images/property4.jpg",
    },
    {
      id: 5,
      name: "London Extended Stay",
      location: "London, UK",
      type: "extended-stay",
      minInvestment: 5000,
      image: "/assets/images/property5.jpg",
    },
    {
      id: 6,
      name: "Zermatt Alpine Lodge",
      location: "Zermatt, Switzerland",
      type: "boutique",
      minInvestment: 10000,
      image: "/assets/images/property6.jpg",
    },
  ];

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesQuery =
        searchQuery === "" ||
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        selectedLocation === "" ||
        selectedLocation === "all" ||
        property.location === selectedLocation;

      const matchesType =
        selectedType === "" ||
        selectedType === "all" ||
        property.type === selectedType;

      const matchesMinInvestment =
        selectedMinInvestment === "" ||
        selectedMinInvestment === "all" ||
        property.minInvestment >= parseInt(selectedMinInvestment);

      return (
        matchesQuery && matchesLocation && matchesType && matchesMinInvestment
      );
    });
  }, [properties, searchQuery, selectedLocation, selectedType, selectedMinInvestment]);

  const handleSearch = (
    query: string,
    location: string,
    type: string,
    minInvestment: string
  ) => {
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

        {/* Filter Search */}
        <PropertySearch onSearch={handleSearch} />

        {/* Properties Grid */}
        <div className="mt-8">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden shadow-md hover:shadow-lg transition">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-48 w-full object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {property.name}
                    </h3>
                    <p className="text-neutral-500 mb-2">{property.location}</p>
                    <p className="text-neutral-700 mb-2 capitalize">
                      Type: {property.type.replace("-", " ")}
                    </p>
                    <p className="text-primary font-semibold">
                      Min Investment: ${property.minInvestment.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-neutral-500 text-lg">
                No properties found matching your criteria
              </div>
              <p className="text-neutral-400 mt-2">
                Try adjusting your search filters or browse all properties
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
