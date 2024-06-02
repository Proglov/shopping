import { clientWithAuth, clientWithoutAuth } from "@/lib/axios"


const Api = {
    signUp: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/userPost/UserSignUp`,
            {
                phone: payload?.phone
            }
        );
        return response?.data;
    },
    signInWithPhone: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/userPost/signInWithPhone`,
            {
                phone: payload?.phone
            }
        );
        return response?.data;
    },
    signInWithEmailOrUsername: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/userPost/UserSignInWithEmailOrUsername`,
            {
                emailOrUsername: payload?.emailOrUsername,
                password: payload?.password
            }
        );
        return response?.data;
    }
};

export default Api;
