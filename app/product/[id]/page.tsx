"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

// Fixing Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Define types for the product
interface Product {
  title: string;
  description: string;
  brand: string;
  category: string;
  model: string;
  color: string;
  condition: string;
  price: number;
  eCurrencyType: string;
  isFeatured: boolean;
  image: string; // Single image URL from R2
}

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id as string; // Ensure productId is treated as a string
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing!");
      setLoading(false);
      return;
    }
    if (!token) {
      setError("Missing API token! Check environment variables.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://inventoryapi-367404119922.asia-southeast1.run.app/Product/${productId}`;

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to load product: ${error.message}`);
        setLoading(false);
      });
  }, [productId]); // Removed token from dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-lg">Oops! No product found.</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${R2_BUCKET_URL}/${product.image}`;

    console.log(product)

  return (
    <div className=" md:px-8 lg:px-16 xl:px-32 relative flex flex-col lg:flex-row gap-16 bg-gray-50 p-8 rounded-lg shadow-xl shadow-gray-400">
      <div className="w-full lg:w-1/2 lg:sticky top-24 h-max border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-gray-700">
        <h1 className="text-5xl font-extrabold text-gray-800">{product.title}</h1>
        <p className="text-lg text-gray-500 font-semibold">
          Description: <span className="text-gray-700">{product.description}</span>
        </p>
        {product.brand && (
          <p className="text-lg text-gray-500 font-semibold">
            Brand: <span className="text-gray-700">{product.brand}</span>
          </p>
        )}
        {product.category && (
          <p className="text-lg text-gray-500 font-semibold">
            Category: <span className="text-gray-700">{product.category}</span>
          </p>
        )}
        <p className="text-lg text-gray-500 font-semibold">
          Model: <span className="text-gray-700">{product.model}</span>
        </p>
        <p className="text-lg text-gray-500 font-semibold">
          Color: <span className="text-gray-700">{product.color}</span>
        </p>
        <p className="text-lg text-gray-500 font-semibold">
          Condition: <span className="text-gray-700">{product.condition}</span>
        </p>
        <p className="text-2xl font-bold text-red-600">
          Price: {product.price} {product.eCurrencyType}
        </p>
       
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 shadow-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;