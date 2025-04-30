import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchAccessories = createAsyncThunk(
  "accessories/fetchAccessories",
  async () => {
    const response = await axios.get("/accessories.json");
    return response.data;
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