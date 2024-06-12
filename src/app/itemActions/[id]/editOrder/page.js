'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { db,storage } from "../../../firebaseConfig";
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import getProductsById from '@/app/utils/getProducts';
const EditOrderPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
   

    if (id) {
      const data=getProductsById(id);
      data.then((value)=>setProduct(value));
    }
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.name === 'price' || e.target.name==='quantity' ? parseFloat(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };
  
  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    const storageRef = ref(storage, `products/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    setFormData({
      ...formData,
      imageUrl: downloadURL 
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, formData);
     alert("Product updated successfully:", formData);
    } catch (error) {
        alert("Error updating product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product: {id}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Product Details</h2>
        <p className="mb-2"><span className="font-semibold">Name:</span> {product.name}</p>
        <p className="mb-2"><span className="font-semibold">Description:</span> {product.description}</p>
        <div className="mb-2">
    <span className="font-semibold">Image:</span> 
        <Image src={product.imageUrl} alt="product" width={400} height={400} />
     </div>
        <p className="mb-2"><span className="font-semibold">Quantity:</span> {product.quantity}</p>
        <p className="mb-2"><span className="font-semibold">Price:</span> {product.price}</p>

      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-1">New Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-1">New Description:</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold mb-1">New Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-semibold mb-1">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-semibold mb-1">New Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default EditOrderPage;
