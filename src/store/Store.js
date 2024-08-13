import { configureStore } from "@reduxjs/toolkit";
import CartProductsReducer from "./CartProductsSlice";
import AddressAndTimeReducer from "./AddressAndTime";
import LoginReducer from './login'

const Store = configureStore({
  reducer: {
    CartProducts: CartProductsReducer,
    AddressAndTime: AddressAndTimeReducer,
    Login: LoginReducer
  },
});

export default Store;
