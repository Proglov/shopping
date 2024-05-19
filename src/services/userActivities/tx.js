import { clientWithAuth } from "@/lib/axios"


const Api = {
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

