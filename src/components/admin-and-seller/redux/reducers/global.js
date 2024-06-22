import { createSlice } from "@reduxjs/toolkit";
import { addCategoryToServer, addProductToServer, addSubcategoryToServer, getCategoriesFromServer, getAdminProductsFromServer, getSellerProductsFromServer, getSubcategoriesFromServer, deleteProductFromServer, updateProductFromServer, getUsersFromServer, deleteUserFromServer, getInvalidatedSellersFromServer, deleteSellerFromServer, validateSellerToServer } from "../globalAsyncThunks";
import { getCategoryFulfilled, addCategoryFulfilled, addSubcategoriesFulfilled, getSubcategoriesFulfilled, getProductsFulfilled, addProductsFulfilled, deleteProductFulfilled, pending, reject, updateProductFulfilled, getUsersFulfilled, deleteUserFulfilled, getInvalidatedSellersFulfilled, deleteSellerFulfilled, validateSellerFulfilled } from "../globalExtraReducers";


const initialState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    itemsCount: 0,
    itemsPerPage: 20
};


const globalSlice = createSlice({
    name: "Global",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
        addItem(state, action) {
            state.items.unshift(action.payload)
            state.itemsCount++;
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item[action.payload.key] !== action.payload.value)
            state.itemsCount--;
        },
        removeItem(state, action) {
            state.items.filter(item => item[action.payload.key] !== action.payload.value)
            state.itemsCount--;
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setCurrentPage(state, action) {
            const { payload } = action

            if (typeof payload === "number") state.currentPage = action.payload;
            else
                switch (payload) {
                    case "INC":
                        state.currentPage++;
                        break;
                    case "DEC":
                        state.currentPage--;
                        break;
                }
        },
        setLastPage(state, action) {
            state.lastPage = Math.ceil(action.payload / state.itemsPerPage)
        },
        setItemsCount(state, action) {
            state.itemsCount = action.payload
        },
        resetToInitialState(state) {
            state = initialState
        }
    },
    extraReducers: builder => {

        // categories
        builder.addCase(getCategoriesFromServer.pending, pending);
        builder.addCase(getCategoriesFromServer.fulfilled, getCategoryFulfilled);
        builder.addCase(getCategoriesFromServer.rejected, reject);
        builder.addCase(addCategoryToServer.fulfilled, addCategoryFulfilled);

        // subcategories
        builder.addCase(getSubcategoriesFromServer.pending, pending);
        builder.addCase(getSubcategoriesFromServer.fulfilled, getSubcategoriesFulfilled);
        builder.addCase(getSubcategoriesFromServer.rejected, reject);
        builder.addCase(addSubcategoryToServer.fulfilled, addSubcategoriesFulfilled);

        // products
        builder.addCase(getAdminProductsFromServer.pending, pending);
        builder.addCase(getAdminProductsFromServer.fulfilled, getProductsFulfilled);
        builder.addCase(getAdminProductsFromServer.rejected, reject);
        builder.addCase(getSellerProductsFromServer.pending, pending);
        builder.addCase(getSellerProductsFromServer.fulfilled, getProductsFulfilled);
        builder.addCase(getSellerProductsFromServer.rejected, reject);
        builder.addCase(addProductToServer.fulfilled, addProductsFulfilled);
        builder.addCase(deleteProductFromServer.fulfilled, deleteProductFulfilled);
        builder.addCase(updateProductFromServer.fulfilled, updateProductFulfilled);

        //users
        builder.addCase(getUsersFromServer.pending, pending);
        builder.addCase(getUsersFromServer.fulfilled, getUsersFulfilled);
        builder.addCase(getUsersFromServer.rejected, reject);
        builder.addCase(deleteUserFromServer.fulfilled, deleteUserFulfilled);

        //sellers
        builder.addCase(getInvalidatedSellersFromServer.pending, pending);
        builder.addCase(getInvalidatedSellersFromServer.fulfilled, getInvalidatedSellersFulfilled);
        builder.addCase(getInvalidatedSellersFromServer.rejected, reject);
        builder.addCase(deleteSellerFromServer.fulfilled, deleteSellerFulfilled);
        builder.addCase(validateSellerToServer.fulfilled, validateSellerFulfilled);

    }
});

export const { setItems, addItem, removeItem, setLoading, setError, setCurrentPage, setLastPage, setItemsCount, resetToInitialState } = globalSlice.actions;

export default globalSlice.reducer;