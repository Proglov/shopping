import { configureStore } from "@reduxjs/toolkit";
import AddressReducer from "../features/Address/AddressSlice";
import TimeReducer from "../features/ShippingTime/TimeSlice";
import CartProductsReducer from "../features/CartProducts/CartProductsSlice";
import GroupingReducer from "../features/Grouping/GroupingSlice";
import ProductsReducer from "../features/Products/Products";

const Store = configureStore({
  reducer: {
    Address: AddressReducer,
    Time: TimeReducer,
    CartProducts: CartProductsReducer,
    Grouping: GroupingReducer,
    Products: ProductsReducer,
  },
});

export default Store;
