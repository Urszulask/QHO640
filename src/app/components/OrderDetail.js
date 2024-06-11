import React from 'react';

const OrderDetail = ({ order }) => {
    console.log('Order Detail order is:',order)
    if (!order) {
        return <div>Loading...</div>;
      }
    
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Order Details</h1>
          <div className="mb-4">
            <p className="text-xl font-semibold">Order ID: {order.id}</p>
            <p>User ID: {order.userId}</p>
            <p>Total Price: {order.totalPrice}</p>
            <p>Total Quantity: {order.totalQuantity}</p>
          </div>
          <h2 className="text-2xl font-bold mb-2">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.items.map((product, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
                <img src={product.productImage} alt={`Product ${product.productId}`} className="mb-2" />
                <p className="text-xl font-semibold">Product ID: {product.productId}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      );
};

export default OrderDetail;
