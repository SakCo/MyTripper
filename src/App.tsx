import React, { useState } from 'react';
import Header from './components/Header';
import SearchTabs from './components/SearchTabs';
import FlightSearch from './components/search/FlightSearch';
import HotelSearch from './components/search/HotelSearch';
import CarSearch from './components/search/CarSearch';
import PopularDestinations from './components/PopularDestinations';
import FeaturedDeals from './components/FeaturedDeals';
import TravelGuides from './components/TravelGuides';
import Footer from './components/Footer';
import AuthModal from './components/auth/AuthModal';
import SearchResults from './components/results/SearchResults';
import UserDashboard from './components/dashboard/UserDashboard';
import { User } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cars'>('flights');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'results' | 'dashboard'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<any>(null);

  const handleAuth = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleSearch = (query: any, type: 'flights' | 'hotels' | 'cars') => {
    setSearchQuery({ ...query, type });
    setCurrentView('results');
  };

  const handleDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleHome = () => {
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'results':
        return (
          <SearchResults 
            query={searchQuery} 
            onBack={handleHome}
          />
        );
      case 'dashboard':
        return (
          <UserDashboard 
            user={user!} 
            onBack={handleHome}
          />
        );
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
              <div className="max-w-7xl mx-auto px-4 pt-16 pb-24">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Find & Book Your Perfect Trip
                  </h1>
                  <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                    Compare prices from hundreds of travel sites and book flights, hotels, and cars at the best rates
                  </p>
                </div>

                {/* Search Container */}
                <div className="max-w-6xl mx-auto">
                  <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />
                  
                  <div className="transform transition-all duration-300">
                    {activeTab === 'flights' && (
                      <FlightSearch onSearch={(query) => handleSearch(query, 'flights')} />
                    )}
                    {activeTab === 'hotels' && (
                      <HotelSearch onSearch={(query) => handleSearch(query, 'hotels')} />
                    )}
                    {activeTab === 'cars' && (
                      <CarSearch onSearch={(query) => handleSearch(query, 'cars')} />
                    )}
                  </div>
                </div>
              </div>
            </section>

            <PopularDestinations />
            <FeaturedDeals />
            <TravelGuides />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onAuthClick={() => setShowAuthModal(true)}
        onDashboard={handleDashboard}
        onHome={handleHome}
      />
      
      {renderCurrentView()}
      
      {currentView === 'home' && <Footer />}
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
        />
      )}
    </div>
  );
}

export default App;