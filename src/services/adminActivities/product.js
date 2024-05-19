import { clientWithAuth } from "@/lib/axios"


const Api = {
    createProduct: async (payload) => {
        const response = await clientWithAuth.post(
            `/productPost/ProductCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    updateProduct: async (payload) => {
        const response = await clientWithAuth.patch(
            `/productUpdate/ProductUpdate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    deleteProduct: async (payload) => {
        const response = await clientWithAuth.delete(
            `/productDelete/ProductDelete`,
            {
                id: payload?.id
            }
        );
        return response?.data;
    }
};

export default Api;