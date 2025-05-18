import React, { useState } from 'react';
import { Plus, Edit, Trash, Eye, EyeOff } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  active: boolean;
  startDate: string;
  endDate: string;
}

const BannerManager: React.FC = () => {
  const [banners] = useState<Banner[]>([
    {
      id: 1,
      title: "Summer Sale",
      description: "Get 20% off on all indoor plants",
      image: "https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg",
      active: true,
      startDate: "2024-03-01",
      endDate: "2024-03-31"
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest collection",
      image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
      active: false,
      startDate: "2024-04-01",
      endDate: "2024-04-30"
    }
  ]);

  const toggleBanner = (bannerId: number) => {
    // Implementation for toggling banner visibility
    console.log('Toggle banner:', bannerId);
  };

  const handleAddBanner = () => {
    // Implementation for adding new banner
    console.log('Add new banner');
  };

  const handleEditBanner = (banner: Banner) => {
    // Implementation for editing banner
    console.log('Edit banner:', banner);
  };

  const handleDeleteBanner = (bannerId: number) => {
    // Implementation for deleting banner
    console.log('Delete banner:', bannerId);
  };

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
                  onClick={() => toggleBanner(banner.id)}
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
                <p>Active: {banner.startDate} to {banner.endDate}</p>
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