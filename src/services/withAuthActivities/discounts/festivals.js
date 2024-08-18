import { clientWithAuth } from "@/lib/axios"


const Api = {
    CreateFestival: async (payload) => {
        const response = await clientWithAuth.post(
            `festivalsPost/FestivalCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    GetAllMyFestivalProducts: async (payload) => {
        const response = await clientWithAuth.get(
            `festivalsGet/GetAllMyFestivalProducts?page=${payload?.page}&perPage=${payload?.perPage}&validated=${payload?.validated}`
        );
        return response?.data;
    },
    DeleteFestival: async (payload) => {
        const response = await clientWithAuth.delete(
            `festivalsDelete/DeleteOneFestival?id=${payload}`
        );
        return response?.data;
    },
};

export default Api;