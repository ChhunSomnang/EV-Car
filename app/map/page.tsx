"use client";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import mapData from "../assets/map.json";

// Configure default icon for Leaflet markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Define the center of the map
const center: [number, number] = mapData.locations.length > 0
  ? [mapData.locations[0].lat, mapData.locations[0].lng]
  : [11.572556, 104.919694]; // Default fallback location

const Page = () => {
  const mapRef = useRef<L.Map | null>(null); // Use a ref to keep track of the map instance

  useEffect(() => {
    return () => {
      // Clean up the map instance when the component unmounts
      if (mapRef.current) {
        mapRef.current.remove(); // Remove the map instance to prevent re-initialization issues
        mapRef.current = null; // Nullify the reference
      }
    };
  }, []);

  return (
    <div className="flex">
      <div className="h-[500px] w-full border border-gray-300 rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full"
          whenReady={() => {
            // No map argument is needed here
            console.log("Map is ready");
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mapData.locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lng]}
            >
              <Popup>Marker #{index + 1}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Page;
