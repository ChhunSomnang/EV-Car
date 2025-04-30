import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompareState {
  selectedProducts: string[];
}

const loadState = (): CompareState => {
  if (typeof window === 'undefined') {
    return { selectedProducts: [] };
  }

  try {
    const savedProducts = localStorage.getItem('compareProducts');
    return {
      selectedProducts: savedProducts ? JSON.parse(savedProducts) : []
    };
  } catch (err) {
    console.error('Failed to load compare products:', err);
    return { selectedProducts: [] };
  }
};

const saveState = (selectedProducts: string[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('compareProducts', JSON.stringify(selectedProducts));
    } catch (err) {
      console.error('Failed to save compare products:', err);
    }
  }
};

const initialState: CompareState = loadState();

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addProductToCompare: (state, action: PayloadAction<string>) => {
      if (!state.selectedProducts.includes(action.payload)) {
        state.selectedProducts.push(action.payload);
        saveState(state.selectedProducts);
      }
    },
    removeProductFromCompare: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter(
        (id) => id !== action.payload
      );
      saveState(state.selectedProducts);
    },
    clearCompareList: (state) => {
      state.selectedProducts = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('compareProducts');
      }
    },
  },
});

export const {
  addProductToCompare,
  removeProductFromCompare,
  clearCompareList,
} = compareSlice.actions;

export default compareSlice.reducer;