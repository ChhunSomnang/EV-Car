"use client";
import React, { useState } from "react";

type FormData = {
  title: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  fuel: string;
  bodyType: string;
  discount: string;
  salePrice: string;
  description: string;
  location: string;
  address: string;
  name: string;
  phone: string;
  email: string;
  freeDelivery: boolean;
  taxType: "taxPaper" | "plateNumber" | null;
  condition: "new" | "used" | null;
  transmission: "auto" | "manual" | null;
};

const PostForm = () => {
  type Brand = keyof typeof brandModels;
  const [formData, setFormData] = useState<FormData>({
    title: "",

    model: "",
    brand: "" as Brand,
    year: "",
    color: "",
    fuel: "",
    bodyType: "",
    discount: "",
    salePrice: "",
    description: "",
    location: "",
    address: "",
    name: "",
    phone: "",
    email: "",
    freeDelivery: false,
    taxType: null,
    condition: null,
    transmission:null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const brands = ["Tesla", "Nissan", "Porsche", "BMW", "Ford"];
  const brandModels = {
    Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
    Nissan: ["Altima", "Maxima", "370Z"],
    // Add more brands and models here
  };
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );
  const colors = ["Red", "Blue", "Black", "White", "Gray"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const bodyTypes = ["Sedan", "SUV", "Hatchback", "Truck"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    id?: string
  ) => {
    if (typeof e === "string" && id) {
      // Handling for custom inputs like "Condition" buttons
      setFormData((prev) => ({ ...prev, [id]: e }));
    } else if (typeof e !== "string") {
      // Handling for standard form inputs (like text fields or dropdowns)
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.brand) newErrors.brand = "Brand is required.";
    if (!formData.salePrice) newErrors.salePrice = "Sale Price is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
    }
  };

  const inputClasses =
    "mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500";

  const buttonClasses = (isSelected: boolean, color: string) =>
    `mt-1 w-full border rounded-lg p-2 text-left ${
      isSelected
        ? `bg-${color}-100 border-${color}-500`
        : "bg-gray-100 border-gray-300 hover:bg-gray-200"
    } focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500`;
  return (
    <div className="bg-gray-100 ">
      <div className=" flex flex-col items-center">
        <div className="w-full max-w-4xl p-4">
          <h1 className="text-2xl font-bold text-gray-800">Post</h1>
        </div>

        <div className="flex-grow w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-8">
          <p className="text-2xl font-bold text-gray-500">Photo</p>
          <hr />
          <div id="browse_2" className="flex flex-col items-center mt-2">
            <div className="p_btn_brows_big cur_sur flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300">
              <i className="far fa-images mr-2"></i> Add Photo
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-500">Detail Post</h2>
            <hr />
            <form className="space-y-4">
              {/* Existing Fields */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className={inputClasses}
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  id="brand"
                  className={inputClasses}
                  value={formData.brand}
                  onChange={handleChange}
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand}</p>
                )}
              </div>

              <select
                id="model"
                className={inputClasses}
                value={formData.model}
                onChange={handleChange}
              >
                <option value="">Select a model</option>
                {brandModels[formData.brand as keyof typeof brandModels]?.map(
                  (model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  )
                )}
              </select>

              {/* New Fields */}
              {/* Year */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <select
                  id="year"
                  className={inputClasses}
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tax Type */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Tax Type
                  </label>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          taxType: "taxPaper",
                        }))
                      }
                      className={buttonClasses(
                        formData.taxType === "taxPaper",
                        "indigo"
                      )}
                    >
                      Tax Paper
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          taxType: "plateNumber",
                        }))
                      }
                      className={buttonClasses(
                        formData.taxType === "plateNumber",
                        "indigo"
                      )}
                    >
                      Plate Number
                    </button>
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange("new", "condition")}
                    className={`mt-1 block w-full border rounded-lg p-2 text-left ${
                      formData.condition === "new"
                        ? "bg-indigo-100 border-indigo-500"
                        : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    New
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => handleChange("used", "condition")}
                    className={`mt-6 block w-full border rounded-lg p-2 text-left ${
                      formData.condition === "used"
                        ? "bg-indigo-100 border-indigo-500"
                        : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Used
                  </button>
                </div>
              </div>

              {/* Color */}
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color <span className="text-red-500">*</span>
                </label>
                <select
                  id="color"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Color</option>
                </select>
              </div>

              {/* Transmission */}
              <div className="flex gap-4">
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700">
      Transmission
    </label>
    <button
      type="button"
      onClick={() => handleChange("auto", "transmission")}
      className={`mt-1 block w-full border rounded-lg p-2 text-left ${
        formData.transmission === "auto"
          ? "bg-indigo-100 border-indigo-500"
          : "bg-gray-100 border-gray-300 hover:bg-gray-200"
      }`}
    >
      Auto
    </button>
  </div>
  <div className="flex-1">
    <button
      type="button"
      onClick={() => handleChange("manual", "transmission")}
      className={`mt-6 block w-full border rounded-lg p-2 text-left ${
        formData.transmission === "manual"
          ? "bg-indigo-100 border-indigo-500"
          : "bg-gray-100 border-gray-300 hover:bg-gray-200"
      }`}
    >
      Manual
    </button>
  </div>
</div>


              {/* Fuel */}
              <div>
                <label
                  htmlFor="fuel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuel
                </label>
                <select
                  id="fuel"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Fuel Type</option>
                </select>
              </div>

              {/* Body Type */}
              <div>
                <label
                  htmlFor="bodyType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body Type
                </label>
                <select
                  id="bodyType"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Body Type</option>
                </select>
              </div>

              {/* Discount */}
              <div>
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="discount"
                    className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter discount"
                  />
                  <button
                    type="button"
                    className="border border-gray-300 bg-gray-100 rounded-lg px-4 py-2"
                  >
                    %
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 bg-gray-100 rounded-lg px-4 py-2"
                  >
                    $
                  </button>
                </div>
              </div>
              {/* Sale Price */}
              <div>
                <label
                  htmlFor="salePrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sale Price <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">$</span>
                  <input
                    type="text"
                    id="salePrice"
                    className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter price"
                  />
                </div>
              </div>
              {/* Free Delivery */}
              <div>
                <label
                  htmlFor="freeDelivery"
                  className="block text-sm font-medium text-gray-700"
                >
                  Free Delivery
                </label>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="freeDelivery"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="freeDelivery" className="ml-2 text-gray-700">
                    Yes
                  </label>
                </div>
              </div>
              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter description"
                ></textarea>
              </div>
              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Locations <span className="text-red-500">*</span>
                </label>
                <select
                  id="location"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose Location</option>
                  {/* Add options here */}
                </select>
              </div>
              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address"
                />
              </div>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              {/* Phone Number */}
              <div className="mt-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="phone"
                    className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>
              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
