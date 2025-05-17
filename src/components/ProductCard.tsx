import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Droplet, Sun } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const getLightLevel = (level: 'low' | 'medium' | 'high') => {
    const baseClasses = "flex items-center";
    
    switch (level) {
      case 'low':
        return `${baseClasses} text-yellow-500`;
      case 'medium':
        return `${baseClasses} text-yellow-600`;
      case 'high':
        return `${baseClasses} text-yellow-700`;
      default:
        return baseClasses;
    }
  };

  const getWaterLevel = (level: 'low' | 'medium' | 'high') => {
    const baseClasses = "flex items-center";
    
    switch (level) {
      case 'low':
        return `${baseClasses} text-blue-400`;
      case 'medium':
        return `${baseClasses} text-blue-500`;
      case 'high':
        return `${baseClasses} text-blue-600`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {product.featured && (
          <div className="absolute top-0 left-0 bg-green-600 text-white px-2 py-1 text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <p className="text-xs text-green-600 font-medium uppercase tracking-wider">
            {product.category}
          </p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-gray-900 hover:text-green-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="font-bold text-gray-900 mt-1">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
        
        <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
          <div className={getLightLevel(product.light)}>
            <Sun className="h-3.5 w-3.5 mr-1" />
            <span>{product.light === 'low' ? 'Low Light' : product.light === 'medium' ? 'Medium Light' : 'Bright Light'}</span>
          </div>
          
          <div className={getWaterLevel(product.water)}>
            <Droplet className="h-3.5 w-3.5 mr-1" />
            <span>{product.water === 'low' ? 'Low Water' : product.water === 'medium' ? 'Medium Water' : 'High Water'}</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1">
          <button 
            onClick={() => addToCart(product, 1)}
            className="flex items-center justify-center space-x-1 bg-green-50 hover:bg-green-100 text-green-800 rounded py-2 px-3 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;