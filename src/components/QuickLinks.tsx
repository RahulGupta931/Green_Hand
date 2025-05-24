import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks: React.FC = () => {

    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex overflow-x-auto gap-6 -mx-4 px-4">
                    <Link to="/products?category=indoor" className="flex-shrink-0 text-gray-600 hover:text-green-700">
                        Indoor Plants
                    </Link>
                    <Link to="/products?category=outdoor" className="flex-shrink-0 text-gray-600 hover:text-green-700">
                        Outdoor Plants
                    </Link>
                    <Link to="/products?category=succulents" className="flex-shrink-0 text-gray-600 hover:text-green-700">
                        Succulents
                    </Link>
                    <Link to="/care-guide" className="flex-shrink-0 text-gray-600 hover:text-green-700">
                        Plant Care
                    </Link>
                    <Link to="/products?sort=price-low-high" className="flex-shrink-0 text-gray-600 hover:text-green-700">
                        Under ₹2000
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default QuickLinks;