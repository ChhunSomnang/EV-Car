"use client";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { setBrands, setConditions, setMinPrice, setMaxPrice, resetFilters, applyFilters } from "../lib/features/productSlice";

interface FilterProps {
  defaultBrand: string;
}

const Filter: React.FC<FilterProps> = ({ defaultBrand }) => {
  const dispatch = useDispatch();
  const { items, selectedBrands, selectedConditions, minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );

  const brands = useMemo(() => Array.from(new Set(items.map(item => item.brand))), [items]);
  const conditions = useMemo(() => Array.from(new Set(items.map(item => item.condition))), [items]);

  return (
    <div className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-md w-1/4">
      <h2 className="text-lg font-bold mb-6 text-center">Filter</h2>

      <div className="mb-4">
        <label className="block text-md font-semibold text-gray-700 mb-2">Min Price</label>
        <input
          type="number"
          value={minPrice || ""}
          onChange={(e) => {
            dispatch(setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined));
            dispatch(applyFilters()); // Apply filters after changing price
          }}
          className="w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Min Price"
        />
      </div>

      <div className="mb-4">
        <label className="block text-md font-semibold text-gray-700 mb-2">Max Price</label>
        <input
          type="number"
          value={maxPrice || ""}
          onChange={(e) => {
            dispatch(setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined));
            dispatch(applyFilters()); // Apply filters after changing price
          }}
          className="w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Max Price"
        />
      </div>

      <div className="mb-6 text-xl">
        <h3 className="text-md font-semibold mb-2">Condition</h3>
        {conditions.map(condition => (
          <label key={condition} className="flex items-center mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={selectedConditions.includes(condition)}
              onChange={() => {
                const newConditions = selectedConditions.includes(condition)
                  ? selectedConditions.filter(c => c !== condition)
                  : [...selectedConditions, condition];

                dispatch(setConditions(newConditions));
                dispatch(applyFilters()); // Apply filters after changing condition
              }}
              className="mr-2"
            />
            {condition}
          </label>
        ))}
      </div>

      <div className="mb-6 text-xl">
        <h3 className="text-md font-semibold mb-2">Brand</h3>
        {brands.map(brand => (
          <label key={brand} className="flex items-center mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => {
                const newBrands = selectedBrands.includes(brand)
                  ? selectedBrands.filter(b => b !== brand)
                  : [...selectedBrands, brand];

                dispatch(setBrands(newBrands));
                dispatch(applyFilters()); // Apply filters after changing brand
              }}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

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
