import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "@/services/withoutAuthActivities/product";

const initialState = [{}];

export const fetchProducts = createAsyncThunk(
  "Products/fetchProducts",
  async () => {
    const response = await ProductApi.getAllProducts();
    return response.products;
  }
);

export const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state = action.payload;
      console.log(action.payload);
    });
  },
});

export default ProductsSlice.reducer;
