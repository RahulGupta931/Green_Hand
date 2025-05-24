import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth, CustomerProfile } from '../context/AuthContext';
import toast from 'react-hot-toast';
import logo from '../assets/greenhand_logo.png';
import { indianStates } from '../data/states';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        address: formData.address,
        locality: formData.locality,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
      };

      const { error } = await signUp(formData.email, formData.password, profileData);
      if (error) throw error;

      toast.success('Account created successfully! Please verify your email.');
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
                      value={formData[id as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                      placeholder={label}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address Line */}
              <div>
                <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">Address Line</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  placeholder="e.g. 123 MG Road"
                />
              </div>

              {/* Locality */}
              <div>
                <label htmlFor="locality" className="block mb-1 text-sm font-medium text-gray-700">Locality</label>
                <input
                  id="locality"
                  name="locality"
                  type="text"
                  required
                  value={formData.locality}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  placeholder="e.g. Andheri East"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  placeholder="e.g. Mumbai"
                />
              </div>

              {/* State Dropdown */}
              <div>
                <label htmlFor="state" className="block mb-1 text-sm font-medium text-gray-700">State</label>
                <select
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country (fixed) */}
              <div>
                <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-700">Country</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value="India"
                  disabled
                  className="w-full bg-gray-100 cursor-not-allowed rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm"
                />
              </div>

              {/* Pincode (string input) */}
              <div>
                <label htmlFor="pincode" className="block mb-1 text-sm font-medium text-gray-700">Pincode</label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  pattern="\d{6}"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  placeholder="e.g. 400001"
                />
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
                  value={formData.password}
                  onChange={handleInputChange}
                  className="peer w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 text-sm shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
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
                className="w-full transform transition-transform duration-200 ease-in-out hover:scale-105 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
