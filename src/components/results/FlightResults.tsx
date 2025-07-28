import React from 'react';
import { Plane, Clock, Wifi, Coffee, Award } from 'lucide-react';
import { Flight } from '../../types';

interface FlightResultsProps {
  query: any;
  filters: any;
  sortBy: string;
}

const FlightResults: React.FC<FlightResultsProps> = ({ query, filters: _filters, sortBy: _sortBy }) => {
  // Mock flight data
  const flights: Flight[] = [
    {
      id: '1',
      airline: 'Emirates',
      flightNumber: 'EK123',
      origin: query.from || 'NYC',
      destination: query.to || 'LAX',
      departureTime: '08:30',
      arrivalTime: '11:45',
      duration: '5h 15m',
      price: 299,
      stops: 0,
      aircraft: 'Boeing 777',
      class: 'economy',
    },
    {
      id: '2',
      airline: 'Delta',
      flightNumber: 'DL456',
      origin: query.from || 'NYC',
      destination: query.to || 'LAX',
      departureTime: '14:20',
      arrivalTime: '18:10',
      duration: '5h 50m',
      price: 245,
      stops: 1,
      aircraft: 'Airbus A320',
      class: 'economy',
    },
    {
      id: '3',
      airline: 'American Airlines',
      flightNumber: 'AA789',
      origin: query.from || 'NYC',
      destination: query.to || 'LAX',
      departureTime: '19:15',
      arrivalTime: '22:30',
      duration: '5h 15m',
      price: 389,
      stops: 0,
      aircraft: 'Boeing 737',
      class: 'business',
    },
  ];

  const getAirlineLogo = (_airline: string) => {
    // In a real app, this would return actual airline logos
    return `https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=60&h=40`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
        <p className="text-gray-600">
          {flights.length} flights found • {query.departure}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Best Value
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Fastest
          </span>
        </div>
      </div>

      {flights.map((flight) => (
        <div key={flight.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 flex-1">
              {/* Airline Logo */}
              <div className="flex items-center space-x-3">
                <img
                  src={getAirlineLogo(flight.airline)}
                  alt={flight.airline}
                  className="w-12 h-8 object-contain rounded"
                />
                <div>
                  <p className="font-medium text-gray-900">{flight.airline}</p>
                  <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                </div>
              </div>

              {/* Flight Details */}
              <div className="flex items-center justify-between sm:justify-start sm:space-x-8 flex-1">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{flight.departureTime}</p>
                  <p className="text-sm text-gray-500">{flight.origin}</p>
                </div>

                <div className="flex-1 relative hidden sm:block">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="flex-1 h-0.5 bg-gray-300 relative">
                      <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-500">{flight.duration}</p>
                    <p className="text-xs text-gray-400">
                      {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{flight.arrivalTime}</p>
                  <p className="text-sm text-gray-500">{flight.destination}</p>
                </div>

                {/* Mobile flight info */}
                <div className="sm:hidden text-center">
                  <p className="text-sm text-gray-500">{flight.duration}</p>
                  <p className="text-xs text-gray-400">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Price and Book */}
            <div className="mt-4 lg:mt-0 lg:text-right lg:ml-6 flex lg:flex-col justify-between lg:justify-start items-center lg:items-end">
              <div className="mb-2 lg:mb-4">
                <p className="text-xl lg:text-2xl font-bold text-gray-900">${flight.price}</p>
                <p className="text-sm text-gray-500">per person</p>
              </div>
              <button className="bg-green-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Select Flight
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{flight.aircraft}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wifi className="w-4 h-4" />
                  <span>WiFi Available</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Coffee className="w-4 h-4" />
                  <span>Meal Service</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span className="capitalize">{flight.class}</span>
                </div>
              </div>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;