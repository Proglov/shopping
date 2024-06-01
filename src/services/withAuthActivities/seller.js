import { clientWithAuth, clientWithoutAuth } from "@/lib/axios"


const Api = {
    isUserSeller: async () => {
        const response = await clientWithoutAuth.get(
            `/sellerGet/isUserSeller`
        );
        return response?.data;
    },
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
            `/sellerDelete/SellerDelete`,
            {
                data: {
                    id: payload?.id
                }
            }
        );
        return response?.data;
    }
};

export default Api;