// app/list/ListPage.tsx
"use client";

import React, { useEffect, useCallback, useState, Suspense, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";

import { RootState, AppDispatch } from "../lib/store";
import ProductCardList from "../components/ProductCardList";
import Filter from "../components/filter";

import {
  fetchProducts,
  applyFilters,
  setSelectedMakes,
} from "../lib/features/productSlice";

import type { Product } from "../lib/features/productSlice";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <CircularProgress />
  </div>
);

const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
    <div className="text-red-600 text-xl mb-4">Error loading products: {error}</div>
    <button 
      onClick={onRetry} 
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

interface ProductState {
  filteredItems: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  items: Product[];
  selectedMakes: string[];
  error: string | null;
}

const SearchParamsWrapper = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { items, selectedMakes } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const brandFromQuery = searchParams?.get("brand");
    if (!brandFromQuery) return;

    const brandParam = brandFromQuery.toLowerCase().trim();
    const matchingBrand = items.find(item => 
      (item.brand || "").toLowerCase().trim() === brandParam
    )?.brand || brandFromQuery;

    if (!selectedMakes.includes(matchingBrand)) {
      dispatch(setSelectedMakes([...selectedMakes, matchingBrand]));
      dispatch(applyFilters());
    }
  }, [searchParams, dispatch, items, selectedMakes]);

  return null;
};

const ListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, status, error } = useSelector(
    (state: RootState) => state.products as ProductState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const initializeProducts = useCallback(() => {
    if (status === "idle" || status === "failed") {
      dispatch(fetchProducts({}));
    }
  }, [dispatch, status]);

  useEffect(() => {
    initializeProducts();
  }, [initializeProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems.length]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredItems.slice(startIndex, endIndex);
  }, [currentPage, pageSize, filteredItems]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(filteredItems.length / pageSize)) {
      setCurrentPage(page);
    }
  };

  if (status === "loading" && filteredItems.length === 0) {
    return <LoadingSpinner />;
  }
  if (status === "failed" && error) {
    return <ErrorDisplay error={error} onRetry={() => dispatch(fetchProducts({}))} />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen pt-16 sm:pt-20 px-2 sm:px-4 gap-4 lg:gap-6">
      <Suspense fallback={<div className="w-full text-center">Loading search parameters...</div>}>
        <SearchParamsWrapper />
      </Suspense>
      <aside className="w-full lg:w-1/4 xl:w-1/5 p-2 sm:p-4 lg:sticky lg:top-20 lg:self-start bg-white rounded-lg shadow-sm">
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() =>
              document.querySelector("aside")?.classList.toggle("hidden")
            }
          >
            Show/Hide
          </button>
        </div>
        <Suspense fallback={<div className="text-center p-4">Loading filters...</div>}>
          <Filter />
        </Suspense>
      </aside>

      <main className="w-full lg:w-3/4 xl:w-4/5 p-2 sm:p-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
          Electric Cars Gallery
        </h1>
        <div className="space-y-4 sm:space-y-6">
          {filteredItems.length === 0 && status !== "loading" ? (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-600 text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => dispatch(setSelectedMakes([]))}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <ProductCardList
              products={paginatedProducts}
              totalItems={filteredItems.length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ListPage;
