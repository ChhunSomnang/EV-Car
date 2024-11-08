"use client"; // Ensure this runs on the client-side
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ProductImage from "../../components/ProductImage";
import data from '../../assets/alldata.json';
import AddToCartButton from "@/app/components/button";

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
  modelImage?: string;
  condition: string;
  rating?: number;
  location?: { lat: number; lng: number }; // Optional location field
  media?: {
    items: CarImage[];
  };
}

const getCarById = (id: string): Product | undefined => {
  return data.allcars.find((car: Product) => car.id.toString() === id);
};

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchedProduct = getCarById(id);
    setProduct(fetchedProduct || null);
  }, [id]);

  if (!product) {
    return <p className="text-red-500 text-lg text-center mt-20">Oops! No product found.</p>;
  }

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = product.location || { lat: 40.7128, lng: -74.0060 }; // Default to New York City

  return (
    <div className="mt-36 md:px-8 lg:px-16 xl:px-32 relative flex flex-col lg:flex-row gap-16 bg-gray-50 p-8 rounded-lg shadow-lg">
      {/* Product Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-24 h-max border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <ProductImage items={product.media?.items || []} />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-gray-700">
        <h1 className="text-5xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-lg text-gray-500 font-semibold">Brand: <span className="text-gray-700">{product.brand}</span></p>
        <p className="text-lg text-gray-500 font-semibold">Model: <span className="text-gray-700">{product.model}</span></p>
        <p className="text-lg text-gray-500 font-semibold">Category: <span className="text-gray-700">{product.category}</span></p>
        <p className="text-lg text-gray-500 font-semibold">Condition: <span className="text-gray-700">{product.condition}</span></p>
        <p className="text-2xl font-bold text-blue-600">Price: ${product.price.toFixed(2)}</p>
        {product.rating && (
          <p className="text-lg text-yellow-500 font-semibold">Rating: {product.rating} ⭐</p>
        )}

        {/* Add to Cart Button */}
        <div className="mt-8">
          <AddToCartButton />
        </div>

        {/* Google Map */}
        <div className="mt-8">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={14}
            >
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Page;
