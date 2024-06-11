'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import OrderDetail from '@/app/components/OrderDetail';
import { usePathname } from 'next/navigation';
const OrderDetailPage = () => {
  

  const pathname = usePathname();
  const id  = pathname.split('/')[2];
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        const orderDoc = doc(db, 'orders', id);
        const orderSnapshot = await getDoc(orderDoc);
        console.log('Snapshot Order:',orderSnapshot);
        if (orderSnapshot.exists()) {
          setOrder({ id: orderSnapshot.id, ...orderSnapshot.data() });
        }
      };
      fetchOrder();
    }
  }, [id]);
  return(
    <OrderDetail order={order}></OrderDetail>
  )
}
export default OrderDetailPage;