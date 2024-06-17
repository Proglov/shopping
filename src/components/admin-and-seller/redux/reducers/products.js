import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: {},
    isModalDeleteOpen: false,
    isModalEditOpen: false,
    operatingError: '',
};


const productsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setSelectedItem(state, action) {
            state.selectedItem = action.payload
        },
        setIsModalDeleteOpen(state, action) {
            state.isModalDeleteOpen = action.payload
        },
        setIsModalEditOpen(state, action) {
            state.isModalEditOpen = action.payload
        },
        setOperatingError(state, action) {
            state.operatingError = action.payload
        }
    }
});

export const { setIsModalDeleteOpen, setIsModalEditOpen, setOperatingError, setSelectedItem } = productsSlice.actions;
export default productsSlice.reducer;
