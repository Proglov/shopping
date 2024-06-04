import { clientWithAuth } from "@/lib/axios"


const Api = {
    createSubcategories: async (payload) => {
        const response = await clientWithAuth.post(
            `/subcategoryPost/subcategoryCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    }
};

export default Api;