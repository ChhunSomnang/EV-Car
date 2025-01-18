"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AccessoriesFilter from "../components/AccessoriesFilter";

type Accessory = {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  rating: number;
  features: string[];
  image: string;
};

const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [filteredAccessories, setFilteredAccessories] = useState<Accessory[]>([]);
  const [filter, setFilter] = useState({
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: Infinity,
  });

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch("/accessories.json");
        const data = await response.json();
        setAccessories(data);
        setFilteredAccessories(data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchAccessories();
  }, []);

  useEffect(() => {
    const applyFilter = () => {
      const { category, brand, minPrice, maxPrice } = filter;
      const filtered = accessories.filter((item) => {
        const isCategoryMatch = category ? item.category === category : true;
        const isBrandMatch = brand ? item.brand === brand : true;
        const isPriceMatch = item.price >= minPrice && item.price <= maxPrice;
        return isCategoryMatch && isBrandMatch && isPriceMatch;
      });
      setFilteredAccessories(filtered);
    };

    applyFilter();
  }, [filter, accessories]);

  const categories = [...new Set(accessories.map((item) => item.category))];
  const brands = [...new Set(accessories.map((item) => item.brand))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">EV Car Accessories</h1>
      <AccessoriesFilter
        categories={categories}
        brands={brands}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAccessories.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={150}
              className="rounded-md mx-auto"
            />
            <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
            <p className="text-gray-600">Brand: {item.brand}</p>
            <p className="text-gray-600">Price: ${item.price}</p>
            <p className="text-yellow-500">Rating: {item.rating} ★</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesPage;