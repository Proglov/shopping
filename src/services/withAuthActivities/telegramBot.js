import { clientWithAuth } from "@/lib/axios"


const Api = {
    GetCodeForTelegram: async () => {
        const response = await clientWithAuth.get(
            `/telegramGet/GetCodeForTelegram`
        );
        return response?.data;
    },
    CheckTelegramStatus: async () => {
        const response = await clientWithAuth.get(
            `/telegramGet/CheckTelegramStatus`
        );
        return response?.data;
    },
    GetTimeLeft: async () => {
        const response = await clientWithAuth.get(
            `/telegramGet/GetTimeLeft`
        );
        return response?.data;
    }
};

export default Api;