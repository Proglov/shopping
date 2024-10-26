import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllCities: async (payload) => {
        const response = await clientWithAuth.get(
            `cityGet/getAllCities?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    getOneCity: async (payload) => {
        const response = await clientWithAuth.get(
            `cityGet/getOneCity?id=${payload?.id}`
        );
        return response?.data;
    },
    createCity: async (payload) => {
        const response = await clientWithAuth.post(
            `cityPost/CityCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;

