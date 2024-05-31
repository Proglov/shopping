import { clientWithAuth } from "@/lib/axios"


const Api = {
    uploadImage: async (payload) => {
        const data = new FormData();
        data.append("images", payload)
        const response = await clientWithAuth.post(
            `/imagePost/uploadImage`,
            data
        );
        return response?.data;
    },
};

export default Api;
