import { clientWithAuth } from "@/lib/axios"


const Api = {
    updateComment: async (payload) => {
        const response = await clientWithAuth.patch(
            `/commentUpdate/CommentUpdate`,
            {
                input: {
                    id: payload?.input?.id,
                    body: payload?.input?.body
                }
            }
        );
        return response?.data;
    },
    deleteComment: async (payload) => {
        const response = await clientWithAuth.delete(
            `/commentDelete/CommentDelete`,
            {
                data: {
                    id: payload?.id
                }
            }
        );
        return response?.data;
    },
    toggleValidateComment: async (payload) => {
        const response = await clientWithAuth.patch(
            `/commentUpdate/CommentToggleValidate`,
            {
                input: {
                    id: payload?.input?.id
                }
            }
        );
        return response?.data;
    },
    createComment: async (payload) => {
        const response = await clientWithAuth.post(
            `/commentPost/CommentAdd`,
            {
                input: payload
            }
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