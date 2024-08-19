import { clientWithAuth } from "@/lib/axios"


const Api = {
    GetTokenFromBodyCompanyCouponForSomeProducts: async (payload) => {
        const response = await clientWithAuth.post(
            `festivalsPost/getTokenFromBodyCompanyCouponForSomeProducts`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    CreateCompanyCouponForSomeProducts: async (payload) => {
        const response = await clientWithAuth.post(
            `festivalsPost/CompanyCouponForSomeProductsCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    GetAllCompanyCouponForSomeProducts: async (payload) => {
        const response = await clientWithAuth.get(
            `festivalsGet/GetAllCompanyCouponForSomeProducts?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    GetAllMyCompanyCouponForSomeProducts: async (payload) => {
        const response = await clientWithAuth.get(
            `festivalsGet/GetAllMyCompanyCouponForSomeProducts?page=${payload?.page}&perPage=${payload?.perPage}`
        );
        return response?.data;
    },
    GetProductsOfOneCompanyCouponForSomeProducts: async (payload) => {
        const response = await clientWithAuth.get(
            `festivalsGet/GetOneCompanyCouponForSomeProducts?id=${payload}`
        );
        return response?.data;
    },
    DeleteCompanyCouponForSomeProducts: async (payload) => {
        const response = await clientWithAuth.delete(
            `festivalsDelete/DeleteOneCompanyCouponForSomeProducts?id=${payload}`
        );
        return response?.data;
    },
};

export default Api;