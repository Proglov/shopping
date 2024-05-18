'use server'
import { clientWithAuth, clientWithoutAuth } from "@/lib/axios"


const Api = {
    createComment: async (payload) => {
        const response = await clientWithAuth.post(
            `/commentPost/CommentAdd`,
            payload
        );
        return response;
    },
    getAllComments: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/commentGet/getAllComments`,
            payload
        );
        return response;
    },
    getAComment: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/commentGet/getOneComment`,
            payload
        );
        return response;
    },
    toggleLikeComment: async (payload) => {
        const response = await clientWithAuth.patch(
            `/commentUpdate/CommentToggleLike`,
            payload
        );
        return response;
    },
    toggleDisLikeComment: async (payload) => {
        const response = await clientWithAuth.patch(
            `/commentUpdate/CommentToggleDisLike`,
            payload
        );
        return response;
    }
};

export default Api;