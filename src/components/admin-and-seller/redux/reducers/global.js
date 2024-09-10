import { createSlice } from "@reduxjs/toolkit";
import { addCategoryToServer, addProductToServer, addSubcategoryToServer, getCategoriesFromServer, getSubcategoriesFromServer, updateProductFromServer, getUsersFromServer, deleteUserFromServer, getInvalidatedSellersFromServer, deleteSellerFromServer, validateSellerToServer, getInvalidatedCommentsFromServer, deleteCommentFromServer, validateCommentToServer, getFutureTXsFromServer, updateTXStatusToServer, toggleAvailabilityProduct, GetFestivalProductsFromServer, getProductsFromServer, addFestivalToServer, deleteFestivalFromServer, GetMajorShoppingProductsFromServer, addMajorShoppingToServer, deleteMajorShoppingFromServer, GetCompanyCouponForSomeProductsProductsFromServer, addCompanyCouponForSomeProductsToServer, deleteCompanyCouponForSomeProductsFromServer, getUserInPersonsFromServer, addUserInPersonToServer } from "../globalAsyncThunks";
import { getCategoryFulfilled, addCategoryFulfilled, addSubcategoriesFulfilled, getSubcategoriesFulfilled, getProductsFulfilled, addProductsFulfilled, pending, reject, updateProductFulfilled, getUsersFulfilled, deleteUserFulfilled, getInvalidatedSellersFulfilled, deleteSellerFulfilled, validateSellerFulfilled, getInvalidatedCommentsFulfilled, validateCommentFulfilled, deleteCommentFulfilled, getFutureTXsFulfilled, updateTXStatusFulfilled, toggleAvailabilityProductFulfilled, GetFestivalProductsFulfilled, addFestivalFulfilled, deleteFestivalFulfilled, deleteMajorShoppingFulfilled, addMajorShoppingFulfilled, GetMajorShoppingProductsFulfilled, addDataPending, GetCompanyCouponForSomeProductsProductsFulfilled, addCompanyCouponForSomeProductsFulfilled, deleteCompanyCouponForSomeProductsFulfilled, getUserInPersonsFulfilled, addUserInPersonFulfilled } from "../globalExtraReducers";


const initialState = {
    items: [],
    addDataLoading: false, //used for creating data
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
        setAddDataLoading(state, action) {
            state.addDataLoading = action.payload
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
        setItemsCount(state, action) {
            state.itemsCount = action.payload
        },
        resetToInitialState() {
            return initialState
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
        builder.addCase(getProductsFromServer.pending, pending);
        builder.addCase(getProductsFromServer.fulfilled, getProductsFulfilled);
        builder.addCase(getProductsFromServer.rejected, reject);
        builder.addCase(addProductToServer.pending, addDataPending);
        builder.addCase(addProductToServer.fulfilled, addProductsFulfilled);
        builder.addCase(toggleAvailabilityProduct.fulfilled, toggleAvailabilityProductFulfilled);
        builder.addCase(updateProductFromServer.fulfilled, updateProductFulfilled);

        //users
        builder.addCase(getUsersFromServer.pending, pending);
        builder.addCase(getUsersFromServer.fulfilled, getUsersFulfilled);
        builder.addCase(getUsersFromServer.rejected, reject);
        builder.addCase(deleteUserFromServer.fulfilled, deleteUserFulfilled);

        // UserInPersons
        builder.addCase(getUserInPersonsFromServer.pending, pending);
        builder.addCase(getUserInPersonsFromServer.fulfilled, getUserInPersonsFulfilled);
        builder.addCase(getUserInPersonsFromServer.rejected, reject);
        builder.addCase(addUserInPersonToServer.pending, addDataPending);
        builder.addCase(addUserInPersonToServer.fulfilled, addUserInPersonFulfilled);

        //sellers
        builder.addCase(getInvalidatedSellersFromServer.pending, pending);
        builder.addCase(getInvalidatedSellersFromServer.fulfilled, getInvalidatedSellersFulfilled);
        builder.addCase(getInvalidatedSellersFromServer.rejected, reject);
        builder.addCase(deleteSellerFromServer.fulfilled, deleteSellerFulfilled);
        builder.addCase(validateSellerToServer.fulfilled, validateSellerFulfilled);

        //comments
        builder.addCase(getInvalidatedCommentsFromServer.pending, pending);
        builder.addCase(getInvalidatedCommentsFromServer.fulfilled, getInvalidatedCommentsFulfilled);
        builder.addCase(getInvalidatedCommentsFromServer.rejected, reject);
        builder.addCase(deleteCommentFromServer.fulfilled, deleteCommentFulfilled);
        builder.addCase(validateCommentToServer.fulfilled, validateCommentFulfilled);

        //tx
        builder.addCase(getFutureTXsFromServer.pending, pending);
        builder.addCase(getFutureTXsFromServer.fulfilled, getFutureTXsFulfilled);
        builder.addCase(getFutureTXsFromServer.rejected, reject);
        builder.addCase(updateTXStatusToServer.fulfilled, updateTXStatusFulfilled);

        //festivals
        builder.addCase(GetFestivalProductsFromServer.pending, pending);
        builder.addCase(GetFestivalProductsFromServer.fulfilled, GetFestivalProductsFulfilled);
        builder.addCase(GetFestivalProductsFromServer.rejected, reject);
        builder.addCase(addFestivalToServer.fulfilled, addFestivalFulfilled);
        builder.addCase(addFestivalToServer.pending, addDataPending);
        builder.addCase(addFestivalToServer.rejected, reject);
        builder.addCase(deleteFestivalFromServer.fulfilled, deleteFestivalFulfilled);

        //majorShoppings
        builder.addCase(GetMajorShoppingProductsFromServer.pending, pending);
        builder.addCase(GetMajorShoppingProductsFromServer.fulfilled, GetMajorShoppingProductsFulfilled);
        builder.addCase(GetMajorShoppingProductsFromServer.rejected, reject);
        builder.addCase(addMajorShoppingToServer.fulfilled, addMajorShoppingFulfilled);
        builder.addCase(addMajorShoppingToServer.pending, addDataPending);
        builder.addCase(addMajorShoppingToServer.rejected, reject);
        builder.addCase(deleteMajorShoppingFromServer.fulfilled, deleteMajorShoppingFulfilled);

        //companyCouponForSomeProducts
        builder.addCase(GetCompanyCouponForSomeProductsProductsFromServer.pending, pending);
        builder.addCase(GetCompanyCouponForSomeProductsProductsFromServer.fulfilled, GetCompanyCouponForSomeProductsProductsFulfilled);
        builder.addCase(GetCompanyCouponForSomeProductsProductsFromServer.rejected, reject);
        builder.addCase(addCompanyCouponForSomeProductsToServer.fulfilled, addCompanyCouponForSomeProductsFulfilled);
        builder.addCase(addCompanyCouponForSomeProductsToServer.pending, addDataPending);
        builder.addCase(addCompanyCouponForSomeProductsToServer.rejected, reject);
        builder.addCase(deleteCompanyCouponForSomeProductsFromServer.fulfilled, deleteCompanyCouponForSomeProductsFulfilled);
    }
});

export const { setItems, addItem, removeItem, setLoading, setError, setCurrentPage, setItemsCount, resetToInitialState, setAddDataLoading } = globalSlice.actions;

export default globalSlice.reducer;