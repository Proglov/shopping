'use server'
import { clientWithAuth, clientWithoutAuth } from "@/lib/axios"


const Api = {
    getMeSeller: async (payload) => {
        const response = await clientWithAuth.get(
            `/sellerGet/getMeSeller`,
            payload
        );
        return response;
    },
    sellerSignUp: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/sellerPost/SellerSignUp`,
            payload
        );
        return response;
    },
    sellerSignInWithPhone: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/sellerPost/SellerSignInWithPhone`,
            payload
        );
        return response;
    },
    sellerSignInWithEmailOrUsername: async (payload) => {
        const response = await clientWithoutAuth.post(
            `/sellerPost/SellerSignInWithEmailOrUsername`,
            payload
        );
        return response;
    },
    sellerUpdate: async (payload) => {
        const response = await clientWithAuth.patch(
            `/sellerUpdate/SellerUpdate`,
            payload
        );
        return response;
    }
};

export default Api;
