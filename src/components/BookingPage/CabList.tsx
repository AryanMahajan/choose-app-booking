import { useState } from 'react';

export type CabType = 'all' | 'hatchback' | 'sedan' | 'suv' | 'bike' | 'taxi';

export interface Cab {
  id: string;
  type: CabType;
  partnerName: string;
  rating: number;
  eta: string; // estimated time of arrival
  fare: number;
  image: string;
}

interface CabListProps {
  cabs: Cab[];
}

const CabList: React.FC<CabListProps> = ({ cabs }) => {
  const [activeTab, setActiveTab] = useState<CabType>('all');
  
  const filteredCabs = activeTab === 'all' 
    ? cabs 
    : cabs.filter(cab => cab.type === activeTab);

  const tabCounts = {
    all: cabs.length,
    hatchback: cabs.filter(cab => cab.type === 'hatchback').length,
    sedan: cabs.filter(cab => cab.type === 'sedan').length,
    suv: cabs.filter(cab => cab.type === 'suv').length,
    bike: cabs.filter(cab => cab.type === 'bike').length,
    taxi: cabs.filter(cab => cab.type === 'taxi').length,
  };

  const tabs: { type: CabType; label: string; icon: string }[] = [
    { type: 'all', label: 'All', icon: '' },
    { type: 'hatchback', label: 'Hatchback', icon: '' },
    { type: 'sedan', label: 'Sedan', icon: '' },
    { type: 'suv', label: 'SUV', icon: '' },
    { type: 'bike', label: 'Bike', icon: '' },
    { type: 'taxi', label: 'Taxi', icon: '' },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Available Cabs</h2>
      
      {/* Tabs */}
      <div className="flex justify-center overflow-x-auto mb-8">
        <div className="inline-flex bg-gray-50 p-1 rounded-full gap-1">
          {tabs.map(tab => (
            <button
              key={tab.type}
              className={`px-4 py-3 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium ${
                activeTab === tab.type 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md transform scale-105' 
                  : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab(tab.type)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label} ({tabCounts[tab.type]})
            </button>
          ))}
        </div>
      </div>
      
      {/* Cab list */}
      {filteredCabs.length > 0 ? (
        <div className="space-y-4">
          {filteredCabs.map(cab => (
            <div key={cab.id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 flex items-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl mr-6 flex items-center justify-center overflow-hidden shadow-md">
                <img 
                  src={cab.image} 
                  alt={`${cab.type} cab`} 
                  className="w-16 h-16 object-cover rounded-xl"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{cab.partnerName}</h3>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{cab.rating.toFixed(1)}</span>
                      </span>
                      <span className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                        <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">ETA: {cab.eta}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800 mb-2">₹{cab.fare.toFixed(2)}</div>
                    <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white text-sm font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2 text-gray-700">No cabs available</h3>
          <p className="text-gray-500">No cabs available for this category. Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default CabList;