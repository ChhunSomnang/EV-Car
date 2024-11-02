// app/productdisplay/page.tsx
"use client"; // Ensure this runs on the client-side
import React, { useEffect, useState } from "react";
import ProductImage from "../../components/ProductImage"; // Adjust the import path if necessary

interface CarImage {
  id: number;
  url: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  modelImage: string;
  condition: string;
  rating: number;
  media?: {
    items: CarImage[]; // Expect an array of CarImage
  };
}

interface Products {
  items: Product[];
}

const getAllCars = async (): Promise<Products> => {
  const res = await fetch('http://localhost:4000/allcars');
  if (!res.ok) {
    throw new Error('Failed to fetch cars');
  }
  return res.json();
};


const Page: React.FC = () => {
  const [products, setProducts] = useState<Products | null>(null); // Start with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const modelImage = await getAllCars();
        console.log(modelImage); // Log to verify API response
        setProducts(modelImage);
      } catch (err) {
        console.error(err);
        setError("Failed to load car images.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Loading and error states
  if (loading) return <p>Loading images...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Ensure products is defined and has items
  if (!products || !products.items || products.items.length === 0) {
    return <p>No products available.</p>; // Handle the case when products.items is empty
  }

  const product = products.items[0]; // Safely access the first product

  return (
    <div className="mt-10 pt-16 pb-10 px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-12 flex flex-col lg:flex-row gap-10 lg:gap-14">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max shadow-md rounded-md overflow-hidden">
        <ProductImage items={product.media?.items || []} />
      </div>
      
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">
          {product.name}
        </h1>
        <p className="text-gray-600 leading-relaxed">
          {product.brand}
        </p>
        <p className="text-gray-600 leading-relaxed">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 leading-relaxed">
          Condition: {product.condition}
        </p>
      </div>
    </div>
  );
};

export default Page;
