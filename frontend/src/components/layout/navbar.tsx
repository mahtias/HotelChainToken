import { Link } from "wouter";
import { useState } from "react";


export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setHoveredMenu(null), 100); // 100ms delay
    setTimeoutId(id);
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

        {/* Menus */}
        <ul className="flex space-x-8 text-neutral-800 font-medium">
          {[
            {
              label: "Invest",
              items: [
                { label: "Tokenized Real-World Assets", href: "/properties" },
              ],
            },
            {
              label: "Tokenize",
              items: [
                { label: "Fund Tokenization", href: "/tokenization" },
                { label: "Fund Administration", href: "/administration" },
                { label: "Partner Ecosystem", href: "/ecosystem" },
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
              label: "Learn",
              items: [
                { label: "Blog", href: "/blog" },
                { label: "Whitepapers", href: "/whitepaper" },
                { label: "About Tokenization", href: "/about-tokenization" },
                { label: "How We're Different", href: "/where-different" },
                { label: "APIs", href: "/api" },
                { label: "Bug Bounty", href: "/bounty" },
              ],
            },
            {
              label: "About",
              items: [
                { label: "Our Story", href: "/story" },
                { label: "Media Coverage & Press Releases", href: "/media" },
                { label: "Careers", href: "/careers" },
              ],
            },
            {
              label: "Contact",
              items: [{ label: "Get in Touch", href: "/contact" }],
             
            },
          ].map((menu) => (
            <li
              key={menu.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(menu.label)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`cursor-pointer transition-colors duration-200 ${
                  hoveredMenu === menu.label ? "text-black" : "hover:text-black"
                }`}
              >
                {menu.label}
              </span>

              {/* Dropdown */}
              <ul
                className={`absolute left-0 mt-2 bg-white border rounded-lg shadow-lg py-2 w-56 transition-all duration-300 ease-out transform
                ${
                  hoveredMenu === menu.label
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

          {/* Auth Links */}
          <li>
            |  &nbsp;
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
    </nav>
  );
}
