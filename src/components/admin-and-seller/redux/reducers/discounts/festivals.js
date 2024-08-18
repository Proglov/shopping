import Api from "@/services/withAuthActivities/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: {},
    isModalDeleteOpen: false,
    operatingError: '',
    products: []
};

export const getProductsFromServer = createAsyncThunk(
    "Products/getProductsFromServer",
    async () => {
        const { getAllMyProducts } = Api
        return await getAllMyProducts()
    }
)

const festivalsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setSelectedItem(state, action) {
            if (typeof action.payload === "function")
                state.selectedItem = action.payload(state.selectedItem)
            else
                state.selectedItem = action.payload
        },
        setIsModalDeleteOpen(state, action) {
            state.isModalDeleteOpen = action.payload
        },
        setOperatingError(state, action) {
            state.operatingError = action.payload
        },
        setProducts(state, action) {
            state.products = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getProductsFromServer.fulfilled, (state, action) => {
            state.products = action.payload.products
        });
    }
});

export const { setIsModalDeleteOpen, setOperatingError, setProducts, setSelectedItem } = festivalsSlice.actions;
export default festivalsSlice.reducer;
