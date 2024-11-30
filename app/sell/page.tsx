import React from "react";

const PostForm = () => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="mt-16 flex flex-col items-center">
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
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter title"
                />
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
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a brand</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700"
                >
                  Model
                </label>
                <select
                  id="model"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a model</option>
                </select>
              </div>

              {/* New Fields */}
              {/* Year */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  id="year"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Year</option>
                </select>
              </div>

              {/* Tax Type */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Tax Type <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-left"
                  >
                    Tax Paper
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    className="mt-6 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-left"
                  >
                    Plate Number
                  </button>
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
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-left"
                  >
                    New
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    className="mt-6 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-left"
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
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-left"
                  >
                    Auto
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    className="mt-6 block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-left"
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  </label>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
