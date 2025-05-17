import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'indoor',
    name: 'Indoor Plants',
    description: 'Perfect for bringing life to your home or office',
    image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Plants',
    description: 'Beautify your garden, patio or balcony',
    image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
  },
  {
    id: 'succulents',
    name: 'Succulents',
    description: 'Low-maintenance plants for busy people',
    image: 'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg',
  },
  {
    id: 'herbs',
    name: 'Herbs',
    description: 'Grow your own fresh herbs for cooking',
    image: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg',
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Plant Categories</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            We offer a wide selection of plants for every space and purpose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  <p className="text-white/80 mt-1">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;