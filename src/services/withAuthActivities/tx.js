import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllTXs: async (payload) => {
        const response = await clientWithAuth.get(
            `/transactionGet/getAllTransActions?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    getAllMyTXs: async (payload) => {
        const response = await clientWithAuth.get(
            `/transactionGet/getAllMyTransActions?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    TXDone: async (payload) => {
        const response = await clientWithAuth.post(
            `/transactionUpdate/TransActionDone`,
            {
                id: payload?.id
            }
        );
        return response?.data;
    },
    createTX: async (payload) => {
        const response = await clientWithAuth.post(
            `/transactionPost/TransActionCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    getOneTX: async (payload) => {
        const response = await clientWithAuth.get(
            `/transactionGet/getOneTransAction?id=${payload?.id}`
        );
        return response?.data;
    }
};

export default Api;

