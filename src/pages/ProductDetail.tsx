import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, ShoppingBag, Leaf, Info, Star, Send } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import QuantityInput from '../components/QuantityInput';
import toast from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [withPot, setWithPot] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<any[]>([]);
  const [hoveredStar, setHoveredStar] = useState(0);

  const product = products.find(p => p.id === Number(id));

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const potPrice = 299; // Example pot price
  const finalPrice = withPot ? product.price + potPrice : product.price;
  const discountedPrice = finalPrice - (finalPrice * discount);

  const handleAddToCart = () => {
    addToCart(product, quantity, withPot);
    toast.success('Added to cart!');
  };

  const handleCouponApply = () => {
    // Example coupon logic
    if (couponCode.toLowerCase() === 'welcome10') {
      setDiscount(0.1);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }

    if (userRating === 0) {
      toast.error('Please select a rating');
      return;
    }

    // Add review to the list
    const newReview = {
      id: Date.now().toString(),
      userId: user?.id,
      userName: user?.email?.split('@')[0] || 'Anonymous',
      rating: userRating,
      comment: reviewText,
      created_at: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setReviewText('');
    toast.success('Review submitted successfully!');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-green-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to products
        </button>

        <div className="md:flex md:gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="mb-2">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium uppercase tracking-wide">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= (product.averageRating || 4.5)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.averageRating || 4.5} ({reviews.length} reviews)
              </span>
            </div>

            <div className="mb-6">
              <p className="text-2xl font-bold text-gray-900">
                ₹{discountedPrice.toFixed(2)}
              </p>
              {discount > 0 && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{finalPrice.toFixed(2)}
                </p>
              )}
            </div>

            <div className="prose prose-green mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Care Instructions</h3>
                <p className="text-gray-600">{product.care}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Light</h4>
                    <p className="text-gray-600 text-sm">
                      {product.light === 'low'
                        ? 'Low light conditions'
                        : product.light === 'medium'
                          ? 'Medium light required'
                          : 'Bright light needed'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M12 2v6"></path>
                      <path d="M5 10l7-2v8"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Watering</h4>
                    <p className="text-gray-600 text-sm">
                      {product.water === 'low'
                        ? 'Low water needs'
                        : product.water === 'medium'
                          ? 'Regular watering'
                          : 'Frequent watering'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 pb-6">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-gray-600 text-sm">On all orders over ₹4,000</p>
                </div>
              </div>

              <div className="flex items-start">
                <Info className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Plant Guarantee</h4>
                  <p className="text-gray-600 text-sm">30-day guarantee on all plants</p>
                </div>
              </div>
            </div>

            {/* Pot Selection */}
            <div className="mb-6">
              {/* <h3 className="font-medium text-gray-900 mb-2">Planter Options</h3> */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setWithPot(false)}
                  className={`px-4 py-2 rounded-md border ${!withPot
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-300 text-gray-700'
                    }`}
                >
                  Without Pot
                </button>
                <button
                  onClick={() => setWithPot(true)}
                  className={`px-4 py-2 rounded-md border ${withPot
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-300 text-gray-700'
                    }`}
                >
                  With Pot (+₹{potPrice})
                </button>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Apply Coupon</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleCouponApply}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Quantity</h3>
                <span className="text-gray-600 text-sm">
                  {product.stock > 10
                    ? 'In stock'
                    : product.stock > 0
                      ? `Only ${product.stock} left!`
                      : 'Out of stock'}
                </span>
              </div>

              <div className="flex space-x-4">
                <QuantityInput
                  quantity={quantity}
                  maxQuantity={product.stock}
                  onQuantityChange={setQuantity}
                />

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-grow flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium ${product.stock > 0
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

          {/* Write a Review */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>

            <div className="mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setUserRating(star)}
                    className="p-1 -ml-1"
                  >
                    <Star
                      className={`h-6 w-6 ${star <= (hoveredStar || userRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={handleSubmitReview}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              <Send className="h-5 w-5" />
              <span>Submit Review</span>
            </button>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{review.userName}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;