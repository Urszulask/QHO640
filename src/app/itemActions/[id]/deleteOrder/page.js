'use client'
import React, { useEffect, useState } from 'react';
import { useParams,useRouter } from 'next/navigation';
import { doc, deleteDoc } from "firebase/firestore";
import Image from 'next/image';
import getProductsById from '@/app/utils/getProducts';
import { db } from "../../../firebaseConfig";

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
      data.then((value) => setProduct(value));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Delete Product: {id}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-lg font-semibold mb-4">Product Details</h2>
        <p className="mb-2"><span className="font-semibold">Name:</span> {product.name}</p>
        <p className="mb-2"><span className="font-semibold">Description:</span> {product.description}</p>
        <div className="mb-2">
          <span className="font-semibold">Image:</span>
          <Image src={product.imageUrl} alt="product" width={400} height={400} className="rounded-md"/>
        </div>
        <p className="mb-2"><span className="font-semibold">Quantity:</span> {product.quantity}</p>
        <p className="mb-2"><span className="font-semibold">Price:</span> {product.price}</p>
      </div>
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
