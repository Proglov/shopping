import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    getAllProducts: async (payload) => {
        const response = await clientWithoutAuth.get(
            `productGet/getAllProducts?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getOneProduct: async (payload) => {
        const response = await clientWithoutAuth.get(
            `productGet/getOneProduct?id=${payload?.id}`
        );
        return response?.data;
    },
    getOneProductParams: async (payload) => {
        const response = await clientWithoutAuth.get(
            `productGet/getOneProductParams?id=${payload?.id}`
        );
        return response?.data;
    },
    getSomeProducts: async (payload) => {
        const response = await clientWithoutAuth.get(
            `productGet/getSomeProducts`, { params: payload }
        );
        return response?.data;
    },
    getAllProductsOfACategory: async (payload) => {
        const response = await clientWithoutAuth.get(
            `productGet/getAllProductsOfACategory?categoryId=${payload?.id}&page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getAllProductsOfASubcategory: async (payload) => {
        const response = await clientWithoutAuth.get(
            `productGet/getAllProductsOfASubcategory?subcategoryId=${payload?.id}&page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
};

export default Api;
