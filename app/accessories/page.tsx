"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessories, setFilter, applyFilter } from "../lib/features/accessoriesSlice";
import { RootState, AppDispatch } from "../lib/store";
import AccessoriesFilter from "../components/AccessoriesFilter";
import Image from "next/image";
import Link from "next/link";
import { Filter } from "../lib/features/accessoriesSlice";

const AccessoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessories, filteredAccessories, filter, loading, error } = useSelector(
    (state: RootState) => state.accessories
  );

  const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    if (token) {
      dispatch(fetchAccessories());
    } else {
      console.error("API token is missing");
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilter());
  }, [filter, dispatch]);

  const categories = [...new Set(accessories.map((item) => item.category))];
  const brands = [...new Set(accessories.map((item) => item.brand))];

  if (loading) {
    return <p className="text-center text-xl text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">EV Car Accessories</h1>
      <AccessoriesFilter
        categories={categories}
        brands={brands}
        filter={filter}
        setFilter={(newFilter: Filter) => dispatch(setFilter(newFilter))}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAccessories.map((item) => {
          const imageUrl = item.image.startsWith("http")
            ? item.image
            : `${R2_BUCKET_URL}/${item.image}`;

          return (
            <div key={item.id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <div className="relative h-48 mb-4">
                <Image
                  src={imageUrl}
                  alt={item.name}
                  fill
                  className="rounded-md object-cover"
                  onError={(e) => ((e.target as HTMLImageElement).src = "/fallback-image.png")}
                />
              </div>
              <h2 className="text-xl font-semibold mt-4 line-clamp-2">{item.name}</h2>
              <p className="text-gray-600">Brand: {item.brand}</p>
              <p className="text-gray-600">Price: ${item.price}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 mr-1">{item.rating}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <Link href={`/accessories/${item.id}`}>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccessoriesPage;