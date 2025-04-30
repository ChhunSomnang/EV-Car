"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../lib/store";
import { fetchProducts } from "../lib/features/productSlice";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { removeProductFromFavorite } from "../lib/features/favoriteSlice";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import {
  addProductToCompare,
  removeProductFromCompare,
} from "../lib/features/compareSlice";
import { CircularProgress } from "@mui/material";

const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const favorites = useSelector((state: RootState) => state.favorites.selectedProducts);
  const selectedProducts = useSelector(
    (state: RootState) => state.compare.selectedProducts
  );

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Filter products to show only favorited ones
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <HeartIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          No Favorite Products
        </h1>
        <p className="text-gray-600 mb-6">
          You haven't added any products to your favorites yet.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Favorite Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => {
          const imageUrl = product.imgSrc?.startsWith("http")
            ? product.imgSrc
            : `${R2_BUCKET_URL}/${product.imgSrc}`;

          const isSelected = selectedProducts.includes(product.id);

          return (
            <div
              key={product.id}
              className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {/* Favorite Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeProductFromFavorite(product.id));
                }}
                className="absolute top-4 right-16 p-2 rounded-full bg-white shadow-md text-red-500 transition-colors duration-300"
                title="Remove from Favorites"
              >
                <HeartSolid className="w-5 h-5" />
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
                src={imageUrl || "/fallback-image.png"}
                alt={product.name}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith("/fallback-image.png")) {
                    target.src = "/fallback-image.png";
                  }
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
    </div>
  );
};

export default FavoritePage;