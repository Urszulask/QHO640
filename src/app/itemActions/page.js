'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ItemsActions = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().name,
      }));
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  const handleEdit = () => {
    if (selectedProductId) {
      router.push(`/itemActions/${selectedProductId}/editOrder`);
    }
  };

  const handleDelete = () => {
    if (selectedProductId) {
      router.push(`/itemActions/${selectedProductId}/deleteOrder`);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Actions</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <select
          onChange={handleSelectChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        >
          <option value="" disabled selected>Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.title}</option>
          ))}
        </select>
        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            disabled={!selectedProductId}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
            disabled={!selectedProductId}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsActions;
