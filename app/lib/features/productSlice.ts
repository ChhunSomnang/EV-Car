import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Product interface based on the provided JSON structure
export interface Product {
  properties: any;
  productType: string;
  code: string;
  manufacturerPartNumber: string;
  gtin: string;
  name: string;
  catalogId: string;
  categoryId: string;
  outline: string;
  path: string;
  titularItemId: string;
  mainProductId: string;
  isActive: boolean;
  isBuyable: boolean;
  trackInventory: boolean;
  indexingDate: string; // Assuming ISO date format
  maxQuantity: number;
  minQuantity: number;
  packSize: number;
  startDate: string; // Assuming ISO date format
  endDate: string; // Assuming ISO date format
  packageType: string;
  weightUnit: string;
  weight: number;
  measureUnit: string;
  height: number;
  length: number;
  width: number;
  enableReview: boolean;
  maxNumberOfDownload: number;
  downloadExpiration: string; // Assuming ISO date format
  downloadType: string;
  hasUserAgreement: boolean;
  shippingType: string;
  taxType: string;
  vendor: string;
  priority: number;
  outerId: string;
  imgSrc: string;
  id: string;
}

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  selectedVendors: string[]; // Updated for filtering by vendor
  selectedCategories: string[]; // Updated for filtering by category
  minPrice?: number;
  maxPrice?: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  selectedVendors: [],
  selectedCategories: [],
  minPrice: undefined,
  maxPrice: undefined,
  status: "idle",
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetch", async (_, thunkAPI) => {
  try {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;

    // Validate API token
    if (!token) {
      throw new Error("API token is missing. Please check your environment variables.");
    }

    // Fetch data from the API
    const response = await axios.get("/product.json", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Map the API response to the Product interface
    const products = response.data.map((car: any) => ({
      productType: car.productType,
      code: car.code,
      manufacturerPartNumber: car.manufacturerPartNumber,
      gtin: car.gtin,
      name: car.name,
      catalogId: car.catalogId,
      categoryId: car.categoryId,
      outline: car.outline,
      path: car.path,
      titularItemId: car.titularItemId,
      mainProductId: car.mainProductId,
      isActive: car.isActive,
      isBuyable: car.isBuyable,
      trackInventory: car.trackInventory,
      indexingDate: car.indexingDate,
      maxQuantity: car.maxQuantity,
      minQuantity: car.minQuantity,
      packSize: car.packSize,
      startDate: car.startDate,
      endDate: car.endDate,
      packageType: car.packageType,
      weightUnit: car.weightUnit,
      weight: car.weight,
      measureUnit: car.measureUnit,
      height: car.height,
      length: car.length,
      width: car.width,
      enableReview: car.enableReview,
      maxNumberOfDownload: car.maxNumberOfDownload,
      downloadExpiration: car.downloadExpiration,
      downloadType: car.downloadType,
      hasUserAgreement: car.hasUserAgreement,
      shippingType: car.shippingType,
      taxType: car.taxType,
      vendor: car.vendor,
      priority: car.priority,
      outerId: car.outerId,
      imgSrc: car.imgSrc,
      id: car.id,
    }));

    return products;
  } catch (error: any) {
    let errorMessage;

    // Handle network errors or CORS issues
    if (!error.response) {
      errorMessage = error.message || "Network error or invalid API endpoint.";
    } else {
      // Handle server-side errors with a valid response
      errorMessage = error.response?.data?.message || error.response?.data || "API request failed";
    }

    console.error("API Error:", errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setVendors: (state, action: PayloadAction<string[]>) => {
      state.selectedVendors = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | undefined>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.selectedVendors = [];
      state.selectedCategories = [];
      state.minPrice = undefined;
      state.maxPrice = undefined;
      state.filteredItems = state.items; // Reset to all products
    },
    applyFilters: (state) => {
      let filtered = state.items;

      // Apply selected vendor filter
      if (state.selectedVendors.length > 0) {
        filtered = filtered.filter((item) => state.selectedVendors.includes(item.vendor));
      }

      // Apply selected category filter
      if (state.selectedCategories.length > 0) {
        filtered = filtered.filter((item) => state.selectedCategories.includes(item.categoryId));
      }

      // Apply price filters if defined
      if (state.minPrice !== undefined) {
        filtered = filtered.filter((item) => item.weight >= (state.minPrice ?? 0)); // Example using weight as "price"
      }

      if (state.maxPrice !== undefined) {
        filtered = filtered.filter((item) => item.weight <= (state.maxPrice ?? Infinity)); // Example using weight as "price"
      }

      // Debugging log for filtered items
      console.log("Filtered Products:", filtered);

      state.filteredItems = filtered; // Update filteredItems
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload; // Initialize filteredItems with all products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setVendors, setCategories, setMinPrice, setMaxPrice, resetFilters, applyFilters } =
  productSlice.actions;

export default productSlice.reducer;