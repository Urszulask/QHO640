import React from 'react';
import { useRouter } from 'next/navigation';

const OrderList = ({ orders }) => {
  const router = useRouter();

  const handleViewDetails = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 font-medium text-center text-red-500">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 shadow-md">
            <p className="text-lg font-semibold mb-2">Order ID: {order.id}</p>
            <p className="text-gray-700">Total Price: ${order.totalPrice.toFixed(2)}</p>
            <p className="text-gray-700">Total Quantity: {order.totalQuantity}</p>
            <button
              className="block mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleViewDetails(order.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
