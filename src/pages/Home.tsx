import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';
import Benefits from '../components/Benefits';
import { products } from '../data/products';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts products={products} />
      <Categories />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-green-700 text-white rounded-lg overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">New to Plant Parenthood?</h2>
                <p className="text-green-100 mb-6 text-lg">
                  Our comprehensive care guides will help you choose the right plants 
                  and keep them thriving year-round.
                </p>
                <div>
                  <a href="/care-guide" className="inline-block bg-white text-green-700 font-medium px-6 py-3 rounded-md hover:bg-green-100 transition-colors">
                    View Care Guides
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg" 
                  alt="Person caring for plants" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Benefits />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Join Our Community</h2>
          <div className="max-w-xl mx-auto">
            <p className="text-gray-600 mb-6">
              Sign up for our newsletter to receive care tips, special offers, and updates on new plant arrivals.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="bg-green-700 text-white font-medium px-6 py-3 rounded-md hover:bg-green-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to receive marketing emails from GreenHand. 
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;