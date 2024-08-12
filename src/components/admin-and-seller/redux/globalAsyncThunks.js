import Api from "@/services/withoutAuthActivities/subcategories";
import Api1 from "@/services/withAuthActivities/subcategories";
import Api2 from "@/services/withAuthActivities/categories";
import Api3 from "@/services/withoutAuthActivities/categories";
import Api4 from "@/services/withoutAuthActivities/product";
import Api5 from "@/services/withAuthActivities/product";
import Api6 from "@/services/withAuthActivities/user";
import Api7 from "@/services/withAuthActivities/seller";
import Api8 from "@/services/withAuthActivities/comment";
import Api9 from "@/services/withoutAuthActivities/comment";
import Api10 from "@/services/withAuthActivities/tx";
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
export const toggleAvailabilityProduct = createAsyncThunk(
    "Global/toggleAvailabilityProduct",
    async (id) => {
        const { toggleAvailabilityProduct } = Api5
        await toggleAvailabilityProduct({ id })
        return id
    }
)
export const updateProductFromServer = createAsyncThunk(
    "Global/updateProductFromServer",
    async (obj) => {
        const { updateProduct } = Api5
        return await updateProduct(obj)
    }
)

//users
export const getUsersFromServer = createAsyncThunk(
    "Global/getUsersFromServer",
    async ({ currentPage, itemsPerPage }) => {
        const { getAllUsers } = Api6
        return await getAllUsers({ page: currentPage, perPage: itemsPerPage })
    }
)
export const deleteUserFromServer = createAsyncThunk(
    "Global/deleteUserFromServer",
    async (id) => {
        const { deleteUser } = Api6
        return await deleteUser({ id })
    }
)


//sellers
export const getInvalidatedSellersFromServer = createAsyncThunk(
    "Global/getInvalidatedSellersFromServer",
    async ({ page, perPage }) => {
        const { getAllSellers } = Api7
        return await getAllSellers({ page, perPage, validated: false })
    }
)
export const deleteSellerFromServer = createAsyncThunk(
    "Global/deleteSellerFromServer",
    async (id) => {
        const { deleteSeller } = Api7
        return await deleteSeller({ id })
    }
)
export const validateSellerToServer = createAsyncThunk(
    "Global/validateSellerToServer",
    async (id) => {
        const { sellerValidate } = Api7
        return await sellerValidate({ id })
    }
)


//comments
export const getInvalidatedCommentsFromServer = createAsyncThunk(
    "Global/getInvalidatedCommentsFromServer",
    async ({ page, perPage }) => {
        const { getAllComments } = Api9
        return await getAllComments({ page, perPage, validated: false })
    }
)
export const deleteCommentFromServer = createAsyncThunk(
    "Global/deleteCommentFromServer",
    async (id) => {
        const { deleteComment } = Api8
        return await deleteComment({ id })
    }
)
export const validateCommentToServer = createAsyncThunk(
    "Global/validateCommentToServer",
    async (id) => {
        const { toggleValidateComment } = Api8
        return await toggleValidateComment({ id })
    }
)


//TX
export const getFutureTXsFromServer = createAsyncThunk(
    "Global/getFutureTXsFromServer",
    async ({ page, perPage, which }) => {
        const { getAllTXs, getAllMyTXs } = Api10
        if (which === "Seller")
            return await getAllMyTXs({ page, perPage, isFutureOrder: true })
        return await getAllTXs({ page, perPage, isFutureOrder: true })
    }
)
export const updateTXStatusToServer = createAsyncThunk(
    "Global/updateTXStatusToServer",
    async ({ id, newStatus }) => {
        const { TXStatus } = Api10
        await TXStatus({ id, newStatus })
        return { id, newStatus }
    }
)