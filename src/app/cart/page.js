'use client'
import { useEffect, useState } from 'react';
import Cart from '../components/Cart';
import { UserAuth } from "../auth/AuthContext";
import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ShoppingBasket() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        console.log('user uid is:', user.uid);
        const q = query(collection(db, "shoppingBasket"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const orderPromises = querySnapshot.docs.map(async (docSnapshot) => {
          const orderData = docSnapshot.data();
          const productRef = doc(db, "products", orderData.productId);
          const productDoc = await getDoc(productRef);
          return {product:{ id:productDoc.id, ...productDoc.data() }};
        });
        const orders = await Promise.all(orderPromises);
        setCartItems(orders.filter(order => order !== null));
      };
      fetchCartItems();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Shopping Cart</h1>
      <Cart cart={cartItems}/>
      <button className="mt-4 p-2 bg-blue-500 text-white rounded">
        Buy Now
      </button>
    </div>
  );
}
