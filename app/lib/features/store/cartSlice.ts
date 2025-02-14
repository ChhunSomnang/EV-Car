import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  title?: string;
  brand?: string;
  model?: string;
  year?: string;
  color?: string;
  fuel?: string;
  bodyType?: string;
  discount?: string;
  salePrice?: string;
  description?: string;
  location?: string;
  address?: string;
  name: string;
  phone?: string;
  email?: string;
  freeDelivery?: boolean;
  taxType?: "taxPaper" | "plateNumber" | null;
  condition?: "new" | "used" | null;
  transmission?: "auto" | "manual" | null;
  price: number;
}

interface Store {
  id: string;
  name: string;
  location: string;
  products: Product[];
}

interface CartState {
  items: Product[];
  stores: Store[];
}

const initialState: CartState = {
  items: [],
  stores: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<Product, "id"> & { id: string | number }>) => {
      state.items.push({ 
        ...action.payload, 
        id: String(action.payload.id), // Convert id to string
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
  },
});

export const { addToCart, removeFromCart, addStore } = cartSlice.actions;
export default cartSlice.reducer;
