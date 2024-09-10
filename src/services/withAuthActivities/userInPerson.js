import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllUserInPersons: async (payload) => {
        const response = await clientWithAuth.get(
            `userInPersonGet/getAllUserInPersons?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getAllMyUserInPersons: async (payload) => {
        const response = await clientWithAuth.get(
            `userInPersonGet/getAllMyUserInPersons?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    UserInPersonCreate: async (payload) => {
        const response = await clientWithAuth.post(
            `userInPersonPost/UserInPersonCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
};

export default Api;