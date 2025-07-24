import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Bell, Heart, User, CreditCard, Settings } from 'lucide-react';
import { User as UserType } from '../../types';
import BookingsList from './BookingsList';
import PriceAlerts from './PriceAlerts';
import SavedTrips from './SavedTrips';
import ProfileSettings from './ProfileSettings';

interface UserDashboardProps {
  user: UserType;
  onBack: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState('bookings');

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'alerts', label: 'Price Alerts', icon: Bell },
    { id: 'saved', label: 'Saved Trips', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-green-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border border-gray-100">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all flex-1 justify-center ${
                activeTab === id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {activeTab === 'bookings' && <BookingsList user={user} />}
          {activeTab === 'alerts' && <PriceAlerts user={user} />}
          {activeTab === 'saved' && <SavedTrips user={user} />}
          {activeTab === 'profile' && <ProfileSettings user={user} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;