"use client"; // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import MapWrapper from "./MapWrapper";

interface Station {
  id: number;
  name: string;
  address: string;
  status: "Available" | "Busy";
  position: [number, number]; // Latitude and Longitude
}

const ChargingStation: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("/chargingStations.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setStations(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Charging Stations</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-96 rounded-md overflow-hidden">
          {/* Pass selectedStation to MapWrapper */}
          <MapWrapper
            center={[11.5564, 104.9282]}
            zoom={13}
            stations={stations}
            selectedStation={selectedStation}
          />
        </div>
        <div className="space-y-4">
          {stations.map((station) => (
            <div
              key={station.id}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center cursor-pointer"
              onClick={() => setSelectedStation(station)} // Set the clicked station
            >
              <div>
                <h3 className="font-semibold">{station.name}</h3>
                <p className="text-gray-600">{station.address}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full ${
                  station.status === "Available"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {station.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChargingStation;
