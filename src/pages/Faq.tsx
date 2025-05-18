import React from 'react';
import { MessageSquare } from 'lucide-react';

const Faq: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                            <MessageSquare className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Quick answers to common questions</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Do you ship plants nationwide?</h3>
                            <p className="text-gray-600">Yes, we ship to all 50 states. Plants are carefully packaged to ensure they arrive in perfect condition.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Do you ship plants nationwide?</h3>
                            <p className="text-gray-600">Yes, we ship to all 50 states. Plants are carefully packaged to ensure they arrive in perfect condition.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Do you ship plants nationwide?</h3>
                            <p className="text-gray-600">Yes, we ship to all 50 states. Plants are carefully packaged to ensure they arrive in perfect condition.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Do you ship plants nationwide?</h3>
                            <p className="text-gray-600">Yes, we ship to all 50 states. Plants are carefully packaged to ensure they arrive in perfect condition.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Do you ship plants nationwide?</h3>
                            <p className="text-gray-600">Yes, we ship to all 50 states. Plants are carefully packaged to ensure they arrive in perfect condition.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">What if my plant arrives damaged?</h3>
                            <p className="text-gray-600">Contact us within 48 hours with photos, and we'll arrange a replacement or refund.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Do you offer plant care advice?</h3>
                            <p className="text-gray-600">Yes! Every plant comes with detailed care instructions, and our team is available for ongoing support.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Can I pick up my order in-store?</h3>
                            <p className="text-gray-600">Yes, local pickup is available at our Plant City location during business hours.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;