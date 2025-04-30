"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../lib/store";
import { fetchProducts } from "../lib/features/productSlice";
import Link from "next/link";
import { removeProductFromCompare, clearCompareList } from "../lib/features/compareSlice";
import { CircularProgress } from "@mui/material";

interface ProductProperty {
  name: string;
  values: Array<{
    value: string;
  }>;
}

const ComparePage: React.FC = () => {
  const dispatch = useDispatch();
  const selectedProducts = useSelector((state: RootState) => state.compare.selectedProducts);
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts() as any );
  }, [dispatch]);

  const comparedProducts = products.filter((p) =>
    selectedProducts.some((id) => String(id) === String(p.id))
  );

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (comparedProducts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 text-xl">
        No products selected for comparison.
        <Link href="/" className="text-blue-600 underline block mt-4">
          Go back to products
        </Link>
      </div>
    );
  }

  // Get all unique property names
  const allProperties = Array.from(
    new Set(
      comparedProducts.flatMap(product => 
        (product.properties || []).map((prop: { name: any; }) => prop.name)
      )
    )
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Comparison</h1>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to clear all products?")) {
              dispatch(clearCompareList());
            }
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Clear All
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {comparedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeProductFromCompare(product.id));
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 z-10"
              title="Remove Product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-64 relative">
              <img
                className="w-full h-full object-cover"
                src={product.imgSrc || "/fallback-image.png"}
                alt={product.name}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = "/fallback-image.png";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
              <p className="mt-2 text-gray-600">Vendor: {product.vendor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features
              </th>
              {comparedProducts.map((product) => (
                <th key={product.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Basic Details */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Weight</td>
              {comparedProducts.map((product) => (
                <td key={product.id} className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {product.weight ? `${product.weight} ${product.weightUnit || ''}` : 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Dimensions</td>
              {comparedProducts.map((product) => (
                <td key={product.id} className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {product.length && product.width && product.height
                    ? `${product.length} x ${product.width} x ${product.height} ${product.measureUnit || ''}`
                    : 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Vendor</td>
              {comparedProducts.map((product) => (
                <td key={product.id} className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {product.vendor || 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Availability</td>
              {comparedProducts.map((product) => (
                <td key={product.id} className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.isBuyable 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isBuyable ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Dynamic Properties */}
            {allProperties.map((propertyName) => (
              <tr key={propertyName}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {propertyName}
                </td>
                {comparedProducts.map((product) => {
                  const property = product.properties?.find((p: { name: any; }) => p.name === propertyName);
                  return (
                    <td key={product.id} className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {property?.values[0]?.value || 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;