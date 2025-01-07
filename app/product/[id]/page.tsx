"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import ProductImage from "../../components/ProductImage";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Customize the default marker icon to avoid broken images
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
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

const getCarById = async (id: string): Promise<Product | undefined> => {
  try {
    const response = await fetch("/alldata.json");
    const data = await response.json();
    return data.allcars.find((car: Product) => car.id.toString() === id);
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
};

const Page: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();

  const id = (Array.isArray(params?.id) ? params?.id[0] : params?.id) || "";

  // Using useRef to track the map initialization
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      const fetchedProduct = await getCarById(id);
      setProduct(fetchedProduct || null);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // Handle map initialization using useEffect
  useEffect(() => {
    if (product?.location && !mapRef.current) {
      mapRef.current = new L.Map("map-container", {
        center: [product.location.lat, product.location.lng],
        zoom: 14,
        zoomControl: false,
      });

      new L.TileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ).addTo(mapRef.current);

      L.marker([product.location.lat, product.location.lng])
        .addTo(mapRef.current)
        .bindPopup(`${product.name} - ${product.brand}`);
    }
  }, [product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center">
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

  // Set default location if no location data exists
  const center: [number, number] = product.location
    ? [product.location.lat, product.location.lng]
    : [11.572556, 104.919694];

  return (
    <div className=" md:px-8 lg:px-16 xl:px-20 relative flex flex-col lg:flex-row gap-16 bg-gray-50 p-8 rounded-lg shadow-xl shadow-gray-400">
      <div className="w-full lg:w-2/3 lg:sticky top-24 h-max border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <ProductImage items={product.media?.items || []} />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-6 text-gray-700">
        <h1 className="text-5xl font-extrabold text-gray-800">
          {product.name}
        </h1>
        <p className="text-lg text-gray-500 font-semibold">
          Brand: <span className="text-gray-700">{product.brand}</span>
        </p>
        <p className="text-lg text-gray-500 font-semibold">
          Model: <span className="text-gray-700">{product.model}</span>
        </p>
        <p className="text-lg text-gray-500 font-semibold">
          Category: <span className="text-gray-700">{product.category}</span>
        </p>
        <p className="text-lg text-gray-500 font-semibold">
          Condition: <span className="text-gray-700">{product.condition}</span>
        </p>
        <p className="text-lg text-gray-500 font-semibold">
          Year: <span className="text-gray-700">{product.year}</span>
        </p>
        <p className="text-2xl font-bold text-red-600">
          Price: ${product.price.toFixed(2)}
        </p>
        {product.rating && (
          <p className="text-lg text-yellow-500 font-semibold">
            Rating: {product.rating} ⭐
          </p>
        )}
        <p className="text-lg text-gray-500 font-semibold">
          Phone: <span className="text-gray-700">{product.phone}</span>
        </p>

        {/* Map Container (manual map initialization) */}
        {product.location && (
          <div
            id="map-container"
            className="mt-16 w-full z-0" // mt-16 for margin to avoid overlap
            style={{
              height: "400px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Page;
