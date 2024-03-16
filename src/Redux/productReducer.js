import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Use camelCase for consistency with other keys
};

const productSlice = createSlice({
  name: "product", // Corrected the slice name to be singular for better convention
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload; // Corrected the assignment to state.products
    },
  },
});

export const { setProducts } = productSlice.actions; // Corrected the exported action name
export default productSlice.reducer;
