// Import CabType from CabList
import { useState } from 'react';
import CabList, { type CabType } from './CabList';

type TripType = 'oneWay' | 'roundTrip' | 'multiCity';

interface OutstationFormData {
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  returnDate?: string;
  additionalStops?: string[];
}

// Mock data for available cabs
const MOCK_CABS = [
  {
    id: '1',
    type: 'sedan' as CabType,
    partnerName: 'Comfort Rides',
    rating: 4.7,
    eta: '5 mins',
    fare: 1550,
    image: '/images/sedan.png',

  },
  {
    id: '2',
    type: 'suv' as CabType,
    partnerName: 'Premium Cars',
    rating: 4.9,
    eta: '8 mins',
    fare: 2275,
    image: '/images/suv.png',
  },
  {
    id: '3',
    type: 'hatchback' as CabType,
    partnerName: 'Budget Wheels',
    rating: 4.3,
    eta: '3 mins',
    fare: 950,
    image: '/images/hatchback.png',
  },
  {
    id: '4',
    type: 'bike' as CabType,
    partnerName: 'QuickRide',
    rating: 4.6,
    eta: '2 mins',
    fare: 350,
    image: '/images/bike.png',
  },
  {
    id: '5',
    type: 'taxi' as CabType,
    partnerName: 'City Cabs',
    rating: 4.4,
    eta: '4 mins',
    fare: 1200,
    image: '/images/taxi.png',
  },
  {
    id: '6',
    type: 'hatchback' as CabType,
    partnerName: 'Economy Ride',
    rating: 4.1,
    eta: '6 mins',
    fare: 875,
    image: '/images/hatchback.png',
  },
  {
    id: '7',
    type: 'sedan' as CabType,
    partnerName: 'Lux Rides',
    rating: 4.8,
    eta: '7 mins',
    fare: 1625,
    image: '/images/sedan.png',
  },
  {
    id: '8',
    type: 'suv' as CabType,
    partnerName: 'RideMax',
    rating: 4.5,
    eta: '9 mins',
    fare: 2400,
    image: '/images/suv.png',
  },
  {
    id: '9',
    type: 'bike' as CabType,
    partnerName: 'Speedy Wheels',
    rating: 4.2,
    eta: '1 min',
    fare: 325,
    image: '/images/bike.png',
  },
  {
    id: '10',
    type: 'taxi' as CabType,
    partnerName: 'Metro Cabs',
    rating: 4.6,
    eta: '5 mins',
    fare: 1100,
    image: '/images/taxi.png',
  }
];


const OutstationBooking: React.FC = () => {
  const [tripType, setTripType] = useState<TripType>('oneWay');
  const [formData, setFormData] = useState<OutstationFormData>({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    returnDate: '',
  });
  const [showCabs, setShowCabs] = useState(false);
  const [availableCabs, setAvailableCabs] = useState(MOCK_CABS);
  const [dateError, setDateError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'pickupDate' || name === 'returnDate') {
      setDateError('');
    }
  };

  const validateDates = (): boolean => {
    const now = new Date();
    const pickupDate = new Date(formData.pickupDate);
    
    if (pickupDate < now) {
      setDateError('Pickup date and time cannot be in the past');
      return false;
    }
    
    if (tripType === 'roundTrip' && formData.returnDate) {
      const returnDate = new Date(formData.returnDate);
      
      if (returnDate <= pickupDate) {
        setDateError('Return date and time must be after pickup date and time');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDates()) {
      return;
    }
    
    // api here...
    setShowCabs(true);
    setAvailableCabs(MOCK_CABS);
  };

  const addStop = () => {
    setFormData(prev => ({
      ...prev,
      additionalStops: [...(prev.additionalStops || []), '']
    }));
  };

  const updateStop = (index: number, value: string) => {
    if (!formData.additionalStops) return;
    
    const newStops = [...formData.additionalStops];
    newStops[index] = value;
    
    setFormData(prev => ({
      ...prev,
      additionalStops: newStops
    }));
  };

  const removeStop = (index: number) => {
    if (!formData.additionalStops) return;
    
    setFormData(prev => ({
      ...prev,
      additionalStops: prev.additionalStops?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      {/* Left side - 40% width */}
      <div className="w-full lg:w-2/5 max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-xl backdrop-blur-sm">
          {/* Trip Type Tabs */}
          <div className="flex justify-center mb-2">
            <div className="bg-gray-50 p-1 rounded-full">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  tripType === 'oneWay'
                    ? 'bg-yellow-400 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
                onClick={() => setTripType('oneWay')}
              >
                One Way
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  tripType === 'roundTrip'
                    ? 'bg-yellow-400 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
                onClick={() => setTripType('roundTrip')}
              >
                Round Trip
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  tripType === 'multiCity'
                    ? 'bg-yellow-400 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
                onClick={() => setTripType('multiCity')}
              >
                Multi City
              </button>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Book Outstation Cab</h2>
          
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
            
            {/* additional stops */}
            {tripType === 'multiCity' && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-gray-700 font-medium">Additional Stops</label>
                  <button 
                    type="button" 
                    onClick={addStop}
                    className="text-yellow-500 text-sm hover:text-yellow-600 font-medium"
                  >
                    + Add Stop
                  </button>
                </div>
                
                {formData.additionalStops?.map((stop, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <input
                      type="text"
                      value={stop}
                      onChange={(e) => updateStop(index, e.target.value)}
                      className="flex-grow px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
                      placeholder={`Stop ${index + 1}`}
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => removeStop(index)}
                      className="ml-3 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            
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
            
            {/* return date for round trips */}
            {tripType === 'roundTrip' && (
              <div>
                <label htmlFor="returnDate" className="block text-gray-700 mb-2 font-medium">Return Date & Time</label>
                <input
                  type="datetime-local"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
                  required={tripType === 'roundTrip'}
                />
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Check Availability
            </button>
          </form>
        </div>
        
        {/* booking details after form submission
        {showCabs && (
          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-white p-6 rounded-3xl shadow-lg backdrop-blur-sm">
            <h3 className="font-bold text-yellow-800 mb-4 text-lg">📋 Booking Details</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-semibold text-gray-800">From:</span> {formData.pickupLocation}</p>
              <p><span className="font-semibold text-gray-800">To:</span> {formData.dropLocation}</p>
              <p><span className="font-semibold text-gray-800">Departure:</span> {new Date(formData.pickupDate).toLocaleDateString()}</p>
              {tripType === 'roundTrip' && formData.returnDate && (
                <p><span className="font-semibold text-gray-800">Return:</span> {new Date(formData.returnDate).toLocaleDateString()}</p>
              )}
              {tripType === 'multiCity' && formData.additionalStops?.length && (
                <div>
                  <span className="font-semibold text-gray-800">Stops:</span>
                  <ul className="list-disc list-inside ml-4">
                    {formData.additionalStops.map((stop, index) => (
                      <li key={index}>{stop}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
      
      {/* Right side - 60% width */}
      <div className="w-full lg:w-3/5">
        {showCabs ? (
          <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2">
            <CabList cabs={availableCabs} />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-50 to-white p-12 rounded-3xl shadow-lg h-full flex items-center justify-center backdrop-blur-sm">
            <div className="text-center text-gray-500">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-700">Ready to Search</h3>
              <p className="text-gray-600">Fill in your journey details and click "Check Availability" to find the perfect cab for your outstation trip.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutstationBooking;