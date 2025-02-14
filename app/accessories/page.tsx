"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessories, setFilter, applyFilter } from "../lib/features/accessoriesSlice";
import { RootState, AppDispatch } from "../lib/store";
import AccessoriesFilter from "../components/AccessoriesFilter";
import Image from "next/image";
import { Filter } from "../lib/features/accessoriesSlice"; // Import Filter type

const AccessoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessories, filteredAccessories, filter, loading, error } = useSelector(
    (state: RootState) => state.accessories
  );

  const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev"; // Replace with your actual R2 URL

  // Fetch the accessories data from the API
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_API_TOKEN; // Ensure you have this in your .env file
    if (token) {
      dispatch(fetchAccessories(token));
    } else {
      console.error("API token is missing");
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilter());
  }, [filter, dispatch]);

  const categories = [...new Set(accessories.map((item) => item.category))];
  const brands = [...new Set(accessories.map((item) => item.brand))];

  // Handle loading and error states
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
        setFilter={(newFilter: Filter) => dispatch(setFilter(newFilter))} // Dispatch setFilter to update Redux store
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAccessories.map((item) => {
          const imageUrl = item.image.startsWith("http")
            ? item.image
            : `${R2_BUCKET_URL}/${item.image}`;

          return (
            <div key={item.id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <Image
                src={imageUrl}
                alt={item.name}
                width={200}
                height={150}
                className="rounded-md mx-auto"
                onError={(e) => ((e.target as HTMLImageElement).src = "/fallback-image.png")} // Fallback image on error
              />
              <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
              <p className="text-gray-600">Brand: {item.brand}</p>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-yellow-500">Rating: {item.rating} ★</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccessoriesPage;
