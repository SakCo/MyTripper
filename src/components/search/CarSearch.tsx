import React, { useState } from 'react';
import { MapPin, Calendar, Clock, User } from 'lucide-react';

interface CarSearchProps {
  onSearch: (query: any) => void;
}

const CarSearch: React.FC<CarSearchProps> = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    pickup: '',
    dropoff: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '10:00',
    dropoffTime: '10:00',
    driverAge: 25,
  });

  const [sameLocation, setSameLocation] = useState(true);

  const handleSearch = () => {
    onSearch({ ...searchData, sameLocation });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Pickup Location */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchData.pickup}
              onChange={(e) => setSearchData(prev => ({ ...prev, pickup: e.target.value }))}
              placeholder="City or airport"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Drop-off Location */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={sameLocation ? searchData.pickup : searchData.dropoff}
              onChange={(e) => setSearchData(prev => ({ ...prev, dropoff: e.target.value }))}
              placeholder="Same as pick-up"
              disabled={sameLocation}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50"
            />
          </div>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={sameLocation}
              onChange={(e) => setSameLocation(e.target.checked)}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-600">Same as pick-up</span>
          </label>
        </div>

        {/* Pick-up Date & Time */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={searchData.pickupDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, pickupDate: e.target.value }))}
                className="w-full pl-9 pr-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="time"
                value={searchData.pickupTime}
                onChange={(e) => setSearchData(prev => ({ ...prev, pickupTime: e.target.value }))}
                className="w-full pl-9 pr-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Drop-off Date & Time */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={searchData.dropoffDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, dropoffDate: e.target.value }))}
                className="w-full pl-9 pr-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="time"
                value={searchData.dropoffTime}
                onChange={(e) => setSearchData(prev => ({ ...prev, dropoffTime: e.target.value }))}
                className="w-full pl-9 pr-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Driver Age & Search */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Driver Age</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={searchData.driverAge}
                onChange={(e) => setSearchData(prev => ({ ...prev, driverAge: Number(e.target.value) }))}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
              >
                {Array.from({ length: 56 }, (_, i) => i + 18).map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
        >
          Search Cars
        </button>
      </div>
    </div>
  );
};

export default CarSearch;