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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
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

    // Access the 'data' array instead of 'allcars'
    return response.data.data.map((car: any) => ({
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
  } catch (error: any) {
    console.error("API Error:", error.response?.status, error.response?.data);
    return thunkAPI.rejectWithValue(error.response?.data || "API request failed");
  }
});



const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
