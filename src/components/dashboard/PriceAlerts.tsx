import React, { useState } from 'react';
import { Bell, Plus, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { User, PriceAlert } from '../../types';

interface PriceAlertsProps {
  user: User;
}

const PriceAlerts: React.FC<PriceAlertsProps> = ({ user }) => {
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [alertForm, setAlertForm] = useState({
    route: '',
    targetPrice: '',
    type: 'flights',
  });

  // Mock price alerts data
  const alerts: PriceAlert[] = [
    {
      id: '1',
      route: 'NYC → LAX',
      targetPrice: 250,
      isActive: true,
      created: '2024-01-15',
    },
    {
      id: '2',
      route: 'LAX → Tokyo',
      targetPrice: 600,
      isActive: true,
      created: '2024-01-20',
    },
    {
      id: '3',
      route: 'NYC → London',
      targetPrice: 400,
      isActive: false,
      created: '2024-01-10',
    },
  ];

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating alert:', alertForm);
    setShowCreateAlert(false);
    setAlertForm({ route: '', targetPrice: '', type: 'flights' });
  };

  const currentPrices = {
    'NYC → LAX': 280,
    'LAX → Tokyo': 580,
    'NYC → London': 420,
  };

  const getPriceStatus = (route: string, targetPrice: number) => {
    const currentPrice = currentPrices[route as keyof typeof currentPrices];
    if (!currentPrice) return null;
    
    const difference = currentPrice - targetPrice;
    const isBelow = difference <= 0;
    
    return {
      isBelow,
      difference: Math.abs(difference),
      currentPrice,
    };
  };

  if (alerts.length === 0 && !showCreateAlert) {
    return (
      <div className="p-8 text-center">
        <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No price alerts set</h3>
        <p className="text-gray-600 mb-6">Get notified when prices drop for your favorite routes.</p>
        <button
          onClick={() => setShowCreateAlert(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Create Your First Alert
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Price Alerts</h2>
        <button
          onClick={() => setShowCreateAlert(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>New Alert</span>
        </button>
      </div>

      {/* Create Alert Form */}
      {showCreateAlert && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Price Alert</h3>
          <form onSubmit={handleCreateAlert} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={alertForm.type}
                  onChange={(e) => setAlertForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="flights">Flights</option>
                  <option value="hotels">Hotels</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                <input
                  type="text"
                  value={alertForm.route}
                  onChange={(e) => setAlertForm(prev => ({ ...prev, route: e.target.value }))}
                  placeholder="e.g., NYC → LAX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Price ($)</label>
                <input
                  type="number"
                  value={alertForm.targetPrice}
                  onChange={(e) => setAlertForm(prev => ({ ...prev, targetPrice: e.target.value }))}
                  placeholder="250"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Create Alert
              </button>
              <button
                type="button"
                onClick={() => setShowCreateAlert(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const priceStatus = getPriceStatus(alert.route, alert.targetPrice);
          
          return (
            <div key={alert.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{alert.route}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Target Price:</span> ${alert.targetPrice}
                    </div>
                    {priceStatus && (
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Current:</span>
                        <span className={priceStatus.isBelow ? 'text-green-600' : 'text-red-600'}>
                          ${priceStatus.currentPrice}
                        </span>
                        {priceStatus.isBelow ? (
                          <TrendingDown className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Created:</span> {new Date(alert.created).toLocaleDateString()}
                    </div>
                  </div>

                  {priceStatus?.isBelow && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        🎉 Price Alert! Current price is ${priceStatus.difference} below your target!
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 ml-6">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alert.isActive}
                      className="sr-only peer"
                      onChange={() => {}}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceAlerts;