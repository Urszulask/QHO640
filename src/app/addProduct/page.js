'use client'
import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [quantity,setQuantity]=useState('');
  const [category,setCategory]=useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !image || !quantity) {
      alert('Please fill out all fields and select an image');
      return;
    }

    try {
      const storageRef = ref(storage, `products/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download url is:',downloadURL);

      await addDoc(collection(db, "products"), {
        name,
        description,
        category,
        price: parseFloat(price),
        imageUrl: downloadURL,
        quantity:quantity,
        createdAt: new Date(),
      });

  
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      alert('Product added successfully!');
    } catch (error) {
      console.error("Error adding product: ", error);
      alert('Error adding product');
    }
  };

  return (
    <><h1 className='text-center font-bold text-3xl mt-4 text-gray-800'> 
      Add Products
    </h1><form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid black' }} />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', minHeight: '100px', border: '1px solid black' }} />
           <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid black' }} />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid black' }} />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid black' }} />
        <input
          type="file"
          onChange={handleImageChange}
          style={{ padding: '10px', fontSize: '16px' }} />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
          Add Product
        </button>
      </form></>
  );
};

export default AddProduct;
