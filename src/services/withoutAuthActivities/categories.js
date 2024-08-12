import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    getAllCategories: async (payload) => {
        const response = await clientWithoutAuth.get(
            `categoryGet/getAllCategories?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getOneCategory: async (payload) => {
        const response = await clientWithoutAuth.get(
            `categoryGet/getOneCategory?id=${payload?.id}`
        );
        return response?.data;
    }
};

export default Api;