import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Lock, Save } from 'lucide-react';
import { User as UserType } from '../../types';

interface ProfileSettingsProps {
  user: UserType;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1990-01-01',
    passport: 'US123456789',
    preferences: {
      currency: 'USD',
      language: 'en',
      newsletter: true,
      smsAlerts: false,
      emailAlerts: true,
    },
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'preferences', label: 'Preferences', icon: MapPin },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  ];

  const handleSave = () => {
    console.log('Saving profile data:', profileData);
    // In a real app, this would save to the backend
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === id
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'personal' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Preferences</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Currency
                      </label>
                      <select
                        value={profileData.preferences.currency}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, currency: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={profileData.preferences.language}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, language: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Email Notifications</span>
                      <p className="text-sm text-gray-500">Receive booking confirmations and updates via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.preferences.emailAlerts}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, emailAlerts: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">SMS Alerts</span>
                      <p className="text-sm text-gray-500">Get text messages for important updates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.preferences.smsAlerts}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, smsAlerts: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Newsletter</span>
                      <p className="text-sm text-gray-500">Receive travel deals and destination guides</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.preferences.newsletter}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, newsletter: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Security</h3>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">Change Password</span>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>

                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">Two-Factor Authentication</span>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <span className="text-sm text-gray-500">Not enabled</span>
                    </div>
                  </button>

                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">Login History</span>
                        <p className="text-sm text-gray-500">View recent account activity</p>
                      </div>
                      <span className="text-sm text-gray-500">View</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">•••• •••• •••• 4242</span>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                        <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors">
                    + Add New Payment Method
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;