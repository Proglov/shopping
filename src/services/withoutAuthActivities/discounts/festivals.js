import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    GetAllFestivalProducts: async (payload) => {
        const response = await clientWithoutAuth.get(
            `festivalsGet/GetAllFestivalProducts?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    GetAllFestivalProductsHomePage: async (payload) => {
        const response = await clientWithoutAuth.get(
            `festivalsGet/GetAllFestivalProductsHomePage?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    }
};

export default Api;