import { Building } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Building className="text-primary text-2xl mr-3" />
              <span className="font-bold text-xl">HotelVest</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Democratizing hotel investments through blockchain technology and transparent asset tokenization.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/properties" className="hover:text-white">Properties</Link></li>
              <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link href="/analytics" className="hover:text-white">Analytics</Link></li>
              <li><Link href="/calculator" className="hover:text-white">Calculator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; 2024 HotelVest. All rights reserved. | Platform licensed and regulated.</p>
        </div>
      </div>
    </footer>
  );
}
