'use client'
import React, { useState } from "react";
import { searchProducts } from "../utils/searchProducts";
import Image from "next/image";
const Search= () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("name");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const products = await searchProducts(searchTerm, filterType);
        console.log('I am called;')
        setResults(products);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4">Search Products</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <div className="mb-2">
                    <label className="block mb-1">Filter by:</label>
                    <select 
                        value={filterType} 
                        onChange={(e) => setFilterType(e.target.value)} 
                        className="border p-2 rounded"
                    >
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block mb-1">Search Term:</label>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
            </form>
            <div>
                <h2 className="text-lg mb-2">Results</h2>
                <ul>
                    {results.map(product => (
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
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Search;
