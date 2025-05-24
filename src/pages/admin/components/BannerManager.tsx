import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Eye, EyeOff } from 'lucide-react';
import { Banner } from '../../../types';
import { getBanners, createBanner, updateBanner, deleteBanner } from '../../../lib/api';
import toast from 'react-hot-toast';

const BannerManager: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      toast.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  const toggleBanner = async (banner: Banner) => {
    try {
      await updateBanner(banner.id, { active: !banner.active });
      await loadBanners();
      toast.success(`Banner ${banner.active ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to update banner');
    }
  };

  const handleAddBanner = async () => {
    const newBanner: Omit<Banner, 'id' | 'created_at'> = {
      title: 'New Banner',
      description: 'Banner description',
      image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
      active: false,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    try {
      await createBanner(newBanner);
      await loadBanners();
      toast.success('Banner added successfully');
    } catch (error) {
      toast.error('Failed to add banner');
    }
  };

  const handleEditBanner = async (banner: Banner) => {
    try {
      const updates = {
        title: window.prompt('Enter banner title:', banner.title) || banner.title,
        description: window.prompt('Enter banner description:', banner.description) || banner.description
      };
      
      await updateBanner(banner.id, updates);
      await loadBanners();
      toast.success('Banner updated successfully');
    } catch (error) {
      toast.error('Failed to update banner');
    }
  };

  const handleDeleteBanner = async (bannerId: string) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      await deleteBanner(bannerId);
      await loadBanners();
      toast.success('Banner deleted successfully');
    } catch (error) {
      toast.error('Failed to delete banner');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Banner Management</h2>
        <button
          onClick={handleAddBanner}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Banner</span>
        </button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => toggleBanner(banner)}
                  className={`p-2 rounded-full ${
                    banner.active
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-500 hover:bg-gray-600'
                  } text-white`}
                >
                  {banner.active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{banner.title}</h3>
              <p className="text-gray-600 mt-1">{banner.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Active: {new Date(banner.start_date).toLocaleDateString()} to {new Date(banner.end_date).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditBanner(banner)}
                  className="text-green-600 hover:text-green-900"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteBanner(banner.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerManager;