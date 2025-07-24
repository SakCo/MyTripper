import React from 'react';
import { Percent, Clock, MapPin, Star } from 'lucide-react';

const FeaturedDeals: React.FC = () => {
  const deals = [
    {
      id: 1,
      type: 'flight',
      title: 'Flash Sale: Europe Flights',
      originalPrice: 599,
      salePrice: 299,
      discount: 50,
      destination: 'London, Paris, Rome',
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=400',
      validUntil: '2024-02-15',
      description: 'Book round-trip flights to major European cities',
    },
    {
      id: 2,
      type: 'hotel',
      title: 'Luxury Hotels 40% Off',
      originalPrice: 250,
      salePrice: 150,
      discount: 40,
      destination: 'Worldwide',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
      validUntil: '2024-02-20',
      description: '5-star hotels with premium amenities',
      rating: 4.8,
    },
    {
      id: 3,
      type: 'package',
      title: 'Tokyo Adventure Package',
      originalPrice: 1299,
      salePrice: 899,
      discount: 31,
      destination: 'Tokyo, Japan',
      image: 'https://images.pexels.com/photos/161154/tokyo-skytree-japan-tower-161154.jpeg?auto=compress&cs=tinysrgb&w=400',
      validUntil: '2024-02-10',
      description: 'Flight + 4-night hotel + city tours included',
    },
    {
      id: 4,
      type: 'car',
      title: 'Weekend Car Rentals',
      originalPrice: 120,
      salePrice: 75,
      discount: 38,
      destination: 'Major US Cities',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
      validUntil: '2024-02-12',
      description: 'Premium cars for weekend getaways',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'flight':
        return 'bg-blue-100 text-blue-800';
      case 'hotel':
        return 'bg-green-100 text-green-800';
      case 'car':
        return 'bg-purple-100 text-purple-800';
      case 'package':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysLeft = (validUntil: string) => {
    const today = new Date();
    const endDate = new Date(validUntil);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Percent className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Featured Deals</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Limited-time offers on flights, hotels, and vacation packages. Book now and save big!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(deal.type)}`}>
                    {deal.type}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{deal.discount}%
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <div className="flex items-center space-x-1 text-white text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{deal.destination}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{deal.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{deal.description}</p>

                {deal.rating && (
                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{deal.rating}</span>
                    <span className="text-sm text-gray-500">rating</span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-green-600">${deal.salePrice}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${deal.originalPrice}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Deal ends in</p>
                    <p className="text-sm font-bold text-red-600">
                      {getDaysLeft(deal.validUntil)} days
                    </p>
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Grab This Deal
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold">
            View All Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;