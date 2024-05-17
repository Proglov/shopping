import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  day: 0, // today = 0 , tomorrow = 1
  time: [0, 0], // [start,end]
  price: "0",
  select: false,
};

export const TimeSlice = createSlice({
  name: "Time",
  initialState,
  reducers: {
    ChangeTime: (state) => {
      state = { ...state, select: false };
    },
    SetTime: (state, action) => {
      state.day = action.payload.day;
      state.time = action.payload.time;
      state.price = action.payload.price;
      state.select = action.payload.select;
    },
  },
});
export const { SetTime, ChangeTime } = TimeSlice.actions;

export default TimeSlice.reducer;
