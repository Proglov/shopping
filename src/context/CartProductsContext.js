"use client";

import {
  CartProductsReducer,
  initialCartProducts,
} from "@/Reducers/CartProductsReducer";
import { createContext, useContext, useReducer } from "react";

export const CartProductsContext = createContext();
export const CartProductsDispatchContext = createContext();

export function useCartProducts() {
  return useContext(CartProductsContext);
}

export function useCartProductsDispatch() {
  return useContext(CartProductsDispatchContext);
}

export const CartProductsProvider = ({ children }) => {
  const [cartProducts, cartProductsDispatch] = useReducer(
    CartProductsReducer,
    initialCartProducts
  );
  return (
    <CartProductsContext.Provider value={cartProducts}>
      <CartProductsDispatchContext.Provider value={cartProductsDispatch}>
        {children}
      </CartProductsDispatchContext.Provider>
    </CartProductsContext.Provider>
  );
};
