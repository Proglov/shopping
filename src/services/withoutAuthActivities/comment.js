import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    getAllComments: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/commentGet/getAllComments?page=${payload?.page}&perPage=${payload?.perPage}&validated=${payload?.validated}`
        );
        return response?.data;
    },
    getCommentsOfAProduct: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/commentGet/getCommentsOfAProduct?id=${payload?.id}`
        );
        return response?.data;
    },
    getOneComment: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/commentGet/getOneComment?id=${payload?.id}`
        );
        return response?.data;
    }
};

export default Api;