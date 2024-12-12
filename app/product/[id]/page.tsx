"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ProductImage from "../../components/ProductImage";
import data from "../../assets/alldata.json";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

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
  year?: number;
  phone?: string; 
  modelImage?: string;
  condition: string;
  rating?: number;
  location?: { lat: number; lng: number };
  media?: {
    items: CarImage[];
  };
}

const getCarById = (id: string): Product | undefined => {
  const car = data.allcars.find((car: Product) => car.id.toString() === id);
  return car ? { ...car, phone: car.phone || "Contact information not available" } : undefined; // Fallback for phone
};

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchedProduct = getCarById(id);
    setProduct(fetchedProduct || null);
  }, [id]);

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

  // Use product location or fallback location if undefined
  const center: [number, number] = product.location
    ? [product.location.lat, product.location.lng]
    : [11.572556, 104.919694];

  return (
    <div className="mt-36 md:px-8 lg:px-16 xl:px-32 relative flex flex-col lg:flex-row gap-16 bg-gray-50 p-8 rounded-lg shadow-xl shadow-gray-400">
      {/* Product Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-24 h-max border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <ProductImage items={product.media?.items || []} />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-gray-700">
        <h1 className="text-5xl font-extrabold text-gray-800">{product.name}</h1>
        <p className="text-lg text-gray-500 font-semibold">Brand: <span className="text-gray-700">{product.brand}</span></p>
        <p className="text-lg text-gray-500 font-semibold">Model: <span className="text-gray-700">{product.model}</span></p>
        <p className="text-lg text-gray-500 font-semibold">Category: <span className="text-gray-700">{product.category}</span></p>
        <p className="text-lg text-gray-500 font-semibold">Condition: <span className="text-gray-700">{product.condition}</span></p>
        <p className="text-lg text-gray-500 font-semibold">Year: <span className="text-gray-700">{product.year}</span></p>
        <p className="text-2xl font-bold text-red-600">Price: ${product.price.toFixed(2)}</p>
        {product.rating && (
          <p className="text-lg text-yellow-500 font-semibold">Rating: {product.rating} ⭐</p>
        )}
        <p className="text-lg text-gray-500 font-semibold">Phone: <span className="text-gray-700">{product.phone}</span></p>
        <p><span className="font-bold">Contact Info</span>: Please don't forget to mention that you found this ad on store24.</p>

        {/* Leaflet Map */}
        <div className="mt-8">
          <MapContainer
            zoom={14}
            center={center}
            style={{ width: "100%", height: "400px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center}>
              <Popup>
                {product.name} - {product.brand}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Page;
