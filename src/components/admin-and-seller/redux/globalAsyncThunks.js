import Api from "@/services/withoutAuthActivities/subcategories";
import Api1 from "@/services/withAuthActivities/subcategories";
import Api2 from "@/services/withAuthActivities/categories";
import Api3 from "@/services/withoutAuthActivities/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCategoriesFromServer = createAsyncThunk(
    "Global/getCategoriesFromServer",
    async ({ currentPage, itemsPerPage }) => {
        const { getAllCategories } = Api3
        return await getAllCategories({ page: currentPage, perPage: itemsPerPage })
    }
)

export const addCategoryToServer = createAsyncThunk(
    "Global/addCategoryToServer",
    async (obj) => {
        const { createCategories } = Api2
        return await createCategories(obj)
    }
)

export const getSubcategoriesFromServer = createAsyncThunk(
    "Global/getSubcategoriesFromServer",
    async ({ currentPage, itemsPerPage }) => {
        const { getAllSubcategories } = Api
        return await getAllSubcategories({ page: currentPage, perPage: itemsPerPage })
    }
)

export const addSubcategoryToServer = createAsyncThunk(
    "Global/addSubcategoryToServer",
    async (obj) => {
        const { createSubcategories } = Api1
        return await createSubcategories(obj)
    }
)