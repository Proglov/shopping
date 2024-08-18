import { clientWithAuth } from "@/lib/axios"


const Api = {
    CreateMajorShopping: async (payload) => {
        const response = await clientWithAuth.post(
            `festivalsPost/MajorShoppingCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    GetAllMyMajorShoppingProducts: async (payload) => {
        const response = await clientWithAuth.get(
            `festivalsGet/GetMyAllMajorShoppingProducts?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    DeleteMajorShopping: async (payload) => {
        const response = await clientWithAuth.delete(
            `festivalsDelete/DeleteOneMajorShopping?id=${payload}`
        );
        return response?.data;
    },
};

export default Api;