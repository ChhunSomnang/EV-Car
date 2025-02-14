import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for the accessories and filter state
export interface Accessory {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  rating: number;
  image: string;
}

export interface Filter {
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
  }

interface AccessoriesState {
  accessories: Accessory[];
  filteredAccessories: Accessory[];
  filter: Filter;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AccessoriesState = {
  accessories: [],
  filteredAccessories: [],
  filter: {
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: Infinity,
  },
  loading: false,
  error: null,
};

// Create the async thunk for fetching accessories
export const fetchAccessories = createAsyncThunk(
  "accessories/fetchAccessories",
  async (token: string) => {
    const response = await axios.get(
      "https://inventoryapi-367404119922.asia-southeast1.run.app/Accessory",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.weight, // If price is weight, change this to price if needed
      brand: item.brand,
      rating: item.rating,
      image: item.image, // Image is the object key (filename) in R2
    }));
  }
);

const accessoriesSlice = createSlice({
  name: "accessories",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    applyFilter: (state) => {
      const { category, brand, minPrice, maxPrice } = state.filter;
      const filtered = state.accessories.filter((item) => {
        const isCategoryMatch = category ? item.category === category : true;
        const isBrandMatch = brand ? item.brand === brand : true;
        const isPriceMatch = item.price >= minPrice && item.price <= maxPrice;
        return isCategoryMatch && isBrandMatch && isPriceMatch;
      });
      state.filteredAccessories = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccessories.fulfilled, (state, action) => {
        state.loading = false;
        state.accessories = action.payload;
        state.filteredAccessories = action.payload;
      })
      .addCase(fetchAccessories.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error fetching accessories.";
      });
  },
});

export const { setFilter, applyFilter } = accessoriesSlice.actions;

export default accessoriesSlice.reducer;
