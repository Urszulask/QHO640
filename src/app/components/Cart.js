export default function Cart({ cart, quantities, updateQuantity }) {

  const totalQuantity = Object.values(quantities).reduce((acc, quantity) => acc + quantity, 0);

  const totalPrice = cart.reduce((acc, item) => {
    const quantity = quantities[item.product.id] || 0;
    return acc + (item.product.price * quantity);
  }, 0);

  return (
    <div className="cart mt-4">
      <h2 className="text-xl mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, key) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg">{key + 1}.{item.product.name}</h3>
                <p className="text-gray-600">Price: £{item.product.price}</p>
                <p className="text-gray-600">Quantity: {quantities[item.product.id]}</p>
              </div>
              <div className="flex">
                <button
                  className="p-2 bg-red-500 text-white rounded mr-2"
                  onClick={() => updateQuantity(item.product.id, Math.max(1, quantities[item.product.id] - 1))}
                >
                  -
                </button>
                <button
                  className="p-2 bg-green-500 text-white rounded"
                  onClick={() => updateQuantity(item.product.id,quantities[item.product.id] + 1, item.product.quantity)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <h3 className="text-lg">Total Quantity: {totalQuantity}</h3>
            <h3 className="text-lg">Total Price: £{totalPrice.toFixed(2)}</h3>
          </div>
        </> 
      )}
    </div>
  );
}
