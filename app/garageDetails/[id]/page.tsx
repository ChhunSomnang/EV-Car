"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ServiceHistory {
  service_id: number;
  service_type: string;
  date: string;
}

interface Car {
  car_id: number;
  owner: string;
  make: string;
  model: string;
  year: number;
  condition: string;
  service_history: ServiceHistory[];
}

interface Garage {
  garage_id: number;
  garage_name: string;
  location: string;
  image: string;
  services: string[];
  cars_serviced: Car[];
}

const GarageDetails = () => {
  const params = useParams(); // Get route parameters
  const garage_id = params?.id ? parseInt(params.id as string, 10) : null; // Extract `garage_id`

  const [garage, setGarage] = useState<Garage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGarageDetails = async () => {
      try {
        setLoading(true);
        if (garage_id === null || isNaN(garage_id)) {
          throw new Error("Invalid Garage ID");
        }

        const response = await fetch("/garage.json"); // Path to your JSON file
        if (!response.ok) {
          throw new Error(`Failed to fetch garage data: ${response.statusText}`);
        }

        const data: Garage[] = await response.json();
        const selectedGarage = data.find((g) => g.garage_id === garage_id);
        if (!selectedGarage) {
          throw new Error("Garage not found.");
        }

        setGarage(selectedGarage);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchGarageDetails();
  }, [garage_id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        {garage ? garage.garage_name : "Garage Details"}
      </h1>

      {garage ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img
            src={garage.image || "/default-garage-image.jpg"}
            alt={`Image of ${garage.garage_name}`}
            className="w-full h-64 object-cover rounded-lg mb-6"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-garage-image.jpg";
            }}
          />
          <div>
            <p className="text-lg text-gray-800">Location: {garage.location}</p>

            <h3 className="text-gray-800 font-semibold mt-4">Services:</h3>
            {garage.services.length > 0 ? (
              <ul className="list-disc ml-5 text-gray-600">
                {garage.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No services available.</p>
            )}

            <h3 className="text-gray-800 font-semibold mt-4">Cars Serviced:</h3>
            {garage.cars_serviced.length > 0 ? (
              <ul>
                {garage.cars_serviced.map((car) => (
                  <li key={car.car_id} className="text-gray-600 mt-2">
                    {car.make} {car.model} ({car.year}) - {car.condition}
                    <ul className="ml-5 text-gray-500">
                      {car.service_history.map((history) => (
                        <li key={history.service_id}>
                          {history.service_type} - {history.date}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No cars serviced yet.</p>
            )}

            <Link
              href="/garage"
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-center block"
            >
              Back to Garages
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">No garage data found.</div>
      )}
    </div>
  );
};

export default GarageDetails;
