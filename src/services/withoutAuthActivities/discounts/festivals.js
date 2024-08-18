import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    GetAllFestivalProducts: async (payload) => {
        const response = await clientWithoutAuth.get(
            `festivalsGet/GetAllFestivalProducts?page=${payload?.page}&perPage=${payload?.perPage}&validated=${payload?.validated}`
        );
        return response?.data;
    }
};

export default Api;