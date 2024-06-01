import { clientWithAuth, clientWithoutAuth } from "@/lib/axios"


const Api = {
    createComment: async (payload) => {
        const response = await clientWithAuth.post(
            `/commentPost/CommentAdd`,
            {
                input: payload
            }
        );
        return response?.data;
    },
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
    },
    toggleLikeComment: async (payload) => {
        const response = await clientWithAuth.patch(
            `/commentUpdate/CommentToggleLike`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    toggleDisLikeComment: async (payload) => {
        const response = await clientWithAuth.patch(
            `/commentUpdate/CommentToggleDisLike`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;