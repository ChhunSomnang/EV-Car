"use client";
import { useEffect, useState } from "react";
import MapWrapper from "./MapWrapper";

interface ChargingStationProps {
  searchAddress: string;
}

interface Station {
  id: number;
  name: string;
  address: string;
  status: "Available" | "Busy";
  position: [number, number];
}

const ChargingStation: React.FC<ChargingStationProps> = ({ searchAddress }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await fetch("/chargingStations.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStations(data);
        setFilteredStations(data);
      } catch (error) {
        setError("Failed to load charging stations");
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  useEffect(() => {
    if (searchAddress) {
      const filtered = stations.filter((station) =>
        station.address.toLowerCase().includes(searchAddress.toLowerCase())
      );
      setFilteredStations(filtered);
      setSelectedStation(null);
    } else {
      setFilteredStations(stations);
    }
  }, [searchAddress, stations]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="text-xl text-gray-600">Loading stations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Stations</h2>
        <div className="space-y-4 max-h-[550px] overflow-y-auto">
          {filteredStations.map((station) => (
            <div 
              key={station.id} 
              className={`border-b pb-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer p-3 rounded ${
                selectedStation?.id === station.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedStation(station)}
            >
              <h3 className="font-bold text-lg text-gray-800">{station.name}</h3>
              <p className="text-gray-600 mt-1">{station.address}</p>
              <div className="flex items-center mt-2">
                <span className="text-gray-700">Status: </span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                    station.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {station.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 rounded-lg overflow-hidden shadow-md h-[600px]">
        <MapWrapper
          center={[11.562108, 104.888535]}
          zoom={13}
          stations={filteredStations}
          selectedStation={selectedStation}
        />
      </div>
    </div>
  );
};

export default ChargingStation;