import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
};

export const AddressSlice = createSlice({
  name: "Address",
  initialState,
  reducers: {
    SetAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem("address", action.payload);
    },
  },
});
export const { SetAddress } = AddressSlice.actions;

export default AddressSlice.reducer;
