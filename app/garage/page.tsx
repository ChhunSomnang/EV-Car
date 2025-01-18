"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Garage {
  garage_id: number;
  garage_name: string;
  location: string;
  image: string;  // Added image field
  services: string[];
  cars_serviced: {
    car_id: number;
    owner: string;
    make: string;
    model: string;
    year: number;
    condition: string;
    service_history: { service_id: number; service_type: string; date: string }[];
  }[];
}

const Garage = () => {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await fetch("/garage.json"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setGarages(data);
        } else {
          console.error("API did not return an array:", data);
          setGarages([]);
          setError("No garages available.");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGarages();
  }, []);

  const filteredGarages = useMemo(() => {
    return filter
      ? garages.filter(
          (garage) =>
            garage.garage_name.toLowerCase().includes(filter.toLowerCase()) ||
            garage.location.toLowerCase().includes(filter.toLowerCase())
        )
      : garages;
  }, [filter, garages]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Our Garages
      </h1>
      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by garage name or location..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGarages.length > 0 ? (
            filteredGarages.map((garage) => (
              <div
                key={garage.garage_id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={garage.image || "/default-garage-image.jpg"}  // Fallback image
                  alt={garage.garage_name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-bold text-gray-800">
                  {garage.garage_name}
                </h2>
                <p className="text-gray-600">Location: {garage.location}</p>
                <h3 className="text-gray-800 font-semibold mt-4">Services:</h3>
                <ul>
                  {garage.services.map((service) => (
                    <li key={service} className="text-gray-600">
                      {service}
                    </li>
                  ))}
                </ul>
                <h3 className="text-gray-800 font-semibold mt-4">Cars Serviced:</h3>
                <ul>
                  {garage.cars_serviced.map((car) => (
                    <li key={car.car_id} className="text-gray-600">
                      {car.make} {car.model} ({car.year}) - {car.condition}
                      <Link
                        href={`/garageDetails/${garage.garage_id}`}
                        className="ml-2 text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              {error || "No garages available."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Garage;
