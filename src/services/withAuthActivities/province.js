import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllProvinces: async (payload) => {
        const response = await clientWithAuth.get(
            `provinceGet/getAllProvinces?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    getOneProvince: async (payload) => {
        const response = await clientWithAuth.get(
            `provinceGet/getOneProvince?id=${payload?.id}`
        );
        return response?.data;
    },
    createProvince: async (payload) => {
        const response = await clientWithAuth.post(
            `provincePost/ProvinceCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;

