import React from 'react';
import { Info } from 'lucide-react';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                            <Info className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Us</h2>
                        <p className="text-gray-600">Learn more about our story, mission, and values</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Our Story</h3>
                            <p className="text-gray-600">Founded in 2020, our goal has always been to bring joy and nature into people’s homes through beautiful, healthy plants.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                            <p className="text-gray-600">We aim to make plant care easy and accessible, empowering every individual to become a successful plant parent.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Why Choose Us</h3>
                            <p className="text-gray-600">We hand-pick every plant, package them with care, and provide ongoing support to help your plants thrive.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Sustainability Commitment</h3>
                            <p className="text-gray-600">We prioritize eco-friendly practices in packaging and sourcing to reduce our environmental impact.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Meet the Team</h3>
                            <p className="text-gray-600">Our passionate team of plant lovers is dedicated to helping you find the perfect plant for your space and lifestyle.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Community Engagement</h3>
                            <p className="text-gray-600">We love collaborating with local artists and supporting green initiatives in our neighborhood and beyond.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
