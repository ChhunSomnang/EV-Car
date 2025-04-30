"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface Garage {
  garage_id: number;
  garage_name: string;
  location: string;
  image: string;
  services: string[];
  cars_serviced: any[];
}

interface AppointmentBookingModalProps {
  open: boolean;
  onClose: () => void;
  garage: Garage;
}

const AppointmentBookingModal = ({ open, onClose, garage }: AppointmentBookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(""); // Null until a time is selected
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [timeError, setTimeError] = useState<string>(""); // For unavailable time error

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"
  ];

  // Simulate unavailable times
  const unavailableTimes = ["1:00 PM", "3:30 PM", "5:00 PM"];

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !name.trim()) {
      setError("All fields are required.");
      return;
    }

    if (unavailableTimes.includes(selectedTime)) {
      setTimeError("This time slot is unavailable. Please choose another time.");
      return;
    }

    setError("");
    setTimeError(""); // Clear any previous time errors
    console.log("Booking submitted:", { name, selectedDate, selectedTime, garage_id: garage.garage_id });
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
        <div className="bg-white rounded-lg shadow-lg p-6 w-max relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl font-semibold text-gray-700 hover:text-red-500"
          >
            &times;
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center text-gray-800">Book an Appointment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date and Time Flex Section */}
            <div className="flex space-x-6">
              {/* Date Picker */}
              <div className="flex flex-col w-1/2">
                <Label className="text-lg font-medium text-gray-700">Select Appointment Date</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full mt-2 p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Time Slot Buttons */}
              <div className="flex flex-col w-1/2">
                <Label className="text-lg font-medium text-gray-700">Select Time Slot</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    disabled={unavailableTimes.includes(time)}
                    className={`
                      ${unavailableTimes.includes(time) ? "bg-red-500 text-white cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}
                      ${selectedTime === time && !unavailableTimes.includes(time) ? "bg-blue-700" : ""}
                      px-4 py-2 rounded-md
                    `}
                  >
                    {time} {unavailableTimes.includes(time) && "(Unavailable)"}
                  </Button>
                ))}

                </div>
              </div>
            </div>

            {/* Name Input */}
            <div className="flex flex-col">
              <Label className="text-lg font-medium text-gray-700">Phone Number</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full mt-2 p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {timeError && <p className="text-red-600 text-sm">{timeError}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            
            <div className="flex justify-between items-center mt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="px-5 py-2 rounded-md text-gray-700 border-2 border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-5 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
              >
                Confirm Appointment
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBookingModal;
