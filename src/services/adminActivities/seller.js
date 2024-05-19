import { clientWithAuth } from "@/lib/axios"


const Api = {
    getOneSeller: async (payload) => {
        const response = await clientWithAuth.get(
            `/sellerGet/getSeller?id=${payload?.id}`
        );
        return response?.data;
    },
    getAllSellers: async (payload) => {
        const response = await clientWithAuth.get(
            `/sellerGet/getSellers?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    deleteSeller: async (payload) => {
        const response = await clientWithAuth.delete(
            `/sellerDelete/SellerDelete?id=${payload?.id}`,
            payload
        );
        return response?.data;
    }
};

export default Api;