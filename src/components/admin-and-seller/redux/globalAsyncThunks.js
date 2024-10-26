import { createAsyncThunk } from "@reduxjs/toolkit";
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
import Api11 from "@/services/withAuthActivities/discounts/festivals";
import Api12 from "@/services/withoutAuthActivities/discounts/festivals";
import Api13 from "@/services/withAuthActivities/discounts/majorShopping";
import Api14 from "@/services/withoutAuthActivities/discounts/majorShopping";
import Api15 from "@/services/withAuthActivities/discounts/companyCouponForSomeProducts";
import Api16 from "@/services/withAuthActivities/userInPerson";
import Api17 from "@/services/withAuthActivities/txInPersons";
import Api18 from "@/services/withAuthActivities/warehouse";
import Api19 from "@/services/withAuthActivities/province";
import Api20 from "@/services/withAuthActivities/city";

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

//provinces
export const getProvincesFromServer = createAsyncThunk(
    "Global/getProvincesFromServer",
    async ({ currentPage, itemsPerPage }) => {
        const { getAllProvinces } = Api19
        return await getAllProvinces({ page: currentPage, perPage: itemsPerPage })
    }
)
export const addProvinceToServer = createAsyncThunk(
    "Global/addProvinceToServer",
    async (obj) => {
        const { createProvince } = Api19
        return await createProvince(obj)
    }
)

//cities
export const getCitiesFromServer = createAsyncThunk(
    "Global/getCitiesFromServer",
    async ({ currentPage, itemsPerPage }) => {
        const { getAllCities } = Api20
        return await getAllCities({ page: currentPage, perPage: itemsPerPage })
    }
)
export const addCityToServer = createAsyncThunk(
    "Global/addCityToServer",
    async (obj) => {
        const { createCity } = Api20
        return await createCity(obj)
    }
)

//products
export const getProductsFromServer = createAsyncThunk(
    "Global/getProductsFromServer",
    async ({ which, currentPage, itemsPerPage }) => {
        const { getAllProducts } = Api4
        const { getAllMyProducts } = Api5
        if (which === "Seller")
            return await getAllMyProducts({ page: currentPage, perPage: itemsPerPage })
        return await getAllProducts({ page: currentPage, perPage: itemsPerPage })
    }
)
export const addProductToServer = createAsyncThunk(
    "Global/addProductToServer",
    async (obj) => {
        const { createProduct } = Api5
        return await createProduct(obj)
    }
)
export const updateProductFromServer = createAsyncThunk(
    "Global/updateProductFromServer",
    async (obj) => {
        const { updateProduct } = Api5
        return await updateProduct(obj)
    }
)

//warehouses
export const getWarehousesFromServer = createAsyncThunk(
    "Global/getWarehousesFromServer",
    async ({ which, currentPage, itemsPerPage }) => {
        const { getAllWarehouses } = Api18
        const { getAllMyWarehouses } = Api18
        if (which === "Seller")
            return await getAllMyWarehouses({ page: currentPage, perPage: itemsPerPage })
        return await getAllWarehouses({ page: currentPage, perPage: itemsPerPage })
    }
)
export const addWarehouseToServer = createAsyncThunk(
    "Global/addWarehouseToServer",
    async (obj) => {
        const { createWarehouse } = Api18
        return await createWarehouse(obj)
    }
)
export const updateWarehouseFromServer = createAsyncThunk(
    "Global/updateWarehouseFromServer",
    async (obj) => {
        const { updateWarehouse } = Api18
        return await updateWarehouse(obj)
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

//userInPersons
export const getUserInPersonsFromServer = createAsyncThunk(
    "Global/getUserInPersonsFromServer",
    async ({ currentPage, itemsPerPage, which }) => {
        const { getAllUserInPersons, getAllMyUserInPersons } = Api16
        if (which === "Seller")
            return await getAllMyUserInPersons({ page: currentPage, perPage: itemsPerPage })
        return await getAllUserInPersons({ page: currentPage, perPage: itemsPerPage })
    }
)
export const addUserInPersonToServer = createAsyncThunk(
    "Global/addUserInPersonToServer",
    async (obj) => {
        const { UserInPersonCreate } = Api16
        return await UserInPersonCreate(obj)
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
        const x = await getAllComments({ page, perPage, validated: false })
        console.log(x);
        return x
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

//transactionInPersons
export const getTransactionInPersonsFromServer = createAsyncThunk(
    "Global/getTransactionInPersonsFromServer",
    async ({ currentPage, itemsPerPage, which }) => {
        const { getAllTransActionInPersons, getAllMyTransActionInPersons } = Api17
        if (which === "Seller")
            return await getAllMyTransActionInPersons({ page: currentPage, perPage: itemsPerPage })
        return await getAllTransActionInPersons({ page: currentPage, perPage: itemsPerPage })
    }
)
export const addTransactionInPersonToServer = createAsyncThunk(
    "Global/addTransactionInPersonToServer",
    async (obj) => {
        const { createTransActionInPerson } = Api17
        return await createTransActionInPerson(obj)
    }
)

//festivals
export const GetFestivalProductsFromServer = createAsyncThunk(
    "Global/GetFestivalProductsFromServer",
    async ({ page, perPage, which }) => {
        const { GetAllMyFestivalProducts } = Api11
        const { GetAllFestivalProducts } = Api12
        if (which === "Seller")
            return await GetAllMyFestivalProducts({ page, perPage })
        return await GetAllFestivalProducts({ page, perPage })
    }
)
export const addFestivalToServer = createAsyncThunk(
    "Global/addFestivalToServer",
    async (obj) => {
        try {
            const { CreateFestival } = Api11
            const res = (await CreateFestival(obj))?.festival
            return res
        } catch (error) {
            return {
                status: 400,
                message: error.response.data.message
            }
        }
    }
)
export const deleteFestivalFromServer = createAsyncThunk(
    "Global/deleteFestivalFromServer",
    async (id) => {
        const { DeleteFestival } = Api11
        await DeleteFestival(id)
        return id
    }
)

//majorShoppings
export const GetMajorShoppingProductsFromServer = createAsyncThunk(
    "Global/GetMajorShoppingProductsFromServer",
    async ({ page, perPage, which }) => {
        const { GetAllMyMajorShoppingProducts } = Api13
        const { GetAllMajorShoppingProducts } = Api14
        if (which === "Seller")
            return await GetAllMyMajorShoppingProducts({ page, perPage })
        return await GetAllMajorShoppingProducts({ page, perPage })
    }
)
export const addMajorShoppingToServer = createAsyncThunk(
    "Global/addMajorShoppingToServer",
    async (obj) => {
        try {
            const { CreateMajorShopping } = Api13
            const res = (await CreateMajorShopping(obj))?.majorShopping
            return {
                ...res,
                name: obj.name
            }
        } catch (error) {
            return {
                status: 400,
                message: error.response.data.message
            }
        }
    }
)
export const deleteMajorShoppingFromServer = createAsyncThunk(
    "Global/deleteMajorShoppingFromServer",
    async (id) => {
        const { DeleteMajorShopping } = Api13
        await DeleteMajorShopping(id)
        return id
    }
)

//companyCouponForSomeProducts
export const GetCompanyCouponForSomeProductsProductsFromServer = createAsyncThunk(
    "Global/GetCompanyCouponForSomeProductsProductsFromServer",
    async ({ page, perPage, which }) => {
        const { GetAllMyCompanyCouponForSomeProducts, GetAllCompanyCouponForSomeProducts } = Api15
        if (which === "Seller")
            return await GetAllMyCompanyCouponForSomeProducts({ page, perPage })
        return await GetAllCompanyCouponForSomeProducts({ page, perPage })
    }
)
export const addCompanyCouponForSomeProductsToServer = createAsyncThunk(
    "Global/addCompanyCouponForSomeProductsToServer",
    async (obj) => {
        try {
            const { CreateCompanyCouponForSomeProducts } = Api15
            const res = (await CreateCompanyCouponForSomeProducts(obj))?.coupon
            return res
        } catch (error) {
            return {
                status: 400,
                message: error.response.data.message
            }
        }
    }
)
export const deleteCompanyCouponForSomeProductsFromServer = createAsyncThunk(
    "Global/deleteCompanyCouponForSomeProductsFromServer",
    async (id) => {
        const { DeleteCompanyCouponForSomeProducts } = Api15
        await DeleteCompanyCouponForSomeProducts(id)
        return id
    }
)