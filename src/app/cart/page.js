'use client'
import { useEffect, useState } from 'react';
import Cart from '../components/Cart';
import { UserAuth } from "../auth/AuthContext";
import { collection, getDocs, getDoc, doc, query, where, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ShoppingBasket() {
  const [cartItems, setCartItems] = useState([]);
  const { user,refreshBalance } = UserAuth();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const q = query(collection(db, "shoppingBasket"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const orderPromises = querySnapshot.docs.map(async (docSnapshot) => {
          const orderData = docSnapshot.data();
          const productRef = doc(db, "products", orderData.productId);
          const productDoc = await getDoc(productRef);
          return { id: docSnapshot.id, product: { id: productDoc.id, ...productDoc.data() }};
        });
        const orders = await Promise.all(orderPromises);
        setCartItems(orders);
        const initialQuantities = {};
        orders.forEach(order => {
          initialQuantities[order.product.id] = 1;
        });
        setQuantities(initialQuantities);
      };
      fetchCartItems();
    }
  }, [user]);

  const updateQuantity = (productId, newQuantity, maxQuantity) => {
    if (newQuantity > maxQuantity) {
      alert("You cannot add more than the available stock.");
      return;
    }
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity
    }));
  };

  const handleBuyNow = async () => {
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const orderItems = cartItems.map(item => ({
      productId: item.product.id,
      quantity: quantities[item.product.id],
      price: item.product.price,
    }));

    const totalQuantity = Object.values(quantities).reduce((acc, quantity) => acc + quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.product.price * quantities[item.product.id]), 0);

    const orderData = {
      userId: user.uid,
      items: orderItems,
      totalQuantity,
      totalPrice,
      createdAt: new Date(),
    };

    try {
      const usersQuery = query(collection(db, "users"), where("userId", "==", user.uid));
      const usersSnapshot = await getDocs(usersQuery);

      const userDoc = usersSnapshot.docs[0];
      const userData = userDoc.data();
      const currentBalance = userData.balance;

      if (totalPrice > currentBalance) {
        alert("Insufficient balance to complete the purchase.");
        return;
      }

      await addDoc(collection(db, "orders"), orderData);

      const updateProductPromises = cartItems.map(async (item) => {
        const productRef = doc(db, "products", item.product.id);
        const productDoc = await getDoc(productRef);
        const currentQuantity = productDoc.data().quantity;
        const newQuantity = currentQuantity - quantities[item.product.id];
        await updateDoc(productRef, { quantity: newQuantity });
      });

      await Promise.all(updateProductPromises);

      const removeBasketPromises = cartItems.map(async (item) => {
        const basketItemRef = doc(db, "shoppingBasket", item.id);
        await deleteDoc(basketItemRef);
      });

      await Promise.all(removeBasketPromises);

      const newBalance = currentBalance - totalPrice;
      await updateDoc(userDoc.ref, { balance: newBalance });
      await refreshBalance(user.uid);
      alert("Order placed successfully!");
    
      setCartItems([]);
      setQuantities({});
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 flex justify-center font-medium text-red-500">Shopping Cart</h1>
      <Cart cart={cartItems} quantities={quantities} updateQuantity={updateQuantity} />
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleBuyNow}
      >
        Buy Now
      </button>
    </div>
  );
}
