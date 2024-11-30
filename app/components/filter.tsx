"use client";
import React, { useEffect, useState } from 'react';

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

interface FilterProps {
    items: Item[];
    setFilteredItems: React.Dispatch<React.SetStateAction<Item[]>>;
    defaultBrand: string; // Add defaultBrand to the props
}

const Filter: React.FC<FilterProps> = ({ items, setFilteredItems, defaultBrand }) => {
    const [selectedBrands, setSelectedBrands] = React.useState<string[]>([defaultBrand]);
    const [selectedConditions, setSelectedConditions] = React.useState<string[]>([]);
    const [minPrice, setMinPrice] = React.useState<number | undefined>();
    const [maxPrice, setMaxPrice] = React.useState<number | undefined>();

    // Function to filter items based on selected criteria
    const filterItems = () => {
        let filteredItems = items;

        // Filter by selected brands
        if (selectedBrands.length > 0) {
            filteredItems = filteredItems.filter(item => selectedBrands.includes(item.brand));
        }

        // Filter by selected conditions
        if (selectedConditions.length > 0) {
            filteredItems = filteredItems.filter(item => selectedConditions.includes(item.condition));
        }

        // Filter by min price
        if (minPrice !== undefined) {
            filteredItems = filteredItems.filter(item => item.price >= minPrice);
        }

        // Filter by max price
        if (maxPrice !== undefined) {
            filteredItems = filteredItems.filter(item => item.price <= maxPrice);
        }

        // Update filtered items
        setFilteredItems(filteredItems);
    };

    // Use effect to update filtered items whenever filter state changes
    useEffect(() => {
        filterItems();
    }, [selectedBrands, selectedConditions, minPrice, maxPrice]);

    // Function to toggle selected brands
    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    // Function to toggle selected conditions
    const toggleCondition = (condition: string) => {
        setSelectedConditions(prev =>
            prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
        );
    };

    return (
        <div className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-md w-1/4">
            <h2 className="text-lg font-bold mb-6 text-center">Filter</h2>

            {/* Min Price */}
            <div className="mb-4">
                <label className="block text-md font-semibold text-gray-700 mb-2">Min Price</label>
                <input
                    type="number"
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Min Price"
                />
            </div>

            {/* Max Price */}
            <div className="mb-4">
                <label className="block text-md font-semibold text-gray-700 mb-2">Max Price</label>
                <input
                    type="number"
                    value={maxPrice || ""}
                    onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Max Price"
                />
            </div>

            {/* Condition Filter */}
            <div className="mb-6 text-xl">
                <h3 className="text-md font-semibold mb-2">Condition</h3>
                <label className="flex items-center mb-2 text-gray-700">
                    <input
                        type="checkbox"
                        checked={selectedConditions.includes("New")}
                        onChange={() => {
                            toggleCondition("New");
                        }}
                        className="mr-2"
                    />
                    New
                </label>
                <label className="flex items-center mb-2 text-gray-700">
                    <input
                        type="checkbox"
                        checked={selectedConditions.includes("Used")}
                        onChange={() => {
                            toggleCondition("Used");
                        }}
                        className="mr-2"
                    />
                    Used
                </label>
            </div>

            {/* Brand Filter */}
            <div className="mb-6 text-xl">
                <h3 className="text-md font-semibold mb-2">Brand</h3>
                {["Tesla", "Nissan", "Porsche", "BMW", "Ford"].map((brand) => (
                    <label key={brand} className="flex items-center mb-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => {
                                toggleBrand(brand);
                            }}
                            className="mr-2"
                        />
                        {brand}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filter;
