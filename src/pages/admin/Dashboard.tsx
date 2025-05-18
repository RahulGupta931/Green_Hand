import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, Users, DollarSign, Settings, LogOut, Plus } from 'lucide-react';
import ProductManager from './components/ProductManager';
import BannerManager from './components/BannerManager';
import FAQManager from './components/FAQManager';
import OrderManager from './components/OrderManager';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'banners' | 'faqs' | 'orders'>('overview');

  const stats = [
    { 
      title: 'Total Sales', 
      value: '₹9,42,426', 
      change: '+16%',
      icon: <DollarSign className="h-6 w-6 text-green-600" />
    },
    { 
      title: 'Total Orders', 
      value: '163', 
      change: '+12%',
      icon: <Package className="h-6 w-6 text-blue-600" />
    },
    { 
      title: 'Total Customers', 
      value: '1,482', 
      change: '+8%',
      icon: <Users className="h-6 w-6 text-purple-600" />
    },
    { 
      title: 'Avg. Order Value', 
      value: '₹5,782', 
      change: '+4%',
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Settings className="h-6 w-6" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products & Categories
            </button>
            <button
              onClick={() => setActiveTab('banners')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'banners'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Banners
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faqs'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      {stat.icon}
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('products')}
                  className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add New Product</span>
                </button>
                <button
                  onClick={() => setActiveTab('banners')}
                  className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Banner</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors"
                >
                  <Package className="h-5 w-5" />
                  <span>View Orders</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'banners' && <BannerManager />}
        {activeTab === 'faqs' && <FAQManager />}
        {activeTab === 'orders' && <OrderManager />}
      </div>
    </div>
  );
};

export default Dashboard;