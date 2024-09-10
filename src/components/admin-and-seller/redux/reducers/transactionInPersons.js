import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/services/withAuthActivities/userInPerson";
import Api2 from "@/services/withAuthActivities/product";
import Api3 from "@/services/withoutAuthActivities/product";

const initialState = {
    products: [],
    userInPersons: []
};

export const getUserInPersonsFromServer = createAsyncThunk(
    "TransactionsInPerson/getUserInPersonsFromServer",
    async (which) => {
        const { getAllMyUserInPersons, getAllUserInPersons } = Api
        if (which === "Seller")
            return await getAllMyUserInPersons()
        return await getAllUserInPersons()
    }
)

export const getProductsFromServer = createAsyncThunk(
    "TransactionsInPerson/getProductsFromServer",
    async (which) => {
        const { getAllMyProducts } = Api2
        const { getAllProducts } = Api3
        if (which === "Seller")
            return await getAllMyProducts()
        return await getAllProducts()
    }
)

const transactionsInPersonSlice = createSlice({
    name: "TransactionsInPerson",
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getProductsFromServer.fulfilled, (state, action) => {
            state.products = action.payload.products
        });
        builder.addCase(getUserInPersonsFromServer.fulfilled, (state, action) => {
            state.userInPersons = action.payload.users
            console.log(action.payload);
        });
    }
});

export default transactionsInPersonSlice.reducer;
