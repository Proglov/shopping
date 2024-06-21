import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: {},
    isModalDeleteOpen: false,
    operatingError: ''
};


const usersSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        setSelectedItem(state, action) {
            state.selectedItem = action.payload
        },
        setIsModalDeleteOpen(state, action) {
            state.isModalDeleteOpen = action.payload
        },
        setOperatingError(state, action) {
            state.operatingError = action.payload
        }
    }
});

export const { setIsModalDeleteOpen, setOperatingError, setSelectedItem } = usersSlice.actions;
export default usersSlice.reducer;
