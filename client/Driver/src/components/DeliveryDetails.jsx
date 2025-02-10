import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryDetails = () => {
  const navigate = useNavigate();
  const [delivery] = useState({
    pickup: {
      address: '7010 W Cermak Rd',
      itemId: '4512',
      quantity: 1,
      weight: '8 lbs',
      time: '02/22/23, 12:00 PM'
    },
    delivery: {
      time: '02/22/23, 10:30 AM',
      notes: 'Please call the customer before delivery.'
    }
  });

  const handleStartPickup = () => {
    navigate('/route-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-900 w-full max-w-md mx-auto p-4">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6">Delivery Details</h1>

        {/* Pickup Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Pickup</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Address:</span>
              <span>{delivery.pickup.address}</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Item ID:</span>
              <span>{delivery.pickup.itemId}</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Quantity:</span>
              <span>{delivery.pickup.quantity}</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Weight:</span>
              <span>{delivery.pickup.weight}</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Pickup by:</span>
              <span>{delivery.pickup.time}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Delivery</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Deliver by:</span>
              <span>{delivery.delivery.time}</span>
            </div>
            <div className="text-white">
              <span className="text-gray-400 block mb-2">Notes:</span>
              <p className="bg-gray-700/50 p-3 rounded-lg text-sm">
                {delivery.delivery.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartPickup}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Start Pickup
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetails; 