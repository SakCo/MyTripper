import React, { useState } from 'react';
import { ArrowRightLeft, Calendar, Users, Plane } from 'lucide-react';

interface FlightSearchProps {
  onSearch: (query: any) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    class: 'economy',
    directOnly: false,
  });

  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');

  const handleSwapCities = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleSearch = () => {
    onSearch({ ...searchData, tripType });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Trip Type Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTripType('roundtrip')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            tripType === 'roundtrip'
              ? 'bg-green-100 text-green-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Round-trip
        </button>
        <button
          onClick={() => setTripType('oneway')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            tripType === 'oneway'
              ? 'bg-green-100 text-green-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          One-way
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* From/To Section */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchData.from}
                onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                placeholder="Departure city"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-black"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchData.to}
                onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                placeholder="Destination city"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-black"
              />
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapCities}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-300 rounded-full p-2 hover:border-green-500 hover:text-green-600 transition-all hidden sm:block"
            title="Swap cities"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* Mobile Swap Button */}
          <button
            onClick={handleSwapCities}
            className="sm:hidden w-full mt-2 p-2 text-gray-600 hover:text-green-600 border border-gray-300 rounded-lg hover:border-green-500 transition-all flex items-center justify-center space-x-2"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span className="text-sm">Swap</span>
          </button>
        </div>

        {/* Dates Section */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={searchData.departure}
                onChange={(e) => setSearchData(prev => ({ ...prev, departure: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-black"
                title="Select departure date"
              />
            </div>
          </div>

          {tripType === 'roundtrip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={searchData.return}
                  onChange={(e) => setSearchData(prev => ({ ...prev, return: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-black"
                  title="Select return date"
                />
              </div>
            </div>
          )}
        </div>

        {/* Passengers & Class */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={searchData.passengers}
                onChange={(e) => setSearchData(prev => ({ ...prev, passengers: Number(e.target.value) }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none text-black"
                title="Select number of passengers"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={searchData.class}
              onChange={(e) => setSearchData(prev => ({ ...prev, class: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none text-black"
              title="Select travel class"
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="mt-6 flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={searchData.directOnly}
            onChange={(e) => setSearchData(prev => ({ ...prev, directOnly: e.target.checked }))}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Direct flights only</span>
        </label>

        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
        >
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;