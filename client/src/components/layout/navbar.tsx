import { Link, useLocation } from "wouter";
import { Building, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Properties", href: "/properties" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Analytics", href: "/analytics" },
    { label: "Calculator", href: "/calculator" },
    { label: "Contracts", href: "/contracts" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    return location === href;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Building className="text-primary text-2xl mr-3" />
              <span className="font-bold text-xl text-neutral-900">HotelVest</span>
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-primary border-b-2 border-primary"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="bg-neutral-100 px-3 py-2 rounded-lg">
                <span className="text-sm text-neutral-600">Portfolio Value: </span>
                <span className="font-semibold text-neutral-900">$127,450</span>
              </div>
            </div>
            
            <Button className="hidden md:flex bg-primary text-white hover:bg-blue-700">
              Connect Wallet
            </Button>
            
            <div className="hidden md:block">
              <img 
                className="h-8 w-8 rounded-full" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32" 
                alt="User avatar"
              />
            </div>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Menu</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  <div className="bg-neutral-100 px-3 py-2 rounded-lg">
                    <span className="text-sm text-neutral-600">Portfolio Value: </span>
                    <span className="font-semibold text-neutral-900">$127,450</span>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  
                  <Button className="bg-primary text-white hover:bg-blue-700">
                    Connect Wallet
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
