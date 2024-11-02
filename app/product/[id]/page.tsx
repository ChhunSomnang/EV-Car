"use client"; // Ensure this runs on the client-side
import React, { useEffect, useState } from "react";
import ProductImage from "../../components/ProductImage"; // Adjust the import path if necessary
import data from '../../assets/alldata.json'; // Adjust the import path to your JSON file

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
  modelImage?: string; // Make modelImage optional
  condition: string;
  rating?: number;
  media?: {
    items: CarImage[]; // Expect an array of CarImage
  };
}

const getCarById = (id: string): Product | undefined => {
  return data.allcars.find((car: Product) => car.id.toString() === id); // Find car by ID
};

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params; // Get the ID from the route parameters

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchedProduct = getCarById(id);
    setProduct(fetchedProduct || null); // Set product or null if not found
  }, [id]);

  if (!product) {
    return <p className="text-red-500">No product found.</p>; // Display error message
  }

  return (
    <div className="mt-36 md:px-8 lg:px-16 xl:px-32 relative flex flex-col lg:flex-row gap-16">
      {/* Product Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-24 h-max">
        <ProductImage items={product.media?.items || []} />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">Brand: {product.brand}</p>
        <p className="text-gray-500">Model: {product.model}</p>
        <p className="text-gray-500">Category: {product.category}</p>
        <p className="text-gray-500">Condition: {product.condition}</p>
        <p className="text-gray-500">Price: ${product.price.toFixed(2)}</p>
        {product.rating && <p className="text-gray-500">Rating: {product.rating}</p>}
      </div>
    </div>
  );
};

export default Page;
