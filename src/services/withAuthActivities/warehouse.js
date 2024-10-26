import { clientWithAuth } from "@/lib/axios"


const Api = {
    getAllWarehouses: async (payload) => {
        const response = await clientWithAuth.get(
            `warehouseGet/getAllWarehouses?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    getAllMyWarehouses: async (payload) => {
        const response = await clientWithAuth.get(
            `warehouseGet/getAllMyWarehouses?page=${payload?.page}&perPage=${payload?.perPage}&isFutureOrder=${payload?.isFutureOrder}`
        );
        return response?.data;
    },
    getAllWarehousesOfASeller: async (payload) => {
        const response = await clientWithAuth.get(
            `warehouseGet/getAllWarehousesOfASeller?page=${payload?.page}&perPage=${payload?.perPage}&id=${payload?.id}`
        );
        return response?.data;
    },
    createWarehouse: async (payload) => {
        const response = await clientWithAuth.post(
            `warehousePost/WarehouseCreate`,
            {
                input: payload
            }
        );
        return response?.data;
    },
    updateWarehouse: async (payload) => {
        const response = await clientWithAuth.patch(
            `warehouseUpdate/WarehouseUpdate`,
            {
                input: payload?.input
            }
        );
        return response?.data;
    },
};

export default Api;

