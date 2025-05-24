import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { useAuth, CustomerProfile } from '../context/AuthContext';
import toast from 'react-hot-toast';
import logo from '../assets/greenhand_logo.png';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profileData: CustomerProfile = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        address: formData.address
      };

      const { error } = await signUp(formData.email, formData.password, profileData);
      if (error) throw error;

      toast.success('Account created successfully! Please check your email to verify your account.');
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <Link to="/" className="flex justify-center">
          <img src={logo} alt="GreenHand Logo" className="h-14 w-14" />
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
        <div className="mt-2 w-16 h-1 mx-auto bg-green-500 rounded-full" />
        <p className="mt-2 text-sm text-gray-600">Join us and start shopping for beautiful plants</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-10 px-6 sm:px-10 rounded-2xl shadow-xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'firstName', label: 'First Name' },
                { id: 'lastName', label: 'Last Name' },
              ].map(({ id, label }) => (
                <div key={id}>
                  <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                  <div className="relative">
                    <input
                      id={id}
                      name={id}
                      type="text"
                      required
                      autoComplete={id}
                      value={formData[id as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                      placeholder={label}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter your phone number"
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">Address</label>
              <div className="relative">
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none resize-none"
                  placeholder="Enter your full address"
                />
                <MapPin className="absolute top-3 right-3 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full transform transition-transform duration-200 ease-in-out hover:scale-105 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
