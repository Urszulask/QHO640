'use client'
import React, { useEffect, useState } from 'react';
import { where, collection, getDocs, addDoc, query } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { UserAuth } from "./auth/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { user, isAdmin } = UserAuth();

  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data(), loading: false });
      });
      setProducts(productsArray);
    };
    getProducts();
  }, []);

  const addToCart = async (product) => {
    const index = products.findIndex((p) => p.id === product.id);
    if (index === -1) return; 
  
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].loading = true;
      return updatedProducts;
    });
  
    const querySnapshot = await getDocs(
      query(collection(db, "shoppingBasket"), where("productId", "==", product.id), where("userId", "==", user.uid))
    );
  
    if (!querySnapshot.empty) {
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index].loading = false;
        return updatedProducts;
      });
      alert("Product is already in the basket!");
      return;
    }
    const cartItem = {
      userId: user.uid,
      productId: product.id,
    };
    try {
      await addDoc(collection(db, "shoppingBasket"), cartItem);
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index].loading = false;
        return updatedProducts;
      });
      alert("Product added to cart!");
    } catch (error) {
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index].loading = false;
        return updatedProducts;
      });
      console.error("Error adding product to cart: ", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <main className="p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Welcome To My Clothing Shop!</h1>
        <p className="text-gray-600 text-center">Find everything you need in one place</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <div className="mb-4 relative">
              <img src={product.imageUrl} alt={product.name} className="w-full hover:scale-110 transition-transform duration-300" />
            </div>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">Description: {product.description}</p>
            <p className="text-gray-600 mb-4">Price: £{product.price}</p>
            <p className="text-gray-600 mb-4">Category: {product.category}</p>
            <p className="text-gray-600 mb-4">
              {product.quantity > 0 ? `Quantity: ${product.quantity}` : <span className='text-red-500 font-bold'>Out Of Stock</span>}
            </p>
            {!isAdmin && product.quantity > 0 && (
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => addToCart(product)}
                  disabled={product.loading}
                >
                  {product.loading ? "Adding..." : "Buy Now"}
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};
