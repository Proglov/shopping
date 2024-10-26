import Api from "@/services/withAuthActivities/city";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: {},
    isModalEditOpen: false,
    operatingError: '',
    provinces: []
};

export const getProvincesFromServer = createAsyncThunk(
    "Warehouses/getProvincesFromServer",
    async () => {
        //we get all cities and then, extract the provinces
        const { getAllCities } = Api
        return await getAllCities()
    }
)

const warehousesSlice = createSlice({
    name: "Warehouses",
    initialState,
    reducers: {
        setSelectedItem(state, action) {
            if (typeof action.payload === "function")
                state.selectedItem = action.payload(state.selectedItem)
            else
                state.selectedItem = action.payload
        },
        setIsModalEditOpen(state, action) {
            state.isModalEditOpen = action.payload
        },
        setOperatingError(state, action) {
            state.operatingError = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getProvincesFromServer.fulfilled, (state, action) => {
            //we get all cities and then, extract the provinces
            const allProvinces = action.payload.cities.reduce((acc, curr) => {
                const existingProvince = acc.find(item => item.provinceId === curr.provinceId._id);

                if (existingProvince) {
                    existingProvince.cities.push({
                        cityId: curr._id,
                        cityName: curr.name
                    });
                } else {
                    acc.push({
                        provinceId: curr.provinceId._id,
                        provinceName: curr.provinceId.name,
                        cities: [{
                            cityId: curr._id,
                            cityName: curr.name
                        }]
                    });
                }

                return acc;
            }, []);
            state.provinces = allProvinces
        });
    }
});

export const { setIsModalEditOpen, setOperatingError, setSelectedItem } = warehousesSlice.actions;
export default warehousesSlice.reducer;
