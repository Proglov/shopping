'use server'
import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    getAllProducts: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/productGet/getAllProducts`,
            payload
        );
        return response;
    },
    getOneProduct: async (payload) => {
        const response = await clientWithoutAuth.get(
            `/productGet/getOneProduct`,
            payload
        );
        return response;
    }
};

export default Api;
