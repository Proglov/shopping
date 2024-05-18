'use server'
import { clientWithAuth } from "@/lib/axios"


const Api = {
    isAdmin: async (payload) => {
        const response = await clientWithAuth.get(
            `/userGet/isUserAdmin`,
            payload
        );
        return response;
    },
    getUser: async (payload) => {
        const response = await clientWithAuth.get(
            `/userGet/getUser`,
            payload
        );
        return response;
    },
    getAllUsers: async (payload) => {
        const response = await clientWithAuth.get(
            `/userGet/getUsers`,
            payload
        );
        return response;
    },
    deleteUser: async (payload) => {
        const response = await clientWithAuth.delete(
            `/userDelete/UserDelete`,
            payload
        );
        return response;
    }
};

export default Api;