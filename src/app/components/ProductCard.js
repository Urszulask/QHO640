import React from "react";
import Image from "next/image";
const ProductCard= ({products}) => {
    return (
            <div>
                {products.map(product => (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                    <h2 className="text-lg font-semibold mb-4">Product Details</h2>
                    <p className="mb-2"><span className="font-semibold">Name:</span> {product.name}</p>
                    <p className="mb-2"><span className="font-semibold">Description:</span> {product.description}</p>
                    <p className="mb-2"><span className="font-semibold">Category:</span> {product.category}</p>
                    <div className="mb-2">
                        <span className="font-semibold">Image:</span>
                        <Image src={product.imageUrl} alt="product" width={400} height={400} className="rounded-md"/>
                    </div>
                    <p className="mb-2"><span className="font-semibold">Quantity:</span> {product.quantity}</p>
                    <p className="mb-2"><span className="font-semibold">Price:</span> {product.price}</p>
                    </div>
                ))}
            </div>
    );
};

export default ProductCard;
