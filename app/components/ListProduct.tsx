"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../lib/features/productSlice";
import { RootState, AppDispatch } from "../lib/store";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

const ListProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center mt-4 text-red-600 text-xl">
        {error ? `Error: ${error}` : "Error loading products."}
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center mt-4 text-gray-600 text-xl">
        No products available
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => {
        const imageUrl = product.image.startsWith("http")
          ? product.image
          : `${R2_BUCKET_URL}/${product.image}`;

        return (
          <div key={product.id} className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={product.title || "Product"} onError={(e) => (e.currentTarget.src = "/fallback-image.png")} />

            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <div className="mt-2">
                  <p className="text-gray-800 font-semibold">${product.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-2 text-gray-600">
                <p className="text-sm">Brand: {product.brand}</p>
              </div>

              <Link href={`/product/${product.id}`}>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300">
                  View Product
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListProduct;
