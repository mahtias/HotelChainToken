import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface PropertySearchProps {
  onSearch: (query: string, location: string, type: string, minInvestment: string) => void;
}

export default function PropertySearch({ onSearch }: PropertySearchProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minInvestment, setMinInvestment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location, type, minInvestment);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search properties by name, location, or type..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="New York, NY">New York</SelectItem>
                <SelectItem value="London, UK">London</SelectItem>
                <SelectItem value="Tokyo, Japan">Tokyo</SelectItem>
                <SelectItem value="Paris, France">Paris</SelectItem>
                <SelectItem value="Maldives">Maldives</SelectItem>
                <SelectItem value="Zermatt, Switzerland">Zermatt</SelectItem>
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="luxury">Luxury Resort</SelectItem>
                <SelectItem value="business">Business Hotel</SelectItem>
                <SelectItem value="boutique">Boutique Hotel</SelectItem>
                <SelectItem value="extended-stay">Extended Stay</SelectItem>
              </SelectContent>
            </Select>

            <Select value={minInvestment} onValueChange={setMinInvestment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Min Investment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Amount</SelectItem>
                <SelectItem value="100000">$1,000</SelectItem>
                <SelectItem value="500000">$5,000</SelectItem>
                <SelectItem value="1000000">$10,000</SelectItem>
                <SelectItem value="2500000">$25,000</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="bg-primary text-white hover:bg-blue-700">
              Filter
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
