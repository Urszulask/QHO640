'use client'
import React, { useState,useEffect } from 'react';
import OrderList from '../components/OrderList';
import OrderDetail from '../components/OrderDetail';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Order = () => {
const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    };
    fetchOrders();
  }, []);

  return(
    <OrderList orders={orders}></OrderList>
  )
};

export default Order;
