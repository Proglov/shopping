import Api from "@/services/withAuthActivities/product";
import Api2 from "@/services/withoutAuthActivities/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: {},
    isModalDeleteOpen: false,
    operatingError: '',
    products: []
};

export const getProductsFromServer = createAsyncThunk(
    "MajorShopping/getProductsFromServer",
    async (which) => {
        const { getAllMyProducts } = Api
        const { getAllProducts } = Api2
        if (which === 'ADMIN')
            return await getAllProducts()
        return await getAllMyProducts()
    }
)

const MajorShoppingsSlice = createSlice({
    name: "MajorShopping",
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

export const { setIsModalDeleteOpen, setOperatingError, setProducts, setSelectedItem } = MajorShoppingsSlice.actions;
export default MajorShoppingsSlice.reducer;
