import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api3 from "@/services/withoutAuthActivities/categories";

const initialState = {
    categories: []
};

export const getCategoriesFromServer = createAsyncThunk(
    "Subcategories/getCategoriesFromServer",
    async () => {
        const { getAllCategories } = Api3
        return await getAllCategories()
    }
)

const subcategoriesSlice = createSlice({
    name: "Subcategories",
    initialState,
    reducers: {
        addCategory(state, action) {
            state.categories = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getCategoriesFromServer.fulfilled, (state, action) => {
            state.categories = action.payload.categories
        });
    }
});

export default subcategoriesSlice.reducer;
