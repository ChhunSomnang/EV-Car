import React from "react";
import { Filter } from "../lib/features/accessoriesSlice"; // Import the Filter type

interface FilterProps {
  categories: string[];
  brands: string[];
  filter: Filter;
  setFilter: (newFilter: Filter) => void; // Expecting a function that takes Filter
}

const AccessoriesFilter: React.FC<FilterProps> = ({
  categories,
  brands,
  filter,
  setFilter,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      category: e.target.value,
    });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      brand: e.target.value,
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      minPrice: Number(e.target.value),
    });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      maxPrice: Number(e.target.value),
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      search: e.target.value,
    });
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Filter</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="p-2 border rounded w-full md:w-2/3 lg:w-1/2"
          value={filter.search}
          onChange={handleSearchChange}
          placeholder="Search accessories..."
        />
        <div className="flex flex-col md:flex-row gap-4">
        <select
          className="p-2 border rounded w-full md:w-1/4"
          value={filter.category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded w-full md:w-1/4"
          value={filter.brand}
          onChange={handleBrandChange}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="p-2 border rounded w-full md:w-1/4"
          value={filter.minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min Price"
        />
        <input
          type="number"
          className="p-2 border rounded w-full md:w-1/4"
          value={filter.maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max Price"
        />
        </div>
      </div>
    </div>
  );
};

export default AccessoriesFilter;
