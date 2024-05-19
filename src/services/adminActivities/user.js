import { clientWithAuth } from "@/lib/axios"


const Api = {
    isAdmin: async () => {
        const response = await clientWithAuth.get(
            `/userGet/isUserAdmin`
        );
        return response?.data;
    },
    getOneUser: async (payload) => {
        const response = await clientWithAuth.get(
            `/userGet/getUser?id=${payload?.id}`,
        );
        return response?.data;
    },
    getAllUsers: async (payload) => {
        const response = await clientWithAuth.get(
            `/userGet/getUsers?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    deleteUser: async (payload) => {
        const response = await clientWithAuth.delete(
            `/userDelete/UserDelete`,
            {
                id: payload?.id
            }
        );
        return response?.data;
    }
};

export default Api;