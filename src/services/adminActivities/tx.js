import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllTXs: async (payload) => {
        const response = await clientWithAuth.get(
            `/transactionGet/getAllTransActions?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    }
};

export default Api;

