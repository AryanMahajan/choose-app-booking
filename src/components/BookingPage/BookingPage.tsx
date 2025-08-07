import { useState } from 'react';
import BookingForm, { type BookingFormData } from './BookingForm';
import CabList from './CabList';

const MOCK_CABS = [
  {
    id: '1',
    type: 'sedan',
    partnerName: 'Comfort Rides',
    rating: 4.7,
    eta: '5 mins',
    fare: 15.50,
    image: 'https://via.placeholder.com/150?text=Sedan',
  },
  {
    id: '2',
    type: 'suv',
    partnerName: 'Premium Cars',
    rating: 4.9,
    eta: '8 mins',
    fare: 22.75,
    image: 'https://via.placeholder.com/150?text=SUV',
  },
  {
    id: '3',
    type: 'hatchback',
    partnerName: 'City Movers',
    rating: 4.5,
    eta: '3 mins',
    fare: 12.25,
    image: 'https://via.placeholder.com/150?text=Hatchback',
  },
  {
    id: '4',
    type: 'bike',
    partnerName: 'Quick Delivery',
    rating: 4.3,
    eta: '2 mins',
    fare: 8.50,
    image: 'https://via.placeholder.com/150?text=Bike',
  },
  {
    id: '5',
    type: 'taxi',
    partnerName: 'Yellow Cab Co.',
    rating: 4.2,
    eta: '4 mins',
    fare: 14.00,
    image: 'https://via.placeholder.com/150?text=Taxi',
  },
  {
    id: '6',
    type: 'sedan',
    partnerName: 'Executive Cars',
    rating: 4.8,
    eta: '7 mins',
    fare: 18.25,
    image: 'https://via.placeholder.com/150?text=Sedan',
  },
  {
    id: '7',
    type: 'suv',
    partnerName: 'Family Rides',
    rating: 4.6,
    eta: '10 mins',
    fare: 20.50,
    image: 'https://via.placeholder.com/150?text=SUV',
  },
];

const BookingPage: React.FC = () => {
  const [showCabs, setShowCabs] = useState(false);
  const [availableCabs, setAvailableCabs] = useState(MOCK_CABS);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const handleCheckAvailability = (formData: BookingFormData) => {
    setBookingData(formData);
    setShowCabs(true);
    
    setAvailableCabs(MOCK_CABS);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Left side - 40% width */}
          <div className="w-full lg:w-2/5 max-w-md">
            <BookingForm onCheckAvailability={handleCheckAvailability} />
            
            {/* booking details after form submission */}
            {showCabs && bookingData && (
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-white p-6 rounded-3xl shadow-lg backdrop-blur-sm">
                <h3 className="font-bold text-yellow-800 mb-4 text-lg">📋 Booking Details</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><span className="font-semibold text-gray-800">From:</span> {bookingData.pickupLocation}</p>
                  <p><span className="font-semibold text-gray-800">To:</span> {bookingData.dropLocation}</p>
                  <p><span className="font-semibold text-gray-800">When:</span> {new Date(bookingData.pickupTime).toLocaleString()}</p>
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
                  <p className="text-gray-600">Fill in the booking form and click "Check Availability" to see available cabs.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;