"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessories, setFilter, applyFilter } from "../lib/features/accessoriesSlice";
import { RootState, AppDispatch } from "../lib/store";
import Image from "next/image";
import Link from "next/link";
// Import the responsive AccessoriesFilter component
import AccessoriesFilter from "../components/AccessoriesFilter"; 
import { Filter } from "../lib/features/accessoriesSlice";
import axios from "axios";

// Types for API responses
interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface ApiResponse<T> {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  data: T[];
}

// Modal Component for Creating New Accessory
const CreateAccessoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // FIX: Explicitly define compatibleModels as string[]
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null as File | null,
    weight: 0,
    color: '',
    categoryId: 0,
    brandId: 0,
    location: '',
    price: 0,
    phoneNumber: '',
    compatibleModels: [] as string[] // <--- CORRECTED TYPE HERE
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false); // For modal's internal loading (fetching brands/categories)
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission loading
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState(""); // For validation and submission errors in modal

  // Fetch brands and categories when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      fetchBrandsAndCategories();
      // Reset form when modal opens
      setFormData({
        name: '',
        description: '',
        image: null,
        weight: 0,
        color: '',
        categoryId: 0,
        brandId: 0,
        location: '',
        price: 0,
        phoneNumber: '',
        compatibleModels: [] as string[] // <--- CORRECTED TYPE FOR RESET TOO
      });
      setImagePreview(null);
      setFormError(""); // Clear previous errors
    }
  }, [isOpen]);

  const fetchBrandsAndCategories = async () => {
    setLoading(true);
    try {
      const [brandsResponse, categoriesResponse] = await Promise.all([
        axios.get<ApiResponse<Brand>>('https://inventoryapiv1-367404119922.asia-southeast1.run.app/Brand'),
        axios.get<ApiResponse<Category>>('https://inventoryapiv1-367404119922.asia-southeast1.run.app/Category')
      ]);
      
      setBrands(brandsResponse.data.data);
      setCategories(categoriesResponse.data.data);
    } catch (error) {
      console.error('Error fetching brands and categories:', error);
      setFormError('Failed to load necessary data for the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(""); // Clear previous errors
    setIsSubmitting(true); // Indicate submission in progress
    
    try {
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      
      if (!token) {
        setFormError('Authentication required. Please log in.');
        setIsSubmitting(false);
        return;
      }
      
      // Validate required fields (more robust checks)
      if (!formData.name.trim()) { setFormError('Name is required.'); setIsSubmitting(false); return; }
      if (!formData.description.trim()) { setFormError('Description is required.'); setIsSubmitting(false); return; }
      if (!formData.image) { setFormError('Image is required.'); setIsSubmitting(false); return; }
      if (formData.price <= 0) { setFormError('Price must be greater than 0.'); setIsSubmitting(false); return; }
      if (formData.weight <= 0) { setFormError('Weight must be greater than 0.'); setIsSubmitting(false); return; }
      if (!formData.color.trim()) { setFormError('Color is required.'); setIsSubmitting(false); return; }
      if (formData.categoryId === 0) { setFormError('Category is required.'); setIsSubmitting(false); return; }
      if (formData.brandId === 0) { setFormError('Brand is required.'); setIsSubmitting(false); return; }
      if (!formData.location.trim()) { setFormError('Location is required.'); setIsSubmitting(false); return; }

      // Validate phone number format
      const phoneRegex = /^[0-9]{9,10}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        setFormError('Please enter a valid 9 or 10-digit phone number.');
        setIsSubmitting(false);
        return;
      }

      // Create FormData matching the exact API requirements
      const formDataToSend = new FormData();
      formDataToSend.append('BrandId', formData.brandId.toString());
      formDataToSend.append('Color', formData.color.trim());
      formDataToSend.append('Price', formData.price.toString());
      formDataToSend.append('Name', formData.name.trim());
      formDataToSend.append('Location', formData.location.trim());
      formDataToSend.append('ReviewCount', '0'); // Assuming initial review count is 0
      formDataToSend.append('PhoneNumber', formData.phoneNumber);
      formDataToSend.append('Weight', formData.weight.toString());
      formDataToSend.append('CategoryId', formData.categoryId.toString());
      formDataToSend.append('Image', formData.image);
      formDataToSend.append('Description', formData.description.trim());
      formDataToSend.append('CompatibleModels', formData.compatibleModels.length > 0 ? formData.compatibleModels.join(',') : ''); // Send empty string if no models

      // Send POST request to create accessory with authorization
      const response = await axios.post(
        'https://inventoryapiv1-367404119922.asia-southeast1.run.app/Accessory',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      console.log('Accessory created successfully:', response.data);
      
      dispatch(fetchAccessories() as any); // Refresh the list after creation
      
      // Close modal and reset form
      onClose();
      // Form reset logic is now handled by the useEffect when modal opens
      
    } catch (error) {
      console.error('Error creating accessory:', error);
      
      if (axios.isAxiosError(error)) {
        setFormError(`Failed to create accessory: ${error.response?.data?.message || error.message}`);
      } else {
        setFormError('Failed to create accessory. An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight' || name === 'categoryId' || name === 'brandId' || name === 'price' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, image: null }));
      setImagePreview(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Increased max-w for better form spread on larger screens, added flex-col for mobile */}
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4"> {/* Added border-b for visual separation */}
            <h2 className="text-2xl font-bold text-gray-800">Create New Accessory</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-2 text-gray-600">Loading categories and brands...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && ( // Display form-level error
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              {/* Changed grid to default to 1 column on mobile, 2 on medium+ screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              {/* Changed grid to default to 1 column on mobile, 2 on medium+ screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="color">Color</label>
                  <input
                    type="text"
                    name="color"
                    id="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter 9-10 digit number"
                    pattern="[0-9]{9,10}"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              {/* Changed grid to default to 1 column on mobile, 2 on medium+ screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="categoryId">Category</label>
                  <select
                    name="categoryId"
                    id="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value={0}>Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="brandId">Brand</label>
                  <select
                    name="brandId"
                    id="brandId"
                    value={formData.brandId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value={0}>Select a brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md border border-gray-300"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="compatibleModels">Compatible Models (comma-separated)</label>
                <input
                  type="text"
                  name="compatibleModels"
                  id="compatibleModels"
                  value={formData.compatibleModels.join(',')}
                  onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      compatibleModels: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  }))}
                  placeholder="e.g., Tesla Model 3, Nissan Leaf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={formData.categoryId === 0 || formData.brandId === 0 || loading}
                >
                  {loading ? 'Creating...' : 'Create Accessory'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const AccessoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessories, filteredAccessories, filter, loading, error } = useSelector(
    (state: RootState) => state.accessories
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const R2_BUCKET_URL = "https://pub-133f8593b35749f28fa090bc33925b31.r2.dev";

  useEffect(() => {
    dispatch(fetchAccessories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilter());
  }, [filter, accessories, dispatch]); // Added accessories to dependency array

  const categories = [...new Set(accessories.map((item) => item.category))];
  const brands = [...new Set(accessories.map((item) => item.brand))];

  // Modified loading state to prevent full-page loader after initial load
  // And also display a message if no filtered accessories are found
  if (loading && accessories.length === 0) { 
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8"> {/* Added padding-bottom for mobile scrolling */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8"> {/* Adjusted padding for different screen sizes */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-10 text-gray-800"> {/* Responsive font size */}
          Discover EV Car Accessories
        </h1>
        
        {/* Post New Accessory Button */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 text-sm sm:text-base" /* Responsive padding and font size */
          >
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5" /* Responsive SVG size */
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            Post New Accessory
          </button>
        </div>
        
        {/* Accessories Filter component (now responsive) */}
        <AccessoriesFilter
          categories={categories}
          brands={brands}
          filter={filter}
          setFilter={(newFilter: Filter) => dispatch(setFilter(newFilter))}
        />
        
        {/* Main content grid */}
        {/* Conditional rendering for no accessories found */}
        {filteredAccessories.length === 0 && !loading && !error ? (
            <p className="text-center text-xl text-gray-600 mt-12">No accessories found matching your criteria.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-8"> {/* Adjusted gap and margin-top */}
            {filteredAccessories.map((item) => {
                const imageUrl = item.image.startsWith("http")
                ? item.image
                : `${R2_BUCKET_URL}/${item.image}`;

                return (
                <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100" /* Adjusted padding */
                >
                    <div className="relative w-full h-40 sm:h-48 mb-4"> {/* Responsive image height */}
                    <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="rounded-lg object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // More precise sizes attribute for Next/Image
                        onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = "/fallback-image.png"; // Ensure you have a fallback image
                        target.onerror = null;
                        }}
                    />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mt-4 mb-2 text-gray-900 line-clamp-2"> {/* Responsive font size */}
                    {item.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">Brand:</span> {item.brand}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                    <span className="font-semibold">Category:</span> {item.category}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                    <span className="font-semibold">SKU:</span> {item.sku}
                    </p>
                    <p className="text-xl sm:text-2xl font-extrabold text-blue-700 mb-4"> {/* Responsive font size */}
                    ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-center mt-auto mb-4 text-sm sm:text-base"> {/* Responsive font size */}
                        <span className="text-yellow-500 mr-1 font-semibold">{item.rating.toFixed(1)}</span>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${ // Responsive star size
                                    index < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm ml-2">({item.reviewCount} reviews)</span>
                    </div>
                    <Link href={`/accessories/${item.id}`} className="w-full">
                        <button className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:-translate-y-0.5 shadow-md text-sm sm:text-base">
                            View Details
                        </button>
                    </Link>
                </div>
                );
            })}
            </div>
        )}
        
        {/* Modal */}
        <CreateAccessoryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default AccessoriesPage;