"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import Link from 'next/link';
import { setSelectedCategory, setCategories } from '../lib/features/catalogSlice';
import { fetchProducts, setVendors, setMinPrice, setMaxPrice } from '../lib/features/productSlice';
import { AppDispatch } from '../lib/store';

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector((state: RootState) => state.catalog);
  const { 
    items: products, 
    status, 
    error, 
    selectedVendors,
    minPrice,
    maxPrice 
  } = useSelector((state: RootState) => state.products);
  const [weightRange, setWeightRange] = useState({ min: '', max: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const sampleCategories = [
      { id: 'electronics', name: 'Electronics' },
      { id: 'clothing', name: 'Clothing' },
      { id: 'books', name: 'Books' },
      { id: 'home-garden', name: 'Home & Garden' },
    ];
    dispatch(setCategories(sampleCategories));
  }, [dispatch]);

  const vendors = [...new Set(products.map(product => product.vendor))];

  const handleVendorChange = (vendor: string) => {
    const newVendors = selectedVendors.includes(vendor)
      ? selectedVendors.filter(v => v !== vendor)
      : [...selectedVendors, vendor];
    dispatch(setVendors(newVendors));
  };

  const handleWeightRangeChange = () => {
    const min = weightRange.min ? Number(weightRange.min) : undefined;
    const max = weightRange.max ? Number(weightRange.max) : undefined;
    dispatch(setMinPrice(min));
    dispatch(setMaxPrice(max));
  };

  const filteredProducts = products
    .filter(product => !selectedCategory || product.categoryId === selectedCategory)
    .filter(product => selectedVendors.length === 0 || selectedVendors.includes(product.vendor))
    .filter(product => {
      const min = minPrice ?? -Infinity;
      const max = maxPrice ?? Infinity;
      return product.weight >= min && product.weight <= max;
    });

  if (status === 'loading') {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          {/* Categories */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => dispatch(setSelectedCategory(''))}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  !selectedCategory
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => dispatch(setSelectedCategory(category.id))}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Vendor Filter */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Vendors</h2>
            <div className="space-y-2">
              {vendors.map((vendor) => (
                <label key={vendor} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedVendors.includes(vendor)}
                    onChange={() => handleVendorChange(vendor)}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{vendor}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Weight Range Filter */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Weight Range</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Min Weight</label>
                <input
                  type="number"
                  value={weightRange.min}
                  onChange={(e) => setWeightRange(prev => ({ ...prev, min: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter min weight"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Max Weight</label>
                <input
                  type="number"
                  value={weightRange.max}
                  onChange={(e) => setWeightRange(prev => ({ ...prev, max: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter max weight"
                />
              </div>
              <button
                onClick={handleWeightRangeChange}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name || 'Products'
                : 'All Products'}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {filteredProducts.length} products found
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="w-full h-48 relative">
                  <img
                    src={product.imgSrc || '/fallback-image.png'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = '/fallback-image.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {product.vendor}
                  </p>
                  <p className="mt-2 text-gray-600">
                    Weight: {product.weight} {product.weightUnit}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;