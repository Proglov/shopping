import { loadAddressAndTimeState } from "@/store/Storage/Storage";
import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  address: '',
  day: 0, // 0 means today, 1 means tomorrow, etc
  time: 0 // if day is 0, time 0 means 2 hours after now, else, 0 means 7 A.M.
};

const initialState = loadAddressAndTimeState()

export const AddressAndTimeSlice = createSlice({
  name: "AddressAndTime",
  initialState,
  reducers: {
    SetAddress: (state, action) => {
      const newState = {
        ...state,
        address: action.payload
      }
      localStorage.setItem("AddressAndTime", JSON.stringify(newState));
      return newState;
    },
    SetDay: (state, action) => {
      const newState = {
        ...state,
        day: action.payload
      }
      localStorage.setItem("AddressAndTime", JSON.stringify(newState));
      return newState;
    },
    SetTime: (state, action) => {
      const newState = {
        ...state,
        time: action.payload
      }
      localStorage.setItem("AddressAndTime", JSON.stringify(newState));
      return newState;
    },
    ResetAddressAndTime: () => {
      localStorage.setItem("AddressAndTime", JSON.stringify(emptyState));
      return emptyState
    }
  },
});

export const { SetAddress, SetDay, SetTime, ResetAddressAndTime } = AddressAndTimeSlice.actions;

export default AddressAndTimeSlice.reducer;