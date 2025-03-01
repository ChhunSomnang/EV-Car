"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Item interface
interface Item {
  id: number;
  model: string;
  category: string;
  image?: string;
  brand: string;
  price: number;
  condition: string;
  rating?: number;
}

// R2 Bucket URL
const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

const ProductCardList: React.FC<{ products: Item[] }> = ({ products }) => {
  const router = useRouter();

  if (products.length === 0) {
    return <p className="text-center text-gray-600">No products found.</p>;
  }

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex gap-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105 mb-6"
        >
          {product.image ? (
            <img
              className="w-[400px] h-64 object-cover"
              src={`${R2_BUCKET_URL}/${product.image}`}
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
            <button
              onClick={() => router.push(`/product/${product.id}`)}
              className="mt-4 w-[150px] bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              View Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardList;
