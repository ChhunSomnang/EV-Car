"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

type FormData = {
  username: string;
  password: string;
  sub: string;
};

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setMessage("");

    try {
      const response = await axios.post(
        "https://inventoryapi-367404119922.asia-southeast1.run.app/User/Register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        }
      );
      console.log("Response received:", response.data);

      setMessage(`Registration successful! User ID: ${response.data.userId}`);
    } catch (error: any) {
      setMessage(
        `Error: ${error.response?.data?.error || "Registration failed"}`
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>

      {message && (
        <p
          className={`text-sm ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username:</label>
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password:</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            type="password"
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Sub:</label>
          <input
            {...register("sub", { required: "Sub is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.sub && (
            <p className="text-red-500 text-xs">{errors.sub.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
