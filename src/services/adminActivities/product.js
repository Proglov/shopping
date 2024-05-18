'use server'
import { clientWithAuth } from "@/lib/axios"


const Api = {
    createProduct: async (payload) => {
        const response = await clientWithAuth.post(
            `/productPost/ProductCreate`,
            payload
        );
        return response;
    },
    updateProduct: async (payload) => {
        const response = await clientWithAuth.patch(
            `/productUpdate/ProductUpdate`,
            payload
        );
        return response;
    },
    deleteProduct: async (payload) => {
        const response = await clientWithAuth.delete(
            `/productDelete/ProductDelete`,
            payload
        );
        return response;
    }
};

export default Api;