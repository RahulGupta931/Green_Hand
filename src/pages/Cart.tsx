import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import QuantityInput from '../components/QuantityInput';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login with return path
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    // Proceed with checkout
    alert('This would proceed to checkout in a complete implementation.');
  };
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
            <div className="mb-6 text-gray-400">
              <ShoppingCart className="h-16 w-16 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any plants to your cart yet.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600 mt-2">{cart.length} item(s)</p>
        </div>
        
        <div className="lg:flex lg:gap-8">
          {/* Cart Items */}
          <div className="lg:flex-grow mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden mr-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              <Link to={`/product/${item.product.id}`} className="hover:text-green-600">
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="Remove item"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Price:</p>
                            <p className="font-medium text-gray-900">₹{item.product.price.toLocaleString('en-IN')}</p>
                          </div>
                          
                          <div>
                            <QuantityInput 
                              quantity={item.quantity} 
                              maxQuantity={item.product.stock} 
                              onQuantityChange={(quantity) => updateQuantity(item.product.id, quantity)}
                              small
                            />
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Subtotal:</p>
                            <p className="font-semibold text-gray-900">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-50 flex flex-wrap gap-4 justify-between items-center">
                <button 
                  onClick={() => navigate(-1)} 
                  className="flex items-center text-gray-600 hover:text-green-700"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Continue Shopping
                </button>
                
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-80 xl:w-96">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {getCartTotal() >= 4000 ? 'Free' : '₹499'}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="font-bold text-gray-900">
                    ₹{(getCartTotal() + (getCartTotal() >= 4000 ? 0 : 499)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Shipping:</p>
                <div className="flex items-center text-green-700 text-sm">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {getCartTotal() >= 4000 ? (
                    <span>Free shipping on orders over ₹4,000!</span>
                  ) : (
                    <span>Add ₹{(4000 - getCartTotal()).toLocaleString('en-IN')} more for free shipping</span>
                  )}
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 flex items-center justify-center"
              >
                <span>{isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              {!isAuthenticated && (
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-4 border border-gray-300 bg-white text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-50 flex items-center justify-center"
                >
                  Continue as Guest
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;