import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  eCurrencyType: string;
  isFeatured: boolean;
  location: string;
  model: string;
  color: string;
  condition: string;
  categoryId: number;
  category: string;
  brandId: number;
  brand: string;
  skuId: number;
  sku: string;
}

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  selectedBrands: string[];
  selectedConditions: string[];
  minPrice?: number;
  maxPrice?: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  selectedBrands: [],
  selectedConditions: [],
  minPrice: undefined,
  maxPrice: undefined,
  status: "idle",
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetch", async (_, thunkAPI) => {
  try {
    const token = process.env.NEXT_PUBLIC_API_TOKEN; // Use environment variable
    const response = await axios.get(
      "https://inventoryapi-367404119922.asia-southeast1.run.app/Product",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const products = response.data.data.map((car: any) => ({
      id: car.id,
      title: car.title,
      description: car.description,
      price: car.price,
      image: car.image,
      eCurrencyType: car.eCurrencyType,
      isFeatured: car.isFeatured,
      location: car.location,
      model: car.model,
      color: car.color,
      condition: car.condition,
      categoryId: car.categoryId,
      category: car.category,
      brandId: car.brandId,
      brand: car.brand,
      skuId: car.skuId,
      sku: car.sku,
    }));

    return products;
  } catch (error: any) {
    const errorMessage = error.response?.data || "API request failed";
    console.error("API Error:", error.response?.status, error.response?.data);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<string[]>) => {
      state.selectedBrands = action.payload;
    },
    setConditions: (state, action: PayloadAction<string[]>) => {
      state.selectedConditions = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | undefined>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.selectedBrands = [];
      state.selectedConditions = [];
      state.minPrice = undefined;
      state.maxPrice = undefined;
      state.filteredItems = state.items; // Reset to all products
    },
    applyFilters: (state) => {
      let filtered = state.items;

      // Apply selected brand filter
      if (state.selectedBrands.length > 0) {
        filtered = filtered.filter((item) => state.selectedBrands.includes(item.brand));
      }

      // Apply selected condition filter
      if (state.selectedConditions.length > 0) {
        filtered = filtered.filter((item) => state.selectedConditions.includes(item.condition));
      }

      // Apply price filters if defined
      if (state.minPrice !== undefined) {
        filtered = filtered.filter((item) => item.price >= (state.minPrice ?? 0)); // Default to 0 if undefined
      }

      if (state.maxPrice !== undefined) {
        filtered = filtered.filter((item) => item.price <= (state.maxPrice ?? Infinity)); // Default to Infinity if undefined
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

export const { setBrands, setConditions, setMinPrice, setMaxPrice, resetFilters, applyFilters } = productSlice.actions;
export default productSlice.reducer;
