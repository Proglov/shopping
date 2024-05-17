import { configureStore } from "@reduxjs/toolkit";
import AddressReducer from "../features/Address/AddressSlice";
import LoginReducer from "../features/Login/LoginSlice";
import TimeReducer from "../features/ShippingTime/TimeSlice";
import CartProductsReducer from "../features/CartProducts/CartProductsSlice";
import GroupingReducer from "../features/Grouping/GroupingSlice";
import OfferProductsReducer from "../features/OfferProducts/OfferProductsSlice";
import ProductsReducer from "../features/Products/Products";

const Store = configureStore({
  reducer: {
    Address: AddressReducer,
    Login: LoginReducer,
    Time: TimeReducer,
    CartProducts: CartProductsReducer,
    Grouping: GroupingReducer,
    OfferProducts: OfferProductsReducer,
    Products: ProductsReducer,
  },
});

export default Store;
