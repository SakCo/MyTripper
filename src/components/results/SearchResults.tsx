import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, SortAsc, MapPin, Clock, Star, Users } from 'lucide-react';
import FlightResults from './FlightResults';
import HotelResults from './HotelResults';
import CarResults from './CarResults';

interface SearchResultsProps {
  query: any;
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    rating: 0,
    stops: -1,
    airlines: [],
    amenities: [],
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 2000);
  }, [query]);

  const getTitle = () => {
    switch (query?.type) {
      case 'flights':
        return `Flights from ${query.from || 'Any'} to ${query.to || 'Any'}`;
      case 'hotels':
        return `Hotels in ${query.destination || 'Selected Location'}`;
      case 'cars':
        return `Car Rentals in ${query.pickup || 'Selected Location'}`;
      default:
        return 'Search Results';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="lg:col-span-3 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getTitle()}</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden w-full sm:w-auto justify-center"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <SortAsc className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-auto"
              >
                <option value="price">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating">Rating</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden lg:block'} space-y-6 lg:col-span-1`}>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [0, Number(e.target.value)]
                    }))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600">${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setFilters(prev => ({ ...prev, rating: star }))}
                      className={`p-1 ${star <= filters.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Query-specific filters */}
              {query?.type === 'flights' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stops
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: -1, label: 'Any' },
                      { value: 0, label: 'Direct' },
                      { value: 1, label: '1 Stop' },
                      { value: 2, label: '2+ Stops' },
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="stops"
                          value={option.value}
                          checked={filters.stops === option.value}
                          onChange={() => setFilters(prev => ({ ...prev, stops: option.value }))}
                          className="mr-2"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {query?.type === 'flights' && <FlightResults query={query} filters={filters} sortBy={sortBy} />}
            {query?.type === 'hotels' && <HotelResults query={query} filters={filters} sortBy={sortBy} />}
            {query?.type === 'cars' && <CarResults query={query} filters={filters} sortBy={sortBy} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;