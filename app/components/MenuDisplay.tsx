import React from "react";
import { categories } from "../assets/brandItem"; // Importing data from categoryData.js

export default function CategoryGrid() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:transform hover:-translate-y-2 hover:shadow-2xl transition duration-300"
          >
            <img
              src={category.brandImage} // Corrected from brandImagel to brandImage
              alt={category.brand} // This is correct
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{category.brand}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
