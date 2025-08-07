import { useState } from 'react';
import CabList from './CabList';

interface LocalFormData {
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
}

const MOCK_CABS = [
  {
    id: '1',
    type: 'hatchback',
    partnerName: 'City Rides',
    rating: 4.6,
    eta: '3 mins',
    fare: 350,
    image: 'https://via.placeholder.com/150?text=Hatchback',
  },
  {
    id: '2',
    type: 'sedan',
    partnerName: 'Urban Cabs',
    rating: 4.7,
    eta: '5 mins',
    fare: 450,
    image: 'https://via.placeholder.com/150?text=Sedan',
  },
];

const LocalBooking: React.FC = () => {
  const [formData, setFormData] = useState<LocalFormData>({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
  });
  const [showCabs, setShowCabs] = useState(false);
  const [availableCabs, setAvailableCabs] = useState(MOCK_CABS);
  const [dateError, setDateError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'pickupDate') {
      setDateError('');
    }
  };

  const validateDate = (): boolean => {
    const now = new Date();
    const pickupDate = new Date(formData.pickupDate);
    
    if (pickupDate < now) {
      setDateError('Pickup time cannot be in the past');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDate()) {
      return;
    }
    
    setShowCabs(true);
    setAvailableCabs(MOCK_CABS);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      {/* Left side - 40% width */}
      <div className="w-full lg:w-2/5 max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book Local Cab</h2>
          
          {dateError && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl shadow-sm">
              {dateError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pickupLocation" className="block text-gray-700 mb-2 font-medium">Pickup Location</label>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
                placeholder="Enter pickup location"
                required
              />
            </div>
            
            <div>
              <label htmlFor="dropLocation" className="block text-gray-700 mb-2 font-medium">Drop Location</label>
              <input
                type="text"
                id="dropLocation"
                name="dropLocation"
                value={formData.dropLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
                placeholder="Enter drop location"
                required
              />
            </div>
            
            <div>
              <label htmlFor="pickupDate" className="block text-gray-700 mb-2 font-medium">Pickup Date & Time</label>
              <input
                type="datetime-local"
                id="pickupDate"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Check Availability
            </button>
          </form>
        </div>
        
        {/* booking details after form submission */}
        {showCabs && (
          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-white p-6 rounded-3xl shadow-lg backdrop-blur-sm">
            <h3 className="font-bold text-yellow-800 mb-4 text-lg">🏙️ Booking Details</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-semibold text-gray-800">From:</span> {formData.pickupLocation}</p>
              <p><span className="font-semibold text-gray-800">To:</span> {formData.dropLocation}</p>
              <p><span className="font-semibold text-gray-800">When:</span> {new Date(formData.pickupDate).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Right side - 60% width */}
      <div className="w-full lg:w-3/5">
        {showCabs ? (
          <CabList cabs={availableCabs} />
        ) : (
          <div className="bg-gradient-to-br from-gray-50 to-white p-12 rounded-3xl shadow-lg h-full flex items-center justify-center backdrop-blur-sm">
            <div className="text-center text-gray-500">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-700">Ready to Search</h3>
              <p className="text-gray-600">Fill in your local trip details and click "Check Availability" to find nearby cabs.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalBooking;