import Api from "@/services/withoutAuthActivities/subcategories";
import Api1 from "@/services/withAuthActivities/subcategories";
import Api2 from "@/services/withAuthActivities/categories";
import Api3 from "@/services/withoutAuthActivities/categories";
import Api4 from "@/services/withoutAuthActivities/product";
import Api5 from "@/services/withAuthActivities/product";
import { createAsyncThunk } from "@reduxjs/toolkit";

//categories
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

//subcategories
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

//products
export const getAdminProductsFromServer = createAsyncThunk(
    "Global/getAdminProductsFromServer",
    async ({ currentPage, itemsPerPage }) => {
        const { getAllProducts } = Api4
        return await getAllProducts({ page: currentPage, perPage: itemsPerPage })
    }
)
export const getSellerProductsFromServer = createAsyncThunk(
    "Global/getSellerProductsFromServer",
    async ({ currentPage, itemsPerPage }) => {
        const { getAllMyProducts } = Api5
        return await getAllMyProducts({ page: currentPage, perPage: itemsPerPage })
    }
)
export const addProductToServer = createAsyncThunk(
    "Global/addProductToServer",
    async (obj) => {
        const { createProduct } = Api5
        return await createProduct(obj)
    }
)