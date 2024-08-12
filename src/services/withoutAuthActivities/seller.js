import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    isUserSeller: async () => {
        const response = await clientWithoutAuth.get(
            `sellerGet/isUserSeller`
        );
        return response?.data;
    },
    sellerSignUp: async (payload) => {
        const response = await clientWithoutAuth.post(
            `sellerPost/SellerSignUp`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    sellerSignInWithPhone: async (payload) => {
        const response = await clientWithoutAuth.post(
            `sellerPost/SellerSignInWithPhone`,
            {
                phone: payload?.phone,
                password: payload?.password
            }
        );
        return response?.data;
    },
    sellerSignInWithEmailOrUsername: async (payload) => {
        const response = await clientWithoutAuth.post(
            `sellerPost/SellerSignInWithEmailOrUsername`,
            {
                emailOrUsername: payload?.emailOrUsername,
                password: payload?.password
            }
        );
        return response?.data;
    }
};

export default Api;
