"use client";
import React, { useState, useEffect } from "react";
import data from '../assets/alldata.json';
import ProductCard from "../components/ProductCard";
import Filter from "../components/filter";

interface Item {
  id: number;
  model: string;
  category: string;
  modelImage?: string;
  brand: string;
  price: number;
  condition: string;
  rating?: number;
}

const Page = () => {
  const [filteredItems, setFilteredItems] = useState<Item[]>(data.allcars); // Initialize with all items

  // Optional: you could update the URL based on filtered items
  useEffect(() => {
    // Example: you can store filter state in local storage or URL
  }, [filteredItems]);

  return (
    <div className="flex">
      <Filter items={data.allcars} setFilteredItems={setFilteredItems} />
      <main className="w-full md:w-3/4 p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Electric Cars Gallery</h1>
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-600">No products found.</p>
          ) : (
            filteredItems.map(item => <ProductCard key={item.id} product={item} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
