import { Link, useLocation } from "wouter";
import { Building, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

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

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions: {
          injected: { package: null }, // MetaMask
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              // infuraId: "YOUR_INFURA_ID", // optional
            },
          },
          coinbasewallet: {
            package: CoinbaseWalletSDK,
            options: {
              appName: "HotelVest",
              // infuraId: "YOUR_INFURA_ID", // optional
            },
          },
        },
      });

      // Open wallet popup
      const instance = await web3Modal.connect();

      // Create ethers provider
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address); // update state to show connected account
      console.log("Connected:", address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Building className="text-primary text-2xl mr-3" />
              <span className="font-bold text-xl text-neutral-900">HotelVest</span>
            </Link>

            {/* Desktop Nav */}
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

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Connect Wallet Button */}
            <Button
              className="hidden md:flex bg-primary text-white hover:bg-blue-700"
              onClick={connectWallet}
            >
              {account
                ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect Wallet"}
            </Button>

            {/* Mobile menu */}
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

                  <Button
                    className="bg-primary text-white hover:bg-blue-700"
                    onClick={connectWallet}
                  >
                    {account
                      ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                      : "Connect Wallet"}
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
