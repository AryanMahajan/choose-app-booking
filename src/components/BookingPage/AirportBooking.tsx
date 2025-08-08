// Import CabType from CabList
import { useState } from 'react';
import CabList, { type CabType } from './CabList';

type AirportTripType = 'toAirport' | 'fromAirport';

interface AirportFormData {
  airportName: string;
  location: string; // pickup for from Airport, drop for toAirport
  pickupDate: string;
}

const MOCK_CABS = [
  {
    id: '1',
    type: 'sedan' as CabType,
    partnerName: 'Comfort Rides',
    rating: 4.7,
    eta: '5 mins',
    fare: 1550,
    image: 'https://via.placeholder.com/150?text=Sedan',
  },
  {
    id: '2',
    type: 'suv' as CabType,
    partnerName: 'Premium Cars',
    rating: 4.9,
    eta: '8 mins',
    fare: 2275,
    image: 'https://via.placeholder.com/150?text=SUV',
  },
  {
    id: '3',
    type: 'hatchback' as CabType,
    partnerName: 'Budget Wheels',
    rating: 4.3,
    eta: '3 mins',
    fare: 950,
    image: 'https://via.placeholder.com/150?text=Hatchback',
  },
  {
    id: '4',
    type: 'bike' as CabType,
    partnerName: 'QuickRide',
    rating: 4.6,
    eta: '2 mins',
    fare: 350,
    image: 'https://via.placeholder.com/150?text=Bike',
  },
  {
    id: '5',
    type: 'taxi' as CabType,
    partnerName: 'City Cabs',
    rating: 4.4,
    eta: '4 mins',
    fare: 1200,
    image: 'https://via.placeholder.com/150?text=Taxi',
  },
  {
    id: '6',
    type: 'hatchback' as CabType,
    partnerName: 'Economy Ride',
    rating: 4.1,
    eta: '6 mins',
    fare: 875,
    image: 'https://via.placeholder.com/150?text=Hatchback',
  },
  {
    id: '7',
    type: 'sedan' as CabType,
    partnerName: 'Lux Rides',
    rating: 4.8,
    eta: '7 mins',
    fare: 1625,
    image: 'https://via.placeholder.com/150?text=Sedan',
  },
  {
    id: '8',
    type: 'suv' as CabType,
    partnerName: 'RideMax',
    rating: 4.5,
    eta: '9 mins',
    fare: 2400,
    image: 'https://via.placeholder.com/150?text=SUV',
  },
  {
    id: '9',
    type: 'bike' as CabType,
    partnerName: 'Speedy Wheels',
    rating: 4.2,
    eta: '1 min',
    fare: 325,
    image: 'https://via.placeholder.com/150?text=Bike',
  },
  {
    id: '10',
    type: 'taxi' as CabType,
    partnerName: 'Metro Cabs',
    rating: 4.6,
    eta: '5 mins',
    fare: 1100,
    image: 'https://via.placeholder.com/150?text=Taxi',
  }
];


const AirportBooking: React.FC = () => {
  const [tripType, setTripType] = useState<AirportTripType>('toAirport');
  const [formData, setFormData] = useState<AirportFormData>({
    airportName: '',
    location: '',
    pickupDate: '',
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

    if (name === 'pickupDate') {
      setDateError('');
    }
  };

  const validateDate = (): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pickupDate = new Date(formData.pickupDate);

    if (pickupDate < today) {
      setDateError('Pickup date cannot be in the past');
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
          {/* Trip Type Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-50 p-1 rounded-full">
              <button
                className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${tripType === 'toAirport'
                  ? 'bg-yellow-400 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                  }`}
                onClick={() => setTripType('toAirport')}
              >
                To Airport
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${tripType === 'fromAirport'
                  ? 'bg-yellow-400 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                  }`}
                onClick={() => setTripType('fromAirport')}
              >
                From Airport
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book Airport Cab</h2>

          {dateError && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl shadow-sm">
              {dateError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="airportName" className="block text-gray-700 mb-2 font-medium">Airport Name</label>
              <input
                type="text"
                id="airportName"
                name="airportName"
                value={formData.airportName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
                placeholder="Enter airport name"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-gray-700 mb-2 font-medium">
                {tripType === 'toAirport' ? 'Pickup Location' : 'Drop Location'}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
                placeholder={tripType === 'toAirport' ? 'Enter pickup location' : 'Enter drop location'}
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
            <h3 className="font-bold text-yellow-800 mb-4 text-lg">Booking Details</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-semibold text-gray-800">Airport:</span> {formData.airportName}</p>
              <p>
                <span className="font-semibold text-gray-800">{tripType === 'toAirport' ? 'From' : 'To'}:</span> {formData.location}
              </p>
              <p>
                <span className="font-semibold text-gray-800">{tripType === 'toAirport' ? 'To' : 'From'}:</span> {formData.airportName}
              </p>
              <p><span className="font-semibold text-gray-800">When:</span> {new Date(formData.pickupDate).toLocaleString()}</p>
            </div>
          </div>
        )}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-700">Ready to Search</h3>
              <p className="text-gray-600">Fill in your airport transfer details and click "Check Availability" to find available cabs.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportBooking;