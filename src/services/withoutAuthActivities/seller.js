import { clientWithAuth, clientWithoutAuth } from "@/lib/axios"


const Api = {
    getMeSeller: async () => {
        const response = await clientWithAuth.get(
            `/sellerGet/getMeSeller`
        );
        return response?.data;
    },
    sellerSignUp: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/sellerPost/SellerSignUp`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    sellerSignInWithPhone: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/sellerPost/SellerSignInWithPhone`,
            {
                phone: payload?.phone
            }
        );
        return response?.data;
    },
    sellerSignInWithEmailOrUsername: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/sellerPost/SellerSignInWithEmailOrUsername`,
            {
                emailOrUsername: payload?.emailOrUsername,
                password: payload?.password
            }
        );
        return response?.data;
    },
    sellerUpdate: async (payload) => {
        const response = await clientWithAuth.patch(
            `/sellerUpdate/SellerUpdate`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;
