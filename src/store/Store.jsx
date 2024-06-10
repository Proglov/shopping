import { configureStore } from "@reduxjs/toolkit";
import AddressReducer from "../features/Address/AddressSlice";
import TimeReducer from "../features/ShippingTime/TimeSlice";
import CartProductsReducer from "../features/CartProducts/CartProductsSlice";

const Store = configureStore({
  reducer: {
    Address: AddressReducer,
    Time: TimeReducer,
    CartProducts: CartProductsReducer,
  },
});

export default Store;
