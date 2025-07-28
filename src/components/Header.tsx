import React, { useState } from 'react';
import { Menu, X, User, Bell, Heart } from 'lucide-react';

interface HeaderProps {
  user?: any;
  onAuthClick: () => void;
  onDashboard: () => void;
  onHome: () => void;
  onNavigateToSection?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onAuthClick, onDashboard, onHome, onNavigateToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(section);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={onHome} className="flex items-center">
            <img 
              src="/logo.jpg" 
              alt="MyTripper Logo" 
              className="w-24 h-16 object-contain rounded-lg"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('flights')} 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Flights
            </button>
            <button 
              onClick={() => handleNavClick('hotels')} 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Hotels
            </button>
            <button 
              onClick={() => handleNavClick('cars')} 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Car Rentals
            </button>
            <button 
              onClick={() => handleNavClick('deals')} 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Deals
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button 
                  title="Notifications"
                  className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                </button>
                <button 
                  title="Favorites"
                  className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button 
                  onClick={onDashboard}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">{user.name}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-3">
              <button 
                onClick={() => handleNavClick('flights')} 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2 text-left"
              >
                Flights
              </button>
              <button 
                onClick={() => handleNavClick('hotels')} 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2 text-left"
              >
                Hotels
              </button>
              <button 
                onClick={() => handleNavClick('cars')} 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2 text-left"
              >
                Car Rentals
              </button>
              <button 
                onClick={() => handleNavClick('deals')} 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2 text-left"
              >
                Deals
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
