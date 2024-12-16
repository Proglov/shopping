import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    getAllCities: async (payload) => {
        const response = await clientWithoutAuth.get(
            `cityGet/getAllCities?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getAllCitiesForNavbar: async () => {
        const response = await clientWithoutAuth.get(`cityGet/getAllCitiesForNavbar`);
        return response?.data;
    },
    getOneCity: async (payload) => {
        const response = await clientWithoutAuth.get(
            `cityGet/getOneCity?id=${payload?.id}`
        );
        return response?.data;
    },
    setCityIds: async (payload) => {
        const response = await clientWithoutAuth.post(
            `cityPost/set-cityIds`,
            {
                ids: payload?.cityIds
            }
        );
        return response?.data;
    }
};

export default Api;

