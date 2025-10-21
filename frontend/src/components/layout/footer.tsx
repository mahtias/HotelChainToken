import { Link } from "wouter";
import { FaLinkedin,FaYoutube ,FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container that wraps on smaller screens and arranges columns in grid on md+ */}
        <div className="flex flex-wrap justify-start gap-x-6 gap-y-8 ">
          {/* Logo and description */}
          <div className="w-full md:w-auto">
            <div className="flex items-center mb-4">
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="font-bold text-xl">DigirealAssets</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Democratizing hotel investments through{" "}<br/>
              <br className="md:hidden" />
              blockchain technology and <br />transparent asset tokenization.
            </p>
          </div>

          {/* Invest */}
          <div className="w-1/2 sm:w-1/3 md:w-auto">
            <h3 className="font-semibold mb-4">Invest</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/properties" className="hover:text-white">
                  Tokenization
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="hover:text-white">
                  Partner Ecosystem
                </Link>
              </li>
            </ul>
          </div>

          {/* Advise */}
          <div className="w-1/2 sm:w-1/3 md:w-auto">
            <h3 className="font-semibold mb-4">Advise</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Wealth Management
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Crypto & Strategies
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div className="w-1/2 sm:w-1/3 md:w-auto">
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="hover:text-white">
                  Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/about-tokenization" className="hover:text-white">
                  About Tokenization
                </Link>
              </li>
              <li>
                <Link href="/where-different" className="hover:text-white">
                  How We're Different
                </Link>
              </li>
               <li>
                <a href="#" className="hover:text-white">
                  Our story
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-1/2 sm:w-1/3 md:w-auto">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Legal
                </a>
              </li>
            </ul>
          </div>
          <div className="w-1/2 sm:w-1/3 md:w-auto">
            <h3 className="font-semibold mb-4">Community </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
        className="hover:text-blue-700 transition-colors duration-300" >
        <FaLinkedin className="w-6 h-6" /> 
      </a>
      
      </li>

      <li>
         <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="hover:text-red-600 transition-colors duration-300"
      >
        <FaYoutube className="w-6 h-6" />
      </a>
      </li>
      <li>
             <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="hover:text-red-600 transition-colors duration-300"
      >
        <FaInstagram className="w-6 h-6" />
      </a>
      </li>

      <li>
                 <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="hover:text-red-600 transition-colors duration-300"
      >
        <FaTwitter className="w-6 h-6" />
      </a>
      </li>
      </ul>

     
       
              
              
          </div>
      

          
         
        </div>

        {/* Bottom text */}
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>
            &copy; 2025 DigirealAssets. All rights reserved. | Platform
            licensed and regulated.
          </p>
        </div>
      </div>
    </footer>
  );
}
