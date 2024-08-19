import Api from "@/services/withAuthActivities/product";
import Api2 from "@/services/withAuthActivities/discounts/companyCouponForSomeProducts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: {},
    isModalDeleteOpen: false,
    isModalShowMoreOpen: false,
    isShowMoreLoading: false,
    operatingError: '',
    products: [],
    showMoreProducts: []
};

export const getProductsFromServer = createAsyncThunk(
    "CompanyCouponForSomeProducts/getProductsFromServer",
    async () => {
        const { getAllMyProducts } = Api
        return await getAllMyProducts()
    }
)

export const getShowMoreProductsFromServer = createAsyncThunk(
    "CompanyCouponForSomeProducts/getShowMoreProductsFromServer",
    async (id) => {
        const { GetProductsOfOneCompanyCouponForSomeProducts } = Api2
        return await GetProductsOfOneCompanyCouponForSomeProducts(id)
    }
)

const companyCouponForSomeProductsSlice = createSlice({
    name: "CompanyCouponForSomeProducts",
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
        setIsModalShowMoreOpen(state, action) {
            state.isModalShowMoreOpen = action.payload
        },
        setOperatingError(state, action) {
            state.operatingError = action.payload
        },
        setProducts(state, action) {
            state.products = action.payload
        },
        setShowMoreProducts(state, action) {
            state.showMoreProducts = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getProductsFromServer.fulfilled, (state, action) => {
            state.products = action.payload.products
        });
        builder.addCase(getShowMoreProductsFromServer.pending, (state) => {
            state.isShowMoreLoading = true
        });
        builder.addCase(getShowMoreProductsFromServer.fulfilled, (state, action) => {
            state.showMoreProducts = action.payload.products
            state.isShowMoreLoading = false
        });
        builder.addCase(getShowMoreProductsFromServer.rejected, (state) => {
            state.isShowMoreLoading = false
        });
    }
});

export const { setIsModalDeleteOpen, setOperatingError, setProducts, setSelectedItem, setIsModalShowMoreOpen, setShowMoreProducts } = companyCouponForSomeProductsSlice.actions;
export default companyCouponForSomeProductsSlice.reducer;
