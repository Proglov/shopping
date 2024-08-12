import { configureStore } from "@reduxjs/toolkit";
import AddressReducer from "../features/Address/AddressSlice";
import TimeReducer from "../features/ShippingTime/TimeSlice";
import CartProductsReducer from "./CartProductsSlice";
import AddressAndTimeReducer from "./AddressAndTime";

const Store = configureStore({
  reducer: {
    Address: AddressReducer,
    Time: TimeReducer,
    CartProducts: CartProductsReducer,
    CartProducts: CartProductsReducer,
    AddressAndTime: AddressAndTimeReducer
  },
});

export default Store;
