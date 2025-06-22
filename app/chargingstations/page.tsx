"use client";
import { useState, useEffect } from "react";
import ChargingStation from "../components/ChargingStation/ChargingStation";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { API_ENDPOINTS } from '../lib/constants';

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAddress, setSearchAddress] = useState("");



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAddress(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Charging Stations</h1>
            {/* Add Station button hidden */}
          </div>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full max-w-md mb-4 sm:mb-6">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              className="flex-grow"
            />
            <IconButton 
              type="submit" 
              color="primary" 
              aria-label="search"
              className="w-full sm:w-auto"
            >
              <SearchIcon />
            </IconButton>
          </form>

          <div className="rounded-lg overflow-hidden">
            <ChargingStation searchAddress={searchAddress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;