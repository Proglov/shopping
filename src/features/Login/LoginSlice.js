import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
};

export const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    SetLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});
export const { SetLogin } = LoginSlice.actions;

export default LoginSlice.reducer;
