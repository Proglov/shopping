import { clientWithAuth } from "@/lib/axios"


const Api = {
    createCategories: async (payload) => {
        const response = await clientWithAuth.post(
            `categoryPost/CategoryCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;