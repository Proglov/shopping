'use server'
import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllTXs: async (payload) => {
        const response = await clientWithAuth.get(
            `/transactionGet/getAllTransActions`,
            payload
        );
        return response;
    }
};

export default Api;

