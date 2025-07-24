import React from 'react';
import { Heart, MapPin, Calendar, Trash2, ExternalLink } from 'lucide-react';
import { User } from '../../types';

interface SavedTripsProps {
  user: User;
}

const SavedTrips: React.FC<SavedTripsProps> = ({ user }) => {
  // Mock saved trips data
  const savedTrips = [
    {
      id: '1',
      type: 'flight',
      title: 'NYC to Paris',
      description: 'Round-trip flight with Air France',
      price: 599,
      image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=300',
      dates: 'Mar 15-22, 2024',
      savedOn: '2024-01-25',
    },
    {
      id: '2',
      type: 'hotel',
      title: 'Grand Hotel Barcelona',
      description: '4-star hotel in city center',
      price: 145,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300',
      dates: 'Apr 10-14, 2024',
      savedOn: '2024-01-22',
    },
    {
      id: '3',
      type: 'car',
      title: 'BMW 3 Series Rental',
      description: 'Luxury car rental in Los Angeles',
      price: 89,
      image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=300',
      dates: 'May 5-8, 2024',
      savedOn: '2024-01-20',
    },
  ];

  if (savedTrips.length === 0) {
    return (
      <div className="p-8 text-center">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved trips yet</h3>
        <p className="text-gray-600">Save flights, hotels, and cars you're interested in to find them easily later.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Saved Trips</h2>
        <p className="text-gray-600">{savedTrips.length} saved items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedTrips.map((trip) => (
          <div key={trip.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative">
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{trip.title}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                  {trip.type}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3">{trip.description}</p>

              <div className="flex items-center space-x-1 text-gray-500 text-sm mb-3">
                <Calendar className="w-4 h-4" />
                <span>{trip.dates}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-gray-900">${trip.price}</span>
                  <span className="text-gray-500 text-sm ml-1">
                    {trip.type === 'hotel' ? '/night' : trip.type === 'car' ? '/day' : ''}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Saved on {new Date(trip.savedOn).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTrips;