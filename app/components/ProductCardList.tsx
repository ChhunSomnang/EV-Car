// ProductCardList.tsx
"use client";
import React from 'react';
import { useRouter } from "next/navigation";

interface Item {
  id: number;
  model: string;
  category: string;
  modelImage?: string; // Optional
  brand: string;
  price: number;
  condition: string;
  rating?: number; // Optional
}

interface ProductCardProps {
  product: Item;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="flex gap-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105 mb-6">
      {product.modelImage ? (
        <img
          className="w-[400px] h-64 object-cover"
          src={product.modelImage}
          alt={product.model}
        />
      ) : (
        <div className="w-[400px] h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <div className="flex flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.model}</h3>
          <p className="mt-2 text-gray-600">{product.category}</p>
          <p className="mt-2 text-gray-800 font-bold">{`Price: $${product.price.toFixed(2)}`}</p>
          <p className="mt-2 text-gray-600">{`Condition: ${product.condition}`}</p>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(product.rating || 0)].map((_, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927a1 1 0 011.902 0l1.398 3.732a1 1 0 00.9.664l3.646.308a1 1 0 01.591 1.77l-2.77 2.14a1 1 0 00-.322 1.02l1.017 3.774a1 1 0 01-1.516 1.096l-3.171-2.1a1 1 0 00-1.112 0l-3.171 2.1a1 1 0 01-1.516-1.096l1.017-3.774a1 1 0 00-.322-1.02l-2.77-2.14a1 1 0 01.591-1.77l3.646-.308a1 1 0 00.9-.664l1.398-3.732z" />
            </svg>
          ))}
        </div>
        <button
          onClick={handleViewProduct}
          className="mt-4 w-[150px] bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

const ProductCardList: React.FC<{ products: Item[] }> = ({ products }) => {
  return (
    <div className="space-y-6">
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductCardList;
