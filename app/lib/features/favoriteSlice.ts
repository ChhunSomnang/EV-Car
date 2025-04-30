import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  selectedProducts: string[];
}

const defaultState: FavoriteState = {
  selectedProducts: []
};

const loadState = (): FavoriteState => {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  try {
    const savedState = localStorage.getItem('favoriteProducts');
    if (!savedState) {
      return defaultState;
    }

    const parsedState = JSON.parse(savedState);
    if (!Array.isArray(parsedState)) {
      return defaultState;
    }

    return {
      selectedProducts: parsedState
    };
  } catch (error) {
    console.error('Failed to load favorite products:', error);
    return defaultState;
  }
};

const saveState = (selectedProducts: string[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteProducts', JSON.stringify(selectedProducts));
    }
  } catch (error) {
    console.error('Failed to save favorite products:', error);
  }
};

const initialState: FavoriteState = loadState();

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProductToFavorite: (state, action: PayloadAction<string>) => {
      if (!state.selectedProducts.includes(action.payload)) {
        state.selectedProducts.push(action.payload);
        saveState(state.selectedProducts);
      }
    },
    removeProductFromFavorite: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter(
        (id) => id !== action.payload
      );
      saveState(state.selectedProducts);
    },
    clearFavorites: (state) => {
      state.selectedProducts = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('favoriteProducts');
      }
    },
  },
});

export const {
  addProductToFavorite,
  removeProductFromFavorite,
  clearFavorites,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;