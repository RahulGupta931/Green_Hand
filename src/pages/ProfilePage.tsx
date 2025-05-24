import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface CustomerProfile {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    created_at: string;
}

const ProfilePage: React.FC = () => {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState<CustomerProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editForm, setEditForm] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
    });

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!user) {
                    setLoading(false);
                    return;
                }
                const { data, error } = await supabase
                    .from('customer_profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error);
                    toast.error('Error loading profile');
                } else {
                    setProfile(data);
                    setEditForm({
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        phone: data.phone || '',
                        address: data.address || '',
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error loading profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!user || !profile) return;

        setSaving(true);
        try {
            const { error } = await supabase
                .from('customer_profiles')
                .update({
                    first_name: editForm.first_name,
                    last_name: editForm.last_name,
                    phone: editForm.phone,
                    address: editForm.address,
                })
                .eq('id', user.id);

            if (error) {
                throw error;
            }

            setProfile({
                ...profile,
                first_name: editForm.first_name,
                last_name: editForm.last_name,
                phone: editForm.phone,
                address: editForm.address,
            });

            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (profile) {
            setEditForm({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                phone: profile.phone || '',
                address: profile.address || '',
            });
        }
        setIsEditing(false);
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully');
        } catch (error) {
            toast.error('Error signing out');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Profile not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-lg shadow-sm border-b border-gray-200">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="bg-white rounded-b-lg shadow-sm">
                    {/* Profile Header */}
                    <div className="px-6 py-8 border-b border-gray-200">
                        <div className="flex items-center space-x-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                                    <User className="h-12 w-12 text-green-600" />
                                </div>
                                <button className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <Camera className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {`${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'User'}
                                </h2>
                                <p className="text-gray-600 mt-1">{user?.email}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Member since{' '}
                                    {new Date(profile.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>

                            {/* Edit Button */}
                            <div>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                                        >
                                            <Save className="h-4 w-4" />
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="px-6 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <User className="h-5 w-5 text-green-600" />
                                    Personal Information
                                </h3>

                                <div className="space-y-6">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={editForm.first_name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Enter your first name"
                                            />
                                        ) : (
                                            <p className="text-gray-900 py-2">{profile.first_name || 'Not provided'}</p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={editForm.last_name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Enter your last name"
                                            />
                                        ) : (
                                            <p className="text-gray-900 py-2">{profile.last_name || 'Not provided'}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="flex items-center gap-3 py-2">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-900">{user?.email}</span>
                                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                                Verified
                                            </span>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={editForm.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Enter your phone number"
                                            />
                                        ) : (
                                            <p className="text-gray-900 py-2">{profile.phone || 'Not provided'}</p>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                name="address"
                                                value={editForm.address}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Enter your address"
                                            />
                                        ) : (
                                            <p className="text-gray-900 py-2 whitespace-pre-line">{profile.address || 'Not provided'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Account Settings (optional) */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-green-600" />
                                    Account Settings
                                </h3>

                                <p className="text-gray-600">
                                    You can manage your account settings here. (This section can be expanded later)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
