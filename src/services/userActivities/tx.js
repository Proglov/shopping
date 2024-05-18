'use server'
import { clientWithAuth } from "@/lib/axios"


const Api = {
    createTX: async (payload) => {
        const response = await clientWithAuth.post(
            `/transactionPost/TransActionCreate`,
            payload
        );
        return response;
    },
    getATX: async (payload) => {
        const response = await clientWithAuth.get(
            `/transactionGet/getOneTransAction`,
            payload
        );
        return response;
    }
};

export default Api;

