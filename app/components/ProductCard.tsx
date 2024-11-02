import React from 'react';
import Link from 'next/link';

interface Item {
  id: number;
  model: string;
  category: string;
  modelImage?: string; // make this optional
  brand: string;
  price: number;
  condition: string;
  rating?: number;
}

const ProductCard: React.FC<{ product: Item }> = ({ product }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105">
      <img
        className="w-full h-48 object-cover"
        src={product.modelImage} // Use modelImage from the item
        alt={product.model}
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.model}</h3>
          <p className="mt-2 text-gray-600">${product.price}</p>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(product.rating || 0)].map((_, index) => ( // Fallback to 0 if rating is undefined
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
        <Link href={`/product/${product.id}`} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-center">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
