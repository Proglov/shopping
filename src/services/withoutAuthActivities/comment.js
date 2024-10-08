import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    getAllComments: async (payload) => {
        const response = await clientWithoutAuth.get(
            `commentGet/getAllComments?page=${payload?.page}&perPage=${payload?.perPage}&validated=${payload?.validated}`
        );
        return response?.data;
    },
    getAllCommentsOfAUser: async (payload) => {
        const response = await clientWithoutAuth.get(
            `commentGet/getAllCommentsOfAUser?page=${payload?.page}&perPage=${payload?.perPage}&id=${payload?.id}`
        );
        return response?.data;
    },
    getCommentsOfAProduct: async (payload) => {
        const response = await clientWithoutAuth.get(
            `commentGet/getCommentsOfAProduct?id=${payload?.id}&page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getCommentsOfAProductForSeller: async (payload) => {
        const response = await clientWithoutAuth.get(
            `commentGet/getCommentsOfAProductForSeller?id=${payload?.id}&page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getOneComment: async (payload) => {
        const response = await clientWithoutAuth.get(
            `commentGet/getOneComment?id=${payload?.id}`
        );
        return response?.data;
    }
};

export default Api;