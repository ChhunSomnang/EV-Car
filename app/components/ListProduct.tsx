"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../lib/features/productSlice";
import { RootState, AppDispatch } from "../lib/store";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { HeartIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import {
  addProductToCompare,
  removeProductFromCompare,
} from "../lib/features/compareSlice";
import {
  addProductToFavorite,
  removeProductFromFavorite,
} from "../lib/features/favoriteSlice";

const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

const ListProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);
  const selectedProducts = useSelector(
    (state: RootState) => state.compare.selectedProducts
  );
  const favorites = useSelector((state: RootState) => state.favorites.selectedProducts);

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
        const imageUrl = product.imgSrc?.startsWith("http")
          ? product.imgSrc
          : `${R2_BUCKET_URL}/${product.imgSrc}`;

        const isSelected = selectedProducts.includes(product.id);
        const isFavorite = favorites.includes(product.id);

        return (
          <div
            key={product.id}
            className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* Favorite Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isFavorite) {
                  dispatch(removeProductFromFavorite(product.id));
                } else {
                  dispatch(addProductToFavorite(product.id));
                }
              }}
              className={`absolute top-4 right-16 p-2 rounded-full bg-white shadow-md ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              } transition-colors duration-300`}
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              {isFavorite ? (
                <HeartSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
            </button>

            {/* Compare Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isSelected) {
                  dispatch(removeProductFromCompare(product.id));
                } else {
                  dispatch(addProductToCompare(product.id));
                }
              }}
              className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              } transition-colors duration-300`}
              title="Compare Product"
            >
              <ArrowsRightLeftIcon className="w-5 h-5" />
            </button>

            {/* Product Image */}
            <img
              className="w-full h-48 object-cover"
              src={imageUrl}
              alt={product.name || "Product"}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src.endsWith("/fallback-image.png")) {
                  console.error("Fallback image failed to load.");
                  return;
                }
                console.warn("Image failed to load, using fallback image.");
                target.src = "/fallback-image.png";
              }}
            />

            {/* Product Details */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>
                <p className="mt-2 text-gray-800 font-semibold">
                  Weight: {product.weight} {product.weightUnit}
                </p>
                <p className="mt-2 text-gray-600">Vendor: {product.vendor}</p>
              </div>
              <Link href={`/product/${product.id}`} className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
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