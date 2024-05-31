'use client'
//import Login from './backup/login';
//import WelcomePage from './welcomePage';
import React, { useEffect,useState } from 'react';
import { collection, getDocs,addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { UserAuth } from "./auth/AuthContext";
export default function Home() {

  const [products,setProducts]=useState([]);
  const { user, logOut } = UserAuth();


  useEffect(()=>{
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        productsArray.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsArray);
    
    };
    getProducts();
    console.log('Products are:',products)
  },[])
  const addToCart = async (product) => {
    const cartItem = {
      userId:user.uid,
      productId: product.id,
    };
    try {
      await addDoc(collection(db, "shoppingBasket"), cartItem);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <main className="p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Welcome to MyStore</h1>
        <p className="text-gray-600 text-center">Find everything you need in one place</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {products.map((product, index) => (
        
          <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <div className="mb-4 relative">
                <div>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full hover:scale-110 transition-transform duration-300"
                  />
                </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">Description:{product.description}</p>
            <p className="text-gray-600 mb-4">Description:{product.id}</p>
            <p className="text-gray-600 mb-4">Price :€{product.price}</p>
            <p className="text-gray-600 mb-4">{product.quantity > 0 ? `Quantity: ${product.quantity}` :<span className='text-red-500 font-bold'>Out Of Stock</span> }</p>
          {product.quantity>0&&(
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300" onClick={()=>addToCart(product)}>
              Buy Now
            </button>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};
