import { useState, useRef } from "react";
import { Link } from "wouter";

const menus = [
  {
    
    label: "Invest",
    items: [
      { label: "Tokenized Real-World Assets", href: "/properties" },
      { label: "Partner Ecosystem", href: "/ecosystem" }
    ],
  },
  {
    label: "Advise",
    items: [
      { label: "Wealth Management", href: "/wealth" },
      { label: "Crypto & Strategies", href: "/crypto" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Whitepapers", href: "/whitepaper" },
      { label: "About Tokenization", href: "/about-tokenization" },
      { label: "How We're Different", href: "/where-different" },
      { label: "Contact", href: "/contact" },
      { label: "Our Story", href: "/story" },
    ],
  },
  // {
  //   label: "About",
  //   items: [
  //     { label: "Our Story", href: "/story" },
  //     { label: "Media Coverage & Press Releases", href: "/media" },
  //     { label: "Careers", href: "/careers" },
  //   ],
  // },
  // {
  //   label: "Contact",
  //   items: [{ label: "Get in Touch", href: "/contact" }],
  // },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handles desktop hover with delay
  const handleMouseEnter = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 250); // ⏱ delay before closing dropdown (250 ms)
  };

  // Toggle dropdown in mobile menu
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

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 text-neutral-800 font-medium">
          {menus.map((menu) => (
            <li
              key={menu.label}
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter(menu.label)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`hover:text-black transition-colors duration-200 ${
                  openDropdown === menu.label ? "text-black" : ""
                }`}
              >
                {menu.label}
              </span>

              {/* Dropdown */}
              <ul
                className={`absolute left-0 mt-2 bg-white border rounded-lg shadow-lg py-2 w-56 transition-all duration-300 ease-out transform ${
                  openDropdown === menu.label
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible"
                }`}
              >
                {menu.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <span className="block px-4 py-2 hover:bg-gray-100 hover:text-black transition-colors duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Auth links */}
          <li>
            <Link href="/signup">
              <span className="hover:text-black transition-colors duration-200">
                Sign Up
              </span>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <span className="hover:text-black transition-colors duration-200">
                Login
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col px-4 py-3 space-y-1 font-medium text-neutral-800">
          {menus.map((menu) => (
            <li key={menu.label}>
              <button
                className="w-full flex justify-between items-center py-2 hover:text-black focus:outline-none"
                onClick={() => toggleDropdown(menu.label)}
              >
                {menu.label}
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    openDropdown === menu.label ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === menu.label && (
                <ul className="pl-4 mt-1 border-l border-gray-300">
                  {menu.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <span className="block py-1 hover:text-black">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <Link href="/signup">
              <span className="block py-2 hover:text-black">Sign Up</span>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <span className="block py-2 hover:text-black">Login</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
