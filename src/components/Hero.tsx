import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/6231690/pexels-photo-6231690.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Bring Nature Into Your Living Space
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
            Discover the perfect plants to transform your home and improve your wellbeing. 
            From air-purifying varieties to low-maintenance options, we have the ideal green 
            companion for every space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-800 font-medium rounded-md transition-transform hover:shadow-lg hover:-translate-y-0.5"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/care-guide" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-green-800 transition-colors"
            >
              Plant Care Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;