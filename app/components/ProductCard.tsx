import React from 'react';
import Link from 'next/link';

interface Item {
  id: number;
  model: string;
  category: string;
  modelImage?: string; // Optional image
  brand: string;
  price: number;
  condition: string;
  rating?: number; // Optional rating
  location?: string; // Optional location field
  isExclusive?: boolean; // Optional exclusive flag
}

const ProductCard: React.FC<{ product: Item }> = ({ product }) => {
  const placeholderImage = "https://via.placeholder.com/150"; // Fallback image

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Exclusive Badge */}
      {product.isExclusive && (
        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
          EXCLUSIVE
        </div>
      )}

      {/* Image Section */}
      <img
        className="w-full h-48 object-cover"
        src={product.modelImage || placeholderImage} // Use modelImage or fallback
        alt={product.model || "Product image"} // Fallback alt text
      />

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.model}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <p className="text-sm text-gray-500">{product.location}</p>
        <p className="text-blue-600 font-bold mt-2">
          From ${product.price.toLocaleString()}
        </p>

        {/* Link Button */}
        <Link
          href={`/product/${product.id}`}
          className="mt-4 inline-block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
