import { clientWithAuth } from "@/lib/axios"


const Api = {
    uploadImages: async (payload) => {
        const data = new FormData();
        data.append("images", payload)
        const response = await clientWithAuth.post(
            `/imagePost/uploadImages`,
            data
        );
        return response?.data;
    },
};

export default Api;
