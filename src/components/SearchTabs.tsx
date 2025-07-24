import React from 'react';
import { Plane, Building, Car } from 'lucide-react';

interface SearchTabsProps {
  activeTab: 'flights' | 'hotels' | 'cars';
  onTabChange: (tab: 'flights' | 'hotels' | 'cars') => void;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'flights' as const, label: 'Flights', icon: Plane },
    { id: 'hotels' as const, label: 'Hotels', icon: Building },
    { id: 'cars' as const, label: 'Car Rentals', icon: Car },
  ];

  return (
    <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-6">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
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
  );
};

export default SearchTabs;