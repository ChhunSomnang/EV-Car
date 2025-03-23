"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { addToCart } from "app/lib/features/store/cartSlice"; // ✅ Import the action
import "leaflet/dist/leaflet.css";

const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

interface Product {
  id: string;
  title: string;
  description: string;
  brand?: string;
  category?: string;
  model?: string;
  color?: string;
  condition?: string;
  price: number;
  eCurrencyType: string;
  image: string;
  rating?: number;
  availability?: string;
  dimensions?: string;
  manufacturer?: string;
}

const ProductDetail = () => {
  const params = useParams();
  const productId = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
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

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://inventoryapi-367404119922.asia-southeast1.run.app/Product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("API Response:", data); // Debugging line
    
        // Add the `id` field manually using the `productId` from the URL
        const productData = {
          ...data,
          id: productId, // Use the `productId` from the URL as the `id`
        };
    
        setProduct(productData);
      } catch (err) {
        setError(`Failed to load product: ${err instanceof Error ? err.message : "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
  console.log("Product state:", product); // Debugging line
}, [product]);
  const handleAddToCart = () => {
    if (!product) {
      console.error("Error: Product is null!");
      return;
    }

    const newCartItem = {
      id: product.id,
      title: product.title, // Use 'title' instead of 'name'
      price: product.price,
      image: product.image.startsWith("http")
        ? product.image
        : `${R2_BUCKET_URL}/${product.image}`,
      quantity: 1,
    };

    dispatch(addToCart(newCartItem));
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md"
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${R2_BUCKET_URL}/${product.image}`;

  return (
    <div className="md:px-8 lg:px-16 xl:px-32 flex flex-col lg:flex-row gap-16 bg-gray-50 p-8 rounded-lg shadow-xl">
      <div className="w-full lg:w-1/2 lg:sticky top-24 h-max border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <Image
          src={imageUrl}
          alt={product.title}
          width={500}
          height={500}
          className="w-full h-auto rounded-lg"
          priority
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
        <p className="text-lg text-gray-500 font-semibold">
            Category: <span className="text-gray-700">{product.category}</span>
          </p><p className="text-lg text-gray-500 font-semibold">
            Model: <span className="text-gray-700">{product.model}</span>
          </p><p className="text-lg text-gray-500 font-semibold">
            Condition: <span className="text-gray-700">{product.condition}</span>
          </p><p className="text-lg text-gray-500 font-semibold">
            Color: <span className="text-gray-700">{product.color}</span>
          </p>
        <p className="text-2xl font-bold text-red-600">
          Price: {product.price} {product.eCurrencyType}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 shadow-md hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
