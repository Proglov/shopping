'use server'
import { clientWithAuth, clientWithoutAuth } from "@/lib/axios"


const Api = {
    getMe: async (payload) => {
        const response = await clientWithAuth.get(
            `/userGet/getMe`,
            payload
        );
        return response;
    },
    signUp: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/userPost/UserSignUp`,
            payload
        );
        return response;
    },
    signInWithPhone: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/userPost/signInWithPhone`,
            payload
        );
        return response;
    },
    signInWithEmailOrUsername: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/userPost/UserSignInWithEmailOrUsername`,
            payload
        );
        return response;
    },
    updateUser: async (payload) => {
        const response = await clientWithAuth.patch(
            `/userUpdate/UserUpdate`,
            payload
        );
        return response;
    }
};

export default Api;
