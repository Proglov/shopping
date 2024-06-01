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
    deleteImages: async (payload) => {
        const response = await clientWithAuth.delete(
            `/imageDelete/deleteImages`,
            {
                data: {
                    filenames: payload?.filenames
                }
            }
        );
        return response?.data;
    },
};

export default Api;
