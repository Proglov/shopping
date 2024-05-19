import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    getAllProducts: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/productGet/getAllProducts?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getOneProduct: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/productGet/getOneProduct?id=${payload?.id}`
        );
        return response;
    }
};

export default Api;
