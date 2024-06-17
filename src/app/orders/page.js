'use client'
import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserAuth } from "../auth/AuthContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    console.log('User is:',user);
    if (user) {
      const fetchOrders = async () => {
        const ordersCollection = collection(db, 'orders');
        const q = query(ordersCollection, where('userId', '==', user.uid));
        const ordersSnapshot = await getDocs(q);
        const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      };
      fetchOrders();
    }
  }, [user]);

  return (
    <OrderList orders={orders} />
  );
};

export default Order;
