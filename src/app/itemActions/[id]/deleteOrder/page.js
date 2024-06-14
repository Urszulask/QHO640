'use client'
import React, { useEffect, useState } from 'react';
import { useParams,useRouter } from 'next/navigation';
import { doc, deleteDoc } from "firebase/firestore";
import Image from 'next/image';
import getProductsById from '@/app/utils/getProducts';
import { db } from "../../../firebaseConfig";
import ProductCard from '@/app/components/ProductCard';

const DeleteItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const router=useRouter();

  const handleDelete = async () => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      alert('Product Deleted!');
      router.push('/itemActions')
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to Delete");
    }
  };

  useEffect(() => {
    if (id) {
      const data = getProductsById(id);
      data.then((value) => setProduct([value]));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Delete Product: {id}</h1>
        <ProductCard products={product}></ProductCard>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
      >
        Confirm Delete
      </button>
    </div>
  );
};

export default DeleteItem;
