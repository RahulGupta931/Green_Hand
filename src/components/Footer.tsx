import React from 'react';
import { Link } from 'react-router-dom';
import {Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import favicon from '../assets/favicon.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold mb-4">
              <img src={favicon} className='h-8 w-8' alt="footer-logo" />
              <span>GreenHand</span>
            </Link>
            <p className="text-green-100 mb-4">
              Bringing nature into your living spaces with the finest selection of plants.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/greenhand.store/" className="text-green-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576732100893" className="text-green-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-green-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-100 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-green-100 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-green-100 hover:text-white transition-colors">Plant Care</Link>
              </li>
              <li>
                <Link to="/contact" className="text-green-100 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/about" className="text-green-100 hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-green-100 hover:text-white transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-green-100 hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-green-100 hover:text-white transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-green-100 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-green-100 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Green Street, Plant City, GA 30301</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>hello@greenhand.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-6 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} GreenHand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;