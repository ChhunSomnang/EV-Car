"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../lib/features/productSlice";
import { RootState, AppDispatch } from "../lib/store";
import Link from "next/link";

const ListProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("Fetched Products:", products); // Debugging log for product data
  console.log("Fetch Status:", status); // Debugging log for fetch status

  // Handle loading state
  if (status === "loading") {
    return <p className="text-center text-xl text-gray-600">Loading...</p>;
  }

  // Handle failed state
  if (status === "failed") {
    return (
      <p className="text-center text-xl text-red-600">
        {error ? `Error: ${error}` : "Error loading products."}
      </p>
    );
  }

  // Handle empty products state
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p className="text-center text-xl text-gray-600">No products available</p>
    );
  }

  // Render products when status is succeeded
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => {
        // If the image URL is a relative path, prepend the Cloudflare R2 endpoint
        const imageUrl = product.image.startsWith('http')
          ? product.image
          : `https://pub-133f8593b35749f28fa090bc33925b31.r2.dev/${product.image}`;
          
        return (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
          >
            <img
              src={imageUrl} // Ensure the image is accessible
              alt={product.title || "Product"}
              className="w-full h-48 object-cover rounded-md"
              onError={(e) => (e.target as HTMLImageElement).src = '/fallback-image.png'} // Fallback image on error
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {product.title}
            </h3>
            <p className="text-lg text-gray-600 mt-2">${product.price}</p>
            <Link href={`/product/${product.id}`}>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out">
                View
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ListProduct;
