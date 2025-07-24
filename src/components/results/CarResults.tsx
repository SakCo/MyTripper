import React from 'react';
import { Users, Fuel, Settings, Star } from 'lucide-react';
import { Car } from '../../types';

interface CarResultsProps {
  query: any;
  filters: any;
  sortBy: string;
}

const CarResults: React.FC<CarResultsProps> = ({ query, filters, sortBy }) => {
  // Mock car data
  const cars: Car[] = [
    {
      id: '1',
      model: 'Toyota Camry',
      type: 'Mid-size',
      transmission: 'automatic',
      seats: 5,
      price: 45,
      company: 'Hertz',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Air Conditioning', 'Bluetooth', 'GPS Navigation'],
    },
    {
      id: '2',
      model: 'Honda CR-V',
      type: 'SUV',
      transmission: 'automatic',
      seats: 5,
      price: 62,
      company: 'Enterprise',
      image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Air Conditioning', 'Bluetooth', 'All-wheel Drive'],
    },
    {
      id: '3',
      model: 'BMW 3 Series',
      type: 'Luxury',
      transmission: 'automatic',
      seats: 5,
      price: 89,
      company: 'Avis',
      image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Air Conditioning', 'Bluetooth', 'Leather Seats', 'Sunroof'],
    },
  ];

  const getCompanyRating = (company: string) => {
    const ratings: { [key: string]: number } = {
      'Hertz': 4.2,
      'Enterprise': 4.5,
      'Avis': 4.3,
    };
    return ratings[company] || 4.0;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {cars.length} cars available • {query.pickupDate} - {query.dropoffDate}
        </p>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Best Price
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Popular
          </span>
        </div>
      </div>

      {cars.map((car) => (
        <div key={car.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-6">
            {/* Car Image */}
            <div className="w-48 h-32 flex-shrink-0">
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Car Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{car.model}</h3>
                  <p className="text-gray-600 mb-2">{car.type} • {car.company}</p>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(getCompanyRating(car.company))
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {getCompanyRating(car.company)} rating
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${car.price}</p>
                  <p className="text-sm text-gray-500">per day</p>
                  <p className="text-xs text-gray-400">+ taxes & fees</p>
                </div>
              </div>

              {/* Car Specs */}
              <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{car.seats} seats</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span className="capitalize">{car.transmission}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Fuel className="w-4 h-4" />
                  <span>Full to Full</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {car.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Pick-up Location
                  </button>
                </div>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarResults;