import { useState } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/assets/images/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-2xl font-bold text-dark cursor-pointer">
            DigiRealAssets
          </span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-neutral-800 font-medium items-center">
          {/* Property (no dropdown) booking */}
          <li>
            <Link href="/properties">
              <span className="hover:text-black transition-colors duration-200">
                Properties
              </span>
            </Link>
          </li>
          
          {/* Portfolio (no dropdown) */}
          {/* <li>
            <Link href="/portfolio">
              <span className="hover:text-black transition-colors duration-200">
                Portfolio
              </span>
            </Link>
          </li> */}

          {/* About (with dropdown) */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => setOpenDropdown("About")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span
              className={`hover:text-black transition-colors duration-200 ${
                openDropdown === "About" ? "text-black" : ""
              }`}
            >
              About
            </span>

            <ul
              className={`absolute left-0 mt-2 bg-white border rounded-lg shadow-lg py-2 w-56 transition-all duration-300 ease-out transform ${
                openDropdown === "About"
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <li >
                <Link href="/blog">
                  <span className="block px-4 py-2 hover:bg-gray-100">Blog </span>
                </Link>
              </li>
              <li >
                <Link href="/whitepaper">
                  <span className="block px-4 py-2 hover:bg-gray-100">Whitepapers</span>
                </Link>
              </li>
              <li >
                <Link href="/tokenization">
                  <span className="block px-4 py-2 hover:bg-gray-100">
                     Tokenization 
                  </span>
                </Link>
              </li>
              <li >
                <Link href="/contact">
                  <span className="block px-4 py-2 hover:bg-gray-100">Contact </span>
                </Link>
              </li>
              <li>
                <Link href="/story">
                  <span className="block px-4 py-2 hover:bg-gray-100">Our Story</span>
                </Link>
              </li>
               <li>
                <Link href="/partner-ecosystem">
                  <span className="block px-4 py-2 hover:bg-gray-100">Ecosystem</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Auth links */}
          <li>
            <Link href="/auth?tab=register">
              <span className="hover:text-black transition-colors duration-200">
                Sign Up
              </span>
            </Link>
          </li>
          <li>
            <Link href="/auth?tab=login">
              <span className="hover:text-black transition-colors duration-200">
                Login
              </span>
            </Link>
          </li>

          {/* Wallet / Settings icon */}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 text-gray-700" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => alert("Connect Wallet")}>
                  🔗 Connect Wallet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Profile")}>
                  👤 Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Logout")}>
                  🚪 Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col px-4 py-3 space-y-1 font-medium text-neutral-800">
          <li>
            <Link href="/properties">
              <span className="block py-2 hover:text-black">Properties</span>
            </Link>
          </li>
          {/* <li>
            <Link href="/portfolio">
              <span className="block py-2 hover:text-black">Portfolio</span>
            </Link>
          </li> */}

          {/* About dropdown on mobile */}
          <li>
            <button
              className="w-full flex justify-between items-center py-2 hover:text-black focus:outline-none"
              onClick={() => toggleDropdown("About")}
            >
              About
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${
                  openDropdown === "About" ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "About" && (
              <ul className="pl-4 mt-1 border-l border-gray-300">
                <li>
                  <Link href="/blog">
                    <span className="block py-1 hover:text-black">Blog</span>
                  </Link>
                </li>
                <li>
                  <Link href="/whitepaper">
                    <span className="block py-1 hover:text-black">Whitepapers</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tokenization">
                    <span className="block py-1 hover:text-black">
                       Tokenization
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="block py-1 hover:text-black">Contact</span>
                  </Link>
                </li>
                <li>
                  <Link href="/story">
                    <span className="block py-1 hover:text-black">Our Story</span>
                  </Link>
                </li>
                 <li>
                  <Link href="/partner-ecosystem">
                    <span className="block py-1 hover:text-black">Partner Ecosystem</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Auth links */}
          <li>
            <Link href="/auth?tab=register">
              <span className="block py-2 hover:text-black">Sign Up</span>
            </Link>
          </li>
          <li>
            <Link href="/auth?tab=login">
              <span className="block py-2 hover:text-black">Login</span>
            </Link>
          </li>

          {/* Wallet / Settings menu */}
          <li className="pt-3 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 w-full py-2 hover:bg-gray-100 rounded-md">
                  <Menu className="h-5 w-5 text-gray-700 ml-1" />
                  <span>Menu</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuItem onClick={() => alert("Connect Wallet")}>
                  🔗 Connect Wallet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Profile")}>
                  👤 Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Logout")}>
                  🚪 Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </nav>
  );
}
