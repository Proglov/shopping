import { clientWithAuth } from "@/lib/axios"


const Api = {
    getMeSeller: async () => {
        const response = await clientWithAuth.get(
            `sellerGet/getMeSeller`
        );
        return response?.data;
    },
    isUserSeller: async () => {
        const response = await clientWithAuth.get(
            `sellerGet//isUserSeller`
        );
        return response?.data;
    },
    getOneSeller: async (payload) => {
        const response = await clientWithAuth.get(
            `sellerGet/getSeller?id=${payload?.id}`
        );
        return response?.data;
    },
    getAllSellers: async (payload) => {
        const response = await clientWithAuth.get(
            `sellerGet/getSellers?page=${payload?.page}&perPage=${payload?.perPage}&validated=${payload?.validated}`
        );
        return response?.data;
    },
    deleteSeller: async (payload) => {
        const response = await clientWithAuth.delete(
            `sellerDelete/SellerDelete`,
            {
                data: {
                    id: payload?.id
                }
            }
        );
        return response?.data;
    },
    sellerUpdate: async (payload) => {
        const response = await clientWithAuth.patch(
            `sellerUpdate/SellerUpdate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    sellerValidate: async (payload) => {
        const response = await clientWithAuth.patch(
            `sellerUpdate/SellerValidate`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;