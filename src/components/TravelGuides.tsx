import React from 'react';
import { BookOpen, ArrowRight, Clock, MapPin } from 'lucide-react';

const TravelGuides: React.FC = () => {
  const guides = [
    {
      id: 1,
      title: 'The Ultimate Guide to Tokyo',
      excerpt: 'Discover the best places to visit, eat, and stay in Japan\'s vibrant capital city.',
      image: 'https://images.pexels.com/photos/161154/tokyo-skytree-japan-tower-161154.jpeg?auto=compress&cs=tinysrgb&w=500',
      readTime: '8 min read',
      destination: 'Tokyo, Japan',
      category: 'City Guide',
      publishedDate: '2024-01-15',
    },
    {
      id: 2,
      title: 'European Train Travel: Complete Guide',
      excerpt: 'Everything you need to know about traveling Europe by train, including routes and tips.',
      image: 'https://images.pexels.com/photos/461772/pexels-photo-461772.jpeg?auto=compress&cs=tinysrgb&w=500',
      readTime: '12 min read',
      destination: 'Europe',
      category: 'Transportation',
      publishedDate: '2024-01-12',
    },
    {
      id: 3,
      title: 'Budget Travel: Southeast Asia',
      excerpt: 'How to explore Thailand, Vietnam, and Cambodia on a shoestring budget.',
      image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=500',
      readTime: '10 min read',
      destination: 'Southeast Asia',
      category: 'Budget Travel',
      publishedDate: '2024-01-10',
    },
    {
      id: 4,
      title: 'New York City: First Timer\'s Guide',
      excerpt: 'Must-see attractions, hidden gems, and insider tips for your first visit to NYC.',
      image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=500',
      readTime: '6 min read',
      destination: 'New York, USA',
      category: 'City Guide',
      publishedDate: '2024-01-08',
    },
    {
      id: 5,
      title: 'Digital Nomad Guide: Best Cities',
      excerpt: 'Top destinations for remote workers with great WiFi, coworking spaces, and communities.',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500',
      readTime: '15 min read',
      destination: 'Worldwide',
      category: 'Remote Work',
      publishedDate: '2024-01-05',
    },
    {
      id: 6,
      title: 'Safari Adventure: Kenya & Tanzania',
      excerpt: 'Plan the perfect African safari with wildlife viewing tips and accommodation guides.',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=500',
      readTime: '11 min read',
      destination: 'East Africa',
      category: 'Adventure',
      publishedDate: '2024-01-03',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'City Guide':
        return 'bg-blue-100 text-blue-800';
      case 'Transportation':
        return 'bg-green-100 text-green-800';
      case 'Budget Travel':
        return 'bg-yellow-100 text-yellow-800';
      case 'Remote Work':
        return 'bg-purple-100 text-purple-800';
      case 'Adventure':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Travel Guides</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert travel advice, destination guides, and insider tips to help you plan your perfect trip
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <article
              key={guide.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(guide.category)}`}>
                    {guide.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{guide.destination}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {guide.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {guide.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(guide.publishedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium group">
                    <span>Read Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
            Browse All Guides
          </button>
        </div>
      </div>
    </section>
  );
};

export default TravelGuides;