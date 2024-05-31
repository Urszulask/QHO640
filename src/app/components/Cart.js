export default function Cart({ cart }) {
  console.log('cart is:',cart);
    return (
      <div className="cart mt-4">
        <h2 className="text-xl mb-2">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item,key) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
         
                <h3 className="text-lg">{key+1}.{item.product.name}</h3>
                <p className="text-gray-600">Price: ${item.product.price}</p>
                <p className="text-gray-600">Quantity: {item.product.quantity}</p>
              </div>
              <div className="flex">
                <button
                  className="p-2 bg-red-500 text-white rounded mr-2"
                >
                  -
                </button>
                <button
                  className="p-2 bg-green-500 text-white rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
  