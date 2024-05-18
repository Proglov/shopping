'use server'
import { clientWithAuth } from "@/lib/axios"


const Api = {
    getSeller: async (payload) => {
        const response = await clientWithAuth.get(
            `/sellerGet/getSeller`,
            payload
        );
        return response;
    },
    getSellers: async (payload) => {
        const response = await clientWithAuth.get(
            `/sellerGet/getSellers`,
            payload
        );
        return response;
    },
    deleteUser: async (payload) => {
        const response = await clientWithAuth.delete(
            `/sellerDelete/SellerDelete`,
            payload
        );
        return response;
    }
};

export default Api;