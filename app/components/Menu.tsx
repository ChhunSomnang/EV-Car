'use client';
import React, { useEffect, useState } from "react";
import { items } from "../assets/alldata"; // Import your items list

// Define ProductCard component using the provided style
const ProductCard: React.FC<{ product: typeof items[0] }> = ({ product }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105">
      <img
        className="w-full h-48 object-cover"
        src={product.modelImage} // Use modelImage for image source
        alt={product.model} // Use model as alt text
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.model}</h3>
          <p className="mt-2 text-gray-600">{product.category}</p>
        </div>

        <div className="flex items-center mt-2">
          {/* Assuming each product has a rating (defaulting to 0 if missing) */}
          {[...Array(product.rating || 0)].map((_, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927a1 1 0 011.902 0l1.398 3.732a1 1 0 00.9.664l3.646.308a1 1 0 01.591 1.77l-2.77 2.14a1 1 0 00-.322 1.02l1.017 3.774a1 1 0 01-1.516 1.096l-3.171-2.1a1 1 0 00-1.112 0l-3.171 2.1a1 1 0 01-1.516-1.096l1.017-3.774a1 1 0 00-.322-1.02l-2.77-2.14a1 1 0 01.591-1.77l3.646-.308a1 1 0 00.9-.664l1.398-3.732z" />
            </svg>
          ))}
        </div>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          View Product
        </button>
      </div>
    </div>
  );
};

// Main Menu component
const Menu: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<typeof items>(items);

  // Update filters to match item brands
  const filters: string[] = Array.from(new Set(items.map(item => item.brand)));

  // Function to handle filter selection
  const handleFilterButtonClick = (selectedBrand: string) => {
    if (selectedFilters.includes(selectedBrand)) {
      const updatedFilters = selectedFilters.filter((el) => el !== selectedBrand);
      setSelectedFilters(updatedFilters);
    } else {
      setSelectedFilters([...selectedFilters, selectedBrand]);
    }
  };

  // Filter items whenever the selected filters change
  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      const tempItems = selectedFilters.map((selectedBrand) => {
        const temp = items.filter((item) => item.brand === selectedBrand);
        return temp;
      });
      const flatItems = tempItems.flat();
      setFilteredItems(flatItems);
    } else {
      setFilteredItems([...items]);
    }
  };

  return (
    <div className="flex p-6 min-h-screen">
      {/* Filters Section */}
      <div className="w-1/4 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="flex flex-col">
          {filters.map((brand, idx) => (
            <button
              onClick={() => handleFilterButtonClick(brand)}
              className={`border px-4 py-2 rounded-lg transition duration-300 mb-2 text-sm ${
                selectedFilters.includes(brand) ? "bg-blue-600 text-white" : "bg-gray-200 text-black hover:bg-blue-500 hover:text-white"
              }`}
              key={`filters-${idx}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Items Section */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Electric Cars Gallery</h1>
        {/* Flex container for items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
