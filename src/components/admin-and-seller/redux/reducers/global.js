import { createSlice } from "@reduxjs/toolkit";
import { addCategoryToServer, addSubcategoryToServer, getCategoriesFromServer, getSubcategoriesFromServer } from "../globalAsyncThunks";
import { getCategoryPending, getCategoryFulfilled, getCategoryReject, addCategoryFulfilled, addSubcategoriesFulfilled, getSubcategoriesFulfilled, getSubcategoriesPending, getSubcategoriesReject } from "../globalExtraReducers";


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
            state.items.push(action.payload)
            state.itemsCount++;
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
        builder.addCase(getCategoriesFromServer.pending, getCategoryPending);
        builder.addCase(getCategoriesFromServer.fulfilled, getCategoryFulfilled);
        builder.addCase(getCategoriesFromServer.rejected, getCategoryReject);
        builder.addCase(addCategoryToServer.fulfilled, addCategoryFulfilled);

        // subcategories
        builder.addCase(getSubcategoriesFromServer.pending, getSubcategoriesPending);
        builder.addCase(getSubcategoriesFromServer.fulfilled, getSubcategoriesFulfilled);
        builder.addCase(getSubcategoriesFromServer.rejected, getSubcategoriesReject);
        builder.addCase(addSubcategoryToServer.fulfilled, addSubcategoriesFulfilled);
    }
});

export const { setItems, addItem, removeItem, setLoading, setError, setCurrentPage, setLastPage, setItemsCount, resetToInitialState } = globalSlice.actions;

export default globalSlice.reducer;