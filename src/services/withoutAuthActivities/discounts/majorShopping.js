import { clientWithoutAuth } from "@/lib/axios"


const Api = {
    GetAllMajorShoppingProducts: async (payload) => {
        const response = await clientWithoutAuth.get(
            `festivalsGet/GetAllMajorShoppingProducts?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        console.log(response);
        return response?.data;
    }
};

export default Api;