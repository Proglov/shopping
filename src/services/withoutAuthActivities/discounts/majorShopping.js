import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    GetAllMajorShoppingProducts: async (payload) => {
        const response = await clientWithoutAuth.get(
            `festivalsGet/GetAllMajorShoppingProducts?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    GetAllMajorShoppingProductsHomePage: async (payload) => {
        const response = await clientWithoutAuth.get(
            `festivalsGet/GetAllMajorShoppingProductsHomePage?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    }
};

export default Api;