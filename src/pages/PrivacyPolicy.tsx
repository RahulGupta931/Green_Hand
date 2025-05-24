import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                            <ShieldCheck className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h2>
                        <p className="text-gray-600">Your privacy is important to us. Here's how we handle your information.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Information We Collect</h3>
                            <p className="text-gray-600">We collect personal information you provide during account registration, checkout, or newsletter sign-up.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">How We Use Your Information</h3>
                            <p className="text-gray-600">Your data is used to process orders, improve our services, and communicate relevant offers or updates.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Cookies and Tracking</h3>
                            <p className="text-gray-600">We use cookies to personalize your experience and analyze site traffic. You can disable cookies in your browser settings.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
                            <p className="text-gray-600">We implement strong security measures to protect your information against unauthorized access and breaches.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Third-Party Sharing</h3>
                            <p className="text-gray-600">We do not sell your data. Information may be shared with trusted partners only to fulfill services or legal obligations.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
                            <p className="text-gray-600">You have the right to access, update, or delete your personal information. Contact us anytime for support.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;