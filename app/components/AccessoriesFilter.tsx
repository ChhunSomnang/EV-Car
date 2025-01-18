// AccessoriesFilter.tsx
"use client";

import React from "react";

type FilterProps = {
  categories: string[];
  brands: string[];
  filter: {
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      category: string;
      brand: string;
      minPrice: number;
      maxPrice: number;
    }>
  >;
};

const AccessoriesFilter: React.FC<FilterProps> = ({
  categories,
  brands,
  filter,
  setFilter,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: name.includes("Price") ? Number(value) : value,
    }));
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Filter Accessories</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            value={filter.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Brand</label>
          <select
            name="brand"
            value={filter.brand}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="minPrice"
              value={filter.minPrice}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              name="maxPrice"
              value={filter.maxPrice}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-1/2 p-2 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesFilter;