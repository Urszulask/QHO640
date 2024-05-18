'use client'
//import Login from './backup/login';
//import WelcomePage from './welcomePage';
import React, { useState } from 'react';

export default function Home() {

  const products = [
    {
      name: 'Clothing',
      description: 'Product description goes here.',
      images: [
        '/products/product1.jpeg',
        '/products/product2.jpeg',
        '/products/product3.jpeg',
      ],
    }
  ];

  const handlePrevImage = (index) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]: (prevState[index] - 1 + products[index].images.length) % products[index].images.length,
    }));
  };
  
  const handleNextImage = (index) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [index]: (prevState[index] + 1) % products[index].images.length,
    }));
  };
  
  const [currentImageIndex, setCurrentImageIndex] = useState(
    products.reduce((acc, product, index) => ({ ...acc, [index]: 0 }), {})
  );

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
              {product.images.map((image, imageIndex) => (
                <div key={`${index}-${imageIndex}`} className={`${imageIndex !== currentImageIndex[index] ? 'hidden' : ''}`}>
                  <img
                    src={image}
                    alt={`${product.name} ${imageIndex + 1}`}
                    className="w-full hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
              {product.images.length > 1 && (
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={() => handlePrevImage(index)}
                  >
                    &larr;
                  </button>
                </div>
              )}
              {product.images.length > 1 && (
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    onClick={() => handleNextImage(index)}
                  >
                    &rarr;
                  </button>
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Buy Now
            </button>
          </div>
        ))}

        <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
          <img src="/products/product1.jpeg" alt="Product 1" className="w-full mb-4 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-xl font-bold mb-2">Clothing</h2>
          <p className="text-gray-600 mb-4">Product description goes here.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Buy Now</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
          <img src="/products/product2.jpeg" alt="Product 2" className="w-full mb-4 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-xl font-bold mb-2">Technology</h2>
          <p className="text-gray-600 mb-4">Product description goes here.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Buy Now</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
          <img src="/products/product3.jpeg" alt="Product 3" className="w-full mb-4 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-xl font-bold mb-2">e-Books</h2>
          <p className="text-gray-600 mb-4">Product description goes here.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Buy Now</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
          <img src="/products/product3.jpeg" alt="Product 3" className="w-full mb-4 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-xl font-bold mb-2">Product 3</h2>
          <p className="text-gray-600 mb-4">Product description goes here.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Buy Now</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
          <img src="/products/product1.jpeg" alt="Product 1" className="w-full mb-4 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-xl font-bold mb-2">Product 1</h2>
          <p className="text-gray-600 mb-4">Product description goes here.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Buy Now</button>
        </div>
      </section>
    </main>
  );
};
