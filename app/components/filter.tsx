"use client";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import {
  setVendors,
  setCategories,
  setMinPrice,
  setMaxPrice,
  resetFilters,
  applyFilters,
} from "../lib/features/productSlice";

interface FilterProps {
  defaultVendor?: string; // Updated to match the new JSON structure
}

const Filter: React.FC<FilterProps> = ({ defaultVendor }) => {
  const dispatch = useDispatch();
  const { items, selectedVendors, selectedCategories, minPrice, maxPrice } =
    useSelector((state: RootState) => state.products);

  // Extract unique vendors and categories from the product data
  const vendors = useMemo(
    () => Array.from(new Set(items.map((item) => item.vendor))),
    [items]
  );
  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.categoryId))),
    [items]
  );

  // Pre-select the default vendor if provided
  React.useEffect(() => {
    if (defaultVendor && !selectedVendors.includes(defaultVendor)) {
      dispatch(setVendors([defaultVendor]));
      dispatch(applyFilters());
    }
  }, [defaultVendor, dispatch, selectedVendors]);

  return (
    <div className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-md w-1/4">
      <h2 className="text-lg font-bold mb-6 text-center">Filter</h2>

      {/* Min Price */}
      <div className="mb-4">
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Min Weight (kg)
        </label>
        <input
          type="number"
          value={minPrice || ""}
          onChange={(e) => {
            dispatch(
              setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)
            );
            dispatch(applyFilters()); // Apply filters after changing price
          }}
          className="w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Min Weight"
        />
      </div>

      {/* Max Price */}
      <div className="mb-4">
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Max Weight (kg)
        </label>
        <input
          type="number"
          value={maxPrice || ""}
          onChange={(e) => {
            dispatch(
              setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)
            );
            dispatch(applyFilters()); // Apply filters after changing price
          }}
          className="w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Max Weight"
        />
      </div>

      {/* Vendor Filter */}
      <div className="mb-6 text-xl">
        <h3 className="text-md font-semibold mb-2">Vendor</h3>
        {vendors.map((vendor) => (
          <label key={vendor} className="flex items-center mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={selectedVendors.includes(vendor)}
              onChange={() => {
                const newVendors = selectedVendors.includes(vendor)
                  ? selectedVendors.filter((v) => v !== vendor)
                  : [...selectedVendors, vendor];

                dispatch(setVendors(newVendors));
                dispatch(applyFilters()); // Apply filters after changing vendor
              }}
              className="mr-2"
            />
            {vendor}
          </label>
        ))}
      </div>

      {/* Category Filter */}
      <div className="mb-6 text-xl">
        <h3 className="text-md font-semibold mb-2">Category</h3>
        {categories.map((category) => (
          <label key={category} className="flex items-center mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => {
                const newCategories = selectedCategories.includes(category)
                  ? selectedCategories.filter((c) => c !== category)
                  : [...selectedCategories, category];

                dispatch(setCategories(newCategories));
                dispatch(applyFilters()); // Apply filters after changing category
              }}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() => {
          dispatch(resetFilters()); // Reset all filters
          dispatch(applyFilters()); // Apply filters after reset
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;