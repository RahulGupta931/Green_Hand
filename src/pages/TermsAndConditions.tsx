import React from 'react';
import { FileText } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mb-4">
                            <FileText className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms and Conditions</h2>
                        <p className="text-gray-600">Please read these terms and conditions carefully before using our services.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Acceptance of Terms</h3>
                            <p className="text-gray-600">By accessing or using our website, you agree to be bound by these terms and all applicable laws and regulations.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Modifications</h3>
                            <p className="text-gray-600">We reserve the right to modify these terms at any time. Continued use of the site indicates acceptance of the changes.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">User Responsibilities</h3>
                            <p className="text-gray-600">Users are responsible for maintaining the confidentiality of their account and password and for all activities under their account.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Prohibited Activities</h3>
                            <p className="text-gray-600">You agree not to misuse the services or violate any laws, including unauthorized access or disruption of systems.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Intellectual Property</h3>
                            <p className="text-gray-600">All content on this site is the property of the company and is protected by copyright and trademark laws.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                            <p className="text-gray-600">We are not liable for any direct or indirect damages arising from the use or inability to use the services.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
