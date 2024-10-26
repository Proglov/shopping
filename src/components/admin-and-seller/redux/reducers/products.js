import Api from "@/services/withoutAuthActivities/subcategories";
import Api2 from "@/services/withAuthActivities/warehouse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: {},
    isModalEditOpen: false,
    operatingError: '',
    categories: [],
    warehouses: [],
};

export const getCategoriesFromServer = createAsyncThunk(
    "Products/getCategoriesFromServer",
    async () => {
        //we get all subcategories and then, extract the categories
        const { getAllSubcategories } = Api
        return await getAllSubcategories()
    }
)

export const getWarehousesFromServer = createAsyncThunk(
    "Products/getWarehousesFromServer",
    async (which) => {
        const { getAllMyWarehouses, getAllWarehouses } = Api2
        if (which === "Seller")
            return await getAllMyWarehouses()
        return await getAllWarehouses()
    }
)

const productsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setSelectedItem(state, action) {
            if (typeof action.payload === "function")
                state.selectedItem = action.payload(state.selectedItem)
            else
                state.selectedItem = action.payload
        },
        setIsModalEditOpen(state, action) {
            state.isModalEditOpen = action.payload
        },
        setOperatingError(state, action) {
            state.operatingError = action.payload
        },
        setCategories(state, action) {
            state.categories = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getCategoriesFromServer.fulfilled, (state, action) => {
            //we get all subcategories and then, extract the categories
            const allCategories = action.payload.subcategories.reduce((acc, curr) => {
                const existingCategory = acc.find(item => item.categoryId === curr.categoryId._id);

                if (existingCategory) {
                    existingCategory.subcategories.push({
                        subcategoryId: curr._id,
                        subcategoryName: curr.name
                    });
                } else {
                    acc.push({
                        categoryId: curr.categoryId._id,
                        categoryName: curr.categoryId.name,
                        subcategories: [{
                            subcategoryId: curr._id,
                            subcategoryName: curr.name
                        }]
                    });
                }

                return acc;
            }, []);
            state.categories = allCategories
        });
        builder.addCase(getWarehousesFromServer.fulfilled, (state, action) => {
            state.warehouses = action.payload.warehouses
        });
    }
});

export const { setIsModalEditOpen, setOperatingError, setSelectedItem, setCategories } = productsSlice.actions;
export default productsSlice.reducer;
