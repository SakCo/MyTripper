import React from 'react';
import { Calendar, MapPin, Plane, Building, Car, Clock, CheckCircle, XCircle } from 'lucide-react';
import { User, Booking } from '../../types';

interface BookingsListProps {
  user: User;
}

const BookingsList: React.FC<BookingsListProps> = ({ user }) => {
  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      type: 'flight',
      details: {
        airline: 'Emirates',
        flightNumber: 'EK123',
        route: 'NYC → LAX',
        date: '2024-02-15',
        time: '08:30',
        passengers: 2,
      },
      status: 'confirmed',
      date: '2024-01-20',
      totalPrice: 598,
    },
    {
      id: '2',
      type: 'hotel',
      details: {
        name: 'Grand Plaza Hotel',
        location: 'Downtown Los Angeles',
        checkIn: '2024-02-15',
        checkOut: '2024-02-18',
        rooms: 1,
        guests: 2,
      },
      status: 'confirmed',
      date: '2024-01-20',
      totalPrice: 567,
    },
    {
      id: '3',
      type: 'car',
      details: {
        model: 'Toyota Camry',
        company: 'Hertz',
        pickup: 'LAX Airport',
        dates: 'Feb 15-18, 2024',
      },
      status: 'pending',
      date: '2024-01-22',
      totalPrice: 180,
    },
  ];

  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-5 h-5" />;
      case 'hotel':
        return <Building className="w-5 h-5" />;
      case 'car':
        return <Car className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="p-8 text-center">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-gray-600">Your travel bookings will appear here once you make your first reservation.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
            Filter
          </button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="p-2 bg-green-100 rounded-lg">
                  {getBookingIcon(booking.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 capitalize">{booking.type} Booking</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {booking.type === 'flight' && (
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="font-medium">{booking.details.airline} {booking.details.flightNumber}</p>
                      <p>{booking.details.route} • {booking.details.date} at {booking.details.time}</p>
                      <p>{booking.details.passengers} passenger{booking.details.passengers > 1 ? 's' : ''}</p>
                    </div>
                  )}

                  {booking.type === 'hotel' && (
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="font-medium">{booking.details.name}</p>
                      <p className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{booking.details.location}</span>
                      </p>
                      <p>{booking.details.checkIn} - {booking.details.checkOut}</p>
                      <p>{booking.details.rooms} room, {booking.details.guests} guests</p>
                    </div>
                  )}

                  {booking.type === 'car' && (
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="font-medium">{booking.details.model}</p>
                      <p>{booking.details.company} • {booking.details.pickup}</p>
                      <p>{booking.details.dates}</p>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-2">
                    Booked on {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="text-right ml-6">
                <div className="flex items-center space-x-1 mb-2">
                  {getStatusIcon(booking.status)}
                </div>
                <p className="text-lg font-bold text-gray-900">${booking.totalPrice}</p>
                <div className="flex space-x-2 mt-3">
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                    View Details
                  </button>
                  {booking.status === 'confirmed' && (
                    <button className="text-sm text-gray-600 hover:text-gray-700">
                      Modify
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList;