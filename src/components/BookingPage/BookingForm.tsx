import { useState } from 'react';

interface BookingFormProps {
  onCheckAvailability: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  pickupLocation: string;
  dropLocation: string;
  pickupTime: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ onCheckAvailability }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: '',
    dropLocation: '',
    pickupTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability(formData);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book Your Ride</h2>
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
          <label htmlFor="pickupTime" className="block text-gray-700 mb-2 font-medium">Pickup Time</label>
          <input
            type="datetime-local"
            id="pickupTime"
            name="pickupTime"
            value={formData.pickupTime}
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
  );
};

export default BookingForm;