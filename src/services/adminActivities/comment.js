'use server'
import { clientWithAuth } from "@/lib/axios"


const Api = {
    updateComment: async (payload) => {
        const response = await clientWithAuth.patch(
            `/commentUpdate/CommentUpdate`,
            payload
        );
        return response;
    },
    deleteComment: async (payload) => {
        const response = await clientWithAuth.delete(
            `/commentDelete/CommentDelete`,
            payload
        );
        return response;
    },
    toggleValidateComment: async (payload) => {
        const response = await clientWithAuth.patch(
            `/commentUpdate/CommentToggleValidate`,
            payload
        );
        return response;
    }
};

export default Api;