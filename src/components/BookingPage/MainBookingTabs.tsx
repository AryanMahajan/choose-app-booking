import { useState } from 'react';
import OutstationBooking from './OutstationBooking';
import AirportBooking from './AirportBooking';
import LocalBooking from './LocalBooking';

type BookingTabType = 'outstation' | 'airport' | 'local';

const MainBookingTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BookingTabType>('outstation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-2 px-4">
      <div className="container mx-auto">
        {/* booking tabbs */}
        <div className="flex justify-center mb-2">
          <div className="bg-white rounded-full shadow-lg p-2 backdrop-blur-sm">
            <div className="flex">
              <button
                className={`px-8 py-1 text-lg font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'outstation'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-yellow-50'
                }`}
                onClick={() => setActiveTab('outstation')}
              >
                Outstation Cabs
              </button>
              <button
                className={`px-8 py-1 text-lg font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'airport'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-yellow-50'
                }`}
                onClick={() => setActiveTab('airport')}
              >
                Airport Cabs
              </button>
              <button
                className={`px-8 py-1 text-lg font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'local'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-yellow-50'
                }`}
                onClick={() => setActiveTab('local')}
              >
                Local Cabs
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {activeTab === 'outstation' && <OutstationBooking />}
          {activeTab === 'airport' && <AirportBooking />}
          {activeTab === 'local' && <LocalBooking />}
        </div>
      </div>
    </div>
  );
};

export default MainBookingTabs;