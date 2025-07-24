import React from 'react';
import { Star, MapPin, Wifi, Car, Waves, Dumbbell } from 'lucide-react';
import { Hotel } from '../../types';

interface HotelResultsProps {
  query: any;
  filters: any;
  sortBy: string;
}

const HotelResults: React.FC<HotelResultsProps> = ({ query, filters, sortBy }) => {
  // Mock hotel data
  const hotels: Hotel[] = [
    {
      id: '1',
      name: 'Grand Plaza Hotel',
      rating: 4.5,
      reviews: 1248,
      price: 189,
      location: 'Downtown ' + (query.destination || 'City Center'),
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Free WiFi', 'Pool', 'Gym', 'Parking'],
      distance: '0.2 miles from center',
    },
    {
      id: '2',
      name: 'Boutique Riverside Inn',
      rating: 4.2,
      reviews: 867,
      price: 145,
      location: 'Riverside ' + (query.destination || 'District'),
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Free WiFi', 'Restaurant', 'Spa'],
      distance: '0.8 miles from center',
    },
    {
      id: '3',
      name: 'Luxury Sky Tower',
      rating: 4.8,
      reviews: 2134,
      price: 295,
      location: 'Business District ' + (query.destination || ''),
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'],
      distance: '0.1 miles from center',
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'pool':
        return <Waves className="w-4 h-4" />;
      case 'gym':
        return <Dumbbell className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {hotels.length} hotels found • {query.checkin} - {query.checkout}
        </p>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Best Value
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            Top Rated
          </span>
        </div>
      </div>

      {hotels.map((hotel) => (
        <div key={hotel.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex">
            {/* Hotel Image */}
            <div className="w-64 h-48 flex-shrink-0">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hotel Details */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between h-full">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(hotel.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">
                        {hotel.rating} ({hotel.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{hotel.location}</span>
                    <span className="text-sm">• {hotel.distance}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                      >
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="text-sm text-green-600 font-medium">
                        +{hotel.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View on Map
                    </button>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Price and Book */}
                <div className="text-right ml-6">
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-gray-900">${hotel.price}</p>
                    <p className="text-sm text-gray-500">per night</p>
                    <p className="text-xs text-gray-400">+ taxes & fees</p>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium w-full mb-2">
                    Book Now
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium w-full text-sm">
                    Save Hotel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelResults;