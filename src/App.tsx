import { useState } from 'react';
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

  const handleNavigateToSection = (section: string) => {
    // Always navigate to home view first
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    
    // Handle different navigation types
    if (section === 'flights' || section === 'hotels' || section === 'cars') {
      // Set active tab for search functionality
      setActiveTab(section);
      
      // For all search types (flights, hotels, cars), scroll to the search section
      setTimeout(() => {
        const element = document.getElementById('flights'); // Search section ID
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (section === 'deals') {
      // For deals, scroll to deals section without changing active tab
      setTimeout(() => {
        const element = document.getElementById('deals');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
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
            <section id="flights" className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
                <div className="text-center mb-12">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Find & Book Your Perfect Trip
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-green-100 max-w-3xl mx-auto px-4">
                    Compare prices from hundreds of travel sites and book flights, hotels, and cars at the best rates
                  </p>
                </div>

                {/* Search Container */}
                <div className="max-w-6xl mx-auto px-4">
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

            <div id="hotels"></div>
            <div id="cars"></div>
            <PopularDestinations />
            <div id="deals">
              <FeaturedDeals />
            </div>
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
        onNavigateToSection={handleNavigateToSection}
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