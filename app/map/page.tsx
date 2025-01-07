"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import mapData from "../assets/map.json";

// Configure default icon for Leaflet markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Define the center of the map
const defaultCenter: [number, number] = [11.572556, 104.919694]; // Default fallback location

const MapView = () => {
  // Type the center explicitly as LatLngTuple
  const center: L.LatLngTuple =
    mapData.locations.length > 0
      ? [mapData.locations[0].lat, mapData.locations[0].lng] as L.LatLngTuple
      : defaultCenter;

  return (
    <MapContainer center={center} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {mapData.locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng] as L.LatLngTuple}
        >
          <Popup>Marker #{index + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const Page = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="h-[500px] w-full border border-gray-300 rounded-lg overflow-hidden">
        <MapView />
      </div>
    </div>
  );
};

export default Page;
