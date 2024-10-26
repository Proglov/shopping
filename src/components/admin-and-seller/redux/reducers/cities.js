import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/services/withAuthActivities/province";

const initialState = {
    provinces: []
};

export const getProvincesFromServer = createAsyncThunk(
    "Cities/getProvincesFromServer",
    async () => {
        const { getAllProvinces } = Api
        return await getAllProvinces()
    }
)

const citiesSlice = createSlice({
    name: "Cities",
    initialState,
    reducers: {
        addCategory(state, action) {
            state.provinces = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getProvincesFromServer.fulfilled, (state, action) => {
            state.provinces = action.payload.provinces
        });
    }
});

export default citiesSlice.reducer;
