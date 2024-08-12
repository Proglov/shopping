import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    signUp: async (payload) => {
        const response = await clientWithoutAuth.post(
            `userPost/UserSignUp`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    signInWithPhone: async (payload) => {
        const response = await clientWithoutAuth.post(
            `userPost/UserSignInWithPhone`,
            {
                phone: payload?.phone,
                password: payload?.password
            }
        );
        return response?.data;
    },
    signInWithEmailOrUsername: async (payload) => {
        const response = await clientWithoutAuth.post(
            `userPost/UserSignInWithEmailOrUsername`,
            {
                emailOrUsername: payload?.emailOrUsername,
                password: payload?.password
            }
        );
        return response?.data;
    }
};

export default Api;
