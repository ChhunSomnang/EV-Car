"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { HeartIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { RootState } from "../lib/store";
import { addProductToFavorite, removeProductFromFavorite } from "../lib/features/favoriteSlice";

interface Product {
  id: string;
  name: string;
  categoryId: string;
  imgSrc?: string;
  vendor: string;
  weight: number;
  weightUnit: string;
  condition?: string;
}

const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

const ProductCardList: React.FC<{ products: Product[] }> = ({ products }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.selectedProducts);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleCompare = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  if (products.length === 0) {
    return <p className="text-center text-gray-600">No products found.</p>;
  }

  return (
    <div className="space-y-6">
      {products.map((product) => {
        const imageUrl = product.imgSrc?.startsWith("http")
          ? product.imgSrc
          : product.imgSrc
          ? `${R2_BUCKET_URL}/${product.imgSrc}`
          : null;

        const isFavorite = favorites.includes(product.id);

        return (
          <div
            key={product.id}
            className="flex gap-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105 mb-6 relative"
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
              className={`absolute top-4 right-16 p-2 rounded-full bg-white shadow-md
                ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}
                transition-colors duration-300`}
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
                toggleCompare(product.id);
              }}
              className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md ${
                selectedProducts.includes(product.id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              } transition-colors duration-300`}
              title="Compare Product"
            >
              <ArrowsRightLeftIcon className="w-5 h-5" />
            </button>

            {/* Product Image */}
            {imageUrl ? (
              <img
                className="w-[400px] h-64 object-cover"
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
            ) : (
              <div className="w-[400px] h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}

            {/* Product Details */}
            <div className="flex flex-col justify-between p-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="mt-2 text-gray-600">{`Category ID: ${product.categoryId}`}</p>
                <p className="mt-2 text-gray-800 font-bold">
                  {`Weight: ${product.weight} ${product.weightUnit}`}
                </p>
                {product.condition && (
                  <p className="mt-2 text-gray-600">{`Condition: ${product.condition}`}</p>
                )}
              </div>

              {/* View Product Button */}
              <button
                onClick={() => router.push(`/product/${product.id}`)}
                className="mt-4 w-[150px] bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                View Product
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCardList;