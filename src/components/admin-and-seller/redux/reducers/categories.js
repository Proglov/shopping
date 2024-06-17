import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@/services/withoutAuthActivities/categories";
import Api2 from "@/services/withAuthActivities/categories";

const initialState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    itemsCount: 0,
    itemsPerPage: 20
};

export const getCategoriesFromServer = createAsyncThunk(
    "Categories/getCategoriesFromServer",
    async (currentPage, itemsPerPage) => {
        const { getAllCategories } = Api
        return await getAllCategories({ page: currentPage, perPage: itemsPerPage })
    }
)

export const addCategoryToServer = createAsyncThunk(
    "Categories/addCategoryToServer",
    async (obj) => {
        const { createCategories } = Api2
        return await createCategories(obj)
    }
)

const categoriesSlice = createSlice({
    name: "Categories",
    initialState,
    reducers: {
        // Action to update categories state with fetched items
        setCategories(state, action) {
            state.items = action.payload;
        },

        // Action to handle errors
        setError(state, action) {
            state.error = action.payload;
        },

        // Action to update current page
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },

        // Action to update last page
        setLastPage(state, action) {
            state.lastPage = action.payload;
        },

        // Action to update items count
        setItemsCount(state, action) {
            state.itemsCount = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getCategoriesFromServer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getCategoriesFromServer.fulfilled, (state, action) => {
            state.items = action.payload.categories
            state.itemsCount = action.payload.allCategoriesCount
            state.lastPage = Math.ceil(action.payload?.allCategoriesCount / state.itemsPerPage)
            state.loading = false
        });
        builder.addCase(getCategoriesFromServer.rejected, (state, action) => {
            state.error = action.payload.message
            state.loading = false
        });
        builder.addCase(addCategoryToServer.fulfilled, (state, action) => {
            state.items.push(action.payload.category);
            state.itemsCount++;
        });
    }
});

export const { setCurrentPage } = categoriesSlice.actions;
export default categoriesSlice.reducer;
