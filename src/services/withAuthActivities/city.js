import { clientWithAuth } from "@/lib/axios"


const Api = {
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

