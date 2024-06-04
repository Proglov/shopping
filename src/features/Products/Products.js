import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "@/services/withoutAuthActivities/product";

const initialState = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "Products/fetchProducts",
  async () => {
    try {
      let response = await ProductApi.getAllProducts();
      response = response.products.map((item) => {
        if (item.imagesUrl.length == 0) {
          return {
            ...item,
            imagesUrl: [
              "/img/home/category-labaniat.jpg",
              "/img/home/tanagholat.jpg",
            ],
          };
        }
        return item;
      });
      return response;
    } catch (error) {
      alert(error.response.data.message);
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
