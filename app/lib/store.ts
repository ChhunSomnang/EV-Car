import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/store/cartSlice';
import productReducer from "./features/productSlice";
import accessoriesReducer from './features/accessoriesSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    accessories: accessoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;