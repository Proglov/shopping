import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllTransActionInPersons: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionInPersonGet/getAllTransActionInPersons?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    getAllMyTransActionInPersons: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionInPersonGet/getAllMyTransActionInPersons?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    getAllTransActionInPersonsOfASeller: async (payload) => {
        const response = await clientWithAuth.get(
            `transactionInPersonGet/getAllTransActionInPersonsOfASeller?page=${payload?.page}&perPage=${payload?.perPage}&id=${payload?.id}`
        );
        return response?.data;
    },
    createTransActionInPerson: async (payload) => {
        const response = await clientWithAuth.post(
            `transactionInPersonPost/TransActionInPersonCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;

