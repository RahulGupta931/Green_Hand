import React from 'react';
import { Truck, Shield, Leaf, ThumbsUp } from 'lucide-react';

const benefits = [
  {
    icon: <Truck className="h-10 w-10" />,
    title: 'Free Shipping',
    description: 'On all orders over $50. We ship plants safely to your doorstep.',
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: 'Guarantee',
    description: '30-day guarantee on all plants. Your plants arrive happy and healthy.',
  },
  {
    icon: <Leaf className="h-10 w-10" />,
    title: 'Expert Care',
    description: 'Detailed care instructions included with every plant.',
  },
  {
    icon: <ThumbsUp className="h-10 w-10" />,
    title: 'Quality',
    description: 'We source the healthiest plants from the best growers.',
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose GreenHand</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            We're committed to bringing the joy of plants to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-green-600 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;