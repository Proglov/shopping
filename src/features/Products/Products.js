import { createSlice } from "@reduxjs/toolkit";
import productApi from "@/services/withoutAuthActivities/product";

const initialState = productApi.getAllProducts();

export const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
});

export default ProductsSlice.reducer;
