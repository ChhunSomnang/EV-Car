"use client"; // Mark this as a Client Component

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapWrapperProps {
  center: [number, number];
  zoom: number;
  stations: {
    id: number;
    name: string;
    address: string;
    status: "Available" | "Busy";
    position: [number, number];
  }[];
  selectedStation: {
    id: number;
    name: string;
    address: string;
    status: "Available" | "Busy";
    position: [number, number];
  } | null;
}

const MapWrapper: React.FC<MapWrapperProps> = ({
  center,
  zoom,
  stations,
  selectedStation,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize the map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create the map instance
    mapRef.current = L.map(mapContainerRef.current).setView(center, zoom);

    // Add the tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Add markers
    stations.forEach((station) => {
      const marker = L.marker(station.position, { icon: defaultIcon }).addTo(
        mapRef.current!
      );
      marker.bindPopup(
        `<div>
          <h3 class="font-semibold">${station.name}</h3>
          <p class="text-gray-600">${station.address}</p>
          <span class="px-2 py-1 rounded-full text-sm ${
            station.status === "Available"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }">
            ${station.status}
          </span>
        </div>`
      );
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom, stations]);

  // Pan and zoom to selected station
  useEffect(() => {
    if (selectedStation && mapRef.current) {
      mapRef.current.setView(selectedStation.position, zoom);
      const marker = L.marker(selectedStation.position, { icon: selectedIcon });
      marker.addTo(mapRef.current).openPopup();
    }
  }, [selectedStation, zoom]);

  return <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />;
};

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Selected station icon
const selectedIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [1, -40],
  shadowSize: [50, 50],
});

export default MapWrapper;
