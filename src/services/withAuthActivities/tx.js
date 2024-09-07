import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllTXs: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionGet/getAllTransActions?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    getAllMyTXs: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionGet/getAllMyTransActions?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    getAllMyTXsUser: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionGet/getAllMyTransActionsUser?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getAllTransActionsOfAUser: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionGet/getAllTransActionsOfAUser?page=${payload?.page}&perPage=${payload?.perPage}&id=${payload?.id}`
        );
        return response?.data;
    },
    getAllTransActionsOfAProduct: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionGet/getAllTransActionsOfAProduct?page=${payload?.page}&perPage=${payload?.perPage}&id=${payload?.id}`
        );
        return response?.data;
    },
    TXStatus: async (payload) => {
        const response = await clientWithAuth.post(
            `transactionUpdate/TransActionStatus`,
            {
                id: payload?.id,
                newStatus: payload?.newStatus,
            }
        );
        return response?.data;
    },
    createTX: async (payload) => {
        const response = await clientWithAuth.post(
            `transactionPost/TransActionCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    getOneTX: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionGet/getOneTransAction?id=${payload?.id}`
        );
        return response?.data;
    }
};

export default Api;

