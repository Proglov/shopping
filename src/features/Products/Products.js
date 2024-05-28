import { createSlice } from "@reduxjs/toolkit";
import ProductApi from "@/services/withoutAuthActivities/product";

const initialState = ProductApi.getAllProducts();

export const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
});

export default ProductsSlice.reducer;
