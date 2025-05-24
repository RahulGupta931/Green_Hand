import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, LogIn, UserPlus, User, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/greenhand_logo.png'
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isAuthenticated, signOut, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    setIsProfileOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto lg:px-14 md:max-w-7xl sm:max-w-7xl px-4 lg:max-w-none flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-green-800">
        <img src={logo} alt="GreenHand Logo" className="h-10 w-10" />
          <span>GreenHand</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors">
            Shop
          </Link>
          <Link to="/care-guide" className="text-gray-700 hover:text-green-600 transition-colors">
            Plant Care
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors"
            >
              <User className="h-5 w-5" />
              <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      {user?.email}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Link to="/cart" className="relative text-gray-700 p-2">
            <ShoppingCart className="h-5 w-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-6 flex flex-col space-y-4">
          <Link to="/" className="text-gray-700 hover:text-green-600 py-2 transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-green-600 py-2 transition-colors">
            Shop
          </Link>
          <Link to="/care-guide" className="text-gray-700 hover:text-green-600 py-2 transition-colors">
            Plant Care
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600 py-2 transition-colors">
            Contact
          </Link>
          <div className="border-t border-gray-200 pt-4 mt-2">
            <Link to="/search" className="flex items-center text-gray-700 hover:text-green-600 py-2">
              <Search className="h-5 w-5 mr-2" />
              <span>Search</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-green-600 py-2">
                  <User className="h-5 w-5 mr-2" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-700 hover:text-green-600 py-2 w-full"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center text-gray-700 hover:text-green-600 py-2">
                  <LogIn className="h-5 w-5 mr-2" />
                  <span>Sign In</span>
                </Link>
                <Link to="/signup" className="flex items-center text-gray-700 hover:text-green-600 py-2">
                  <UserPlus className="h-5 w-5 mr-2" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;