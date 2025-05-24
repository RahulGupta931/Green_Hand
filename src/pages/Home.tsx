import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Gift, Star, Clock } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';

const Home: React.FC = () => {
  // Get different product collections
  const dealsOfTheDay = products.slice(0, 4);
  const bestSellers = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = [...products].sort(() => Math.random() - 0.5).slice(0, 4);
  const trending = [...products].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-100">
      <Hero/>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Deals of the Day */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-red-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Deals of the Day</h2>
                </div>
                <Link 
                  to="/products?deals=true" 
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  See all deals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <ProductGrid products={dealsOfTheDay} />
            </section>

            {/* Best Sellers */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-400 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Best Sellers</h2>
                </div>
                <Link 
                  to="/products?sort=best-selling" 
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  View all
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <ProductGrid products={bestSellers} />
            </section>

            {/* Category Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Indoor Plants</h3>
                <img 
                  src="https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg"
                  alt="Indoor Plants"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <Link 
                  to="/products?category=indoor"
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  Shop now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Succulents</h3>
                <img 
                  src="https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg"
                  alt="Succulents"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <Link 
                  to="/products?category=succulents"
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  Shop now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Deals */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Gift className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-900">Top Deals</h2>
              </div>
              <div className="space-y-4">
                {dealsOfTheDay.slice(0, 3).map(product => (
                  <Link 
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-start hover:bg-gray-50 p-2 rounded-lg"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-green-600 font-medium">₹{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Now */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-900">Trending Now</h2>
              </div>
              <div className="space-y-4">
                {trending.slice(0, 3).map(product => (
                  <Link 
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-start hover:bg-gray-50 p-2 rounded-lg"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-green-600 font-medium">₹{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recently Viewed */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recently Viewed</h2>
              <div className="space-y-4">
                {newArrivals.slice(0, 3).map(product => (
                  <Link 
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-start hover:bg-gray-50 p-2 rounded-lg"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-green-600 font-medium">₹{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Benefits/>
    </div>
  );
};

export default Home;