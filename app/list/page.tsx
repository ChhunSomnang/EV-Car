"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../lib/store"; // Import AppDispatch
import ProductCardList from "../components/ProductCardList";
import Filter from "../components/filter";
import { fetchProducts, applyFilters } from "../lib/features/productSlice";
import { useSearchParams } from "next/navigation";

const ListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch with AppDispatch
  const searchParams = useSearchParams();
  const brandFromQuery = searchParams?.get("brand");

  // Get products and filters from Redux store
  const { filteredItems, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts()); // Now properly typed
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (brandFromQuery) {
      dispatch(applyFilters()); // Apply filters after fetching products
    }
  }, [dispatch, brandFromQuery]);

  return (
    <div className="flex">
      <Filter defaultBrand={brandFromQuery || ""} />
      <main className="w-full md:w-3/4 p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Electric Cars Gallery</h1>
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-600">No products found.</p>
          ) : (
            <ProductCardList products={filteredItems} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ListPage;
