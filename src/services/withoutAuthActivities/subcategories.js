import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    getAllSubcategories: async (payload) => {
        const response = await clientWithoutAuth.get(
            `subcategoryGet/getAllSubcategories?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getOneSubcategory: async (payload) => {
        const response = await clientWithoutAuth.get(
            `subcategoryGet/getOneSubcategory?id=${payload?.id}`
        );
        return response?.data;
    }
};

export default Api;