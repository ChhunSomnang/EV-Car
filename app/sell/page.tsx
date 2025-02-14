"use client"
import React, { useState } from "react";
import axios from "axios";

// Define a type for formData to make sure it matches the expected structure
type FormData = {
  Title: string;
  Description: string;
  Price: string;
  Image: string | null;  // Handle the Image as string or null before the file is set
  IsFeatured: boolean;
  Location: string;
  Model: string;
  Color: string;
  Condition: string;
  CategoryId: string;
  BrandId: string;
  SkuId: string;
  ECurrencyType: string;
};

const CreateProductPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Title: "",
    Description: "",
    Price: "",
    Image: null,  // Initially null, can be set to a string (file name) or a File object later
    IsFeatured: true,
    Location: "",
    Model: "",
    Color: "",
    Condition: "",
    CategoryId: "",
    BrandId: "",
    SkuId: "",
    ECurrencyType: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set the file's name or handle the file further if needed
      setFormData((prevData) => ({
        ...prevData,
        Image: file.name,  // Assuming you're sending the filename as a string
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: formData.Title || "",
      description: formData.Description || "",
      price: formData.Price || 0,
      image: formData.Image || "",
      isFeatured: formData.IsFeatured,
      location: formData.Location || "",
      model: formData.Model || "",
      color: formData.Color || "",
      condition: formData.Condition || "",
      categoryId: formData.CategoryId || "",
      brandId: formData.BrandId || "",
      skuId: formData.SkuId || "",
      eCurrencyType: formData.ECurrencyType || "",
    };

    try {
      console.log("Sending data:", data); // Log the data being sent

      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      const response = await axios.post(
        "https://inventoryapi-367404119922.asia-southeast1.run.app/Product",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error);
      alert("Error creating product.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="Title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product title"
          />
        </div>

        {/* Other fields here... */}

        {/* Image */}
        <div className="mb-4">
          <label
            htmlFor="Image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="Image"
            name="Image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Other fields here... */}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
