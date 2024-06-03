import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "@/services/withoutAuthActivities/product";

const initialState = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "Products/fetchProducts",
  async (err) => {
    try {
      const response = await ProductApi.getAllProducts();
      return response.products;
    } catch (error) {
      err(error.response.data.message);
    }
  }
);

export const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      console.log(action.payload);
    });
  },
});

export default ProductsSlice.reducer;
