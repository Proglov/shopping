import { clientWithAuth, clientWithoutAuth } from "@/lib/axios"


const Api = {
    getMe: async () => {
        const response = await clientWithAuth.get(
            `/userGet/getMe`
        );
        return response?.data;
    },
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
    },
    updateUser: async (payload) => {
        const response = await clientWithAuth.patch(
            `/userUpdate/UserUpdate`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;
