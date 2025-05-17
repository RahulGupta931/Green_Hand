import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products, categories } from '../data/products';
import { ChevronDown, Filter, X } from 'lucide-react';

const Products: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      // Convert URL param to title case for matching with our categories
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (categories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      }
    }
  }, [location]);

  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Sort
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (featured first, then by id)
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.id - b.id;
        });
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Our Plants</h1>
            <p className="text-gray-600 mt-2">Discover the perfect plants for your space</p>
          </div>
          
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded border border-gray-300 text-gray-700"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                          selectedCategory === category 
                            ? 'bg-green-100 text-green-800' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search plants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {searchTerm && (
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchTerm("")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filters - Mobile */}
            {isMobileFiltersOpen && (
              <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium">Filters</h3>
                    <button 
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            className={`block w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                              selectedCategory === category 
                                ? 'bg-green-100 text-green-800' 
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsMobileFiltersOpen(false);
                            }}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Search</h4>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search plants..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {searchTerm && (
                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setSearchTerm("")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t flex justify-end">
                    <button 
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product List */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{filteredProducts.length} plants</p>
                
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="name-a-z">Name: A to Z</option>
                    <option value="name-z-a">Name: Z to A</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600">No plants found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchTerm("");
                    }}
                    className="mt-4 text-green-600 hover:text-green-700 font-medium"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;