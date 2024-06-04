import { createSlice } from "@reduxjs/toolkit";

const initialState = [{}];

export const CartProductsSlice = createSlice({
  name: "CartProducts",
  initialState,
  reducers: {
    SetCart: (state, action) => {
      return [...action.payload];
    },
    AddCart: (state, action) => {
      const itemExists = state.find(
        (item) => item.code === action.payload.code
      );

      if (itemExists) {
        const newState = state.map((item) => {
          if (item.code === action.payload.code) {
            return { ...item, number: item.number + 1 };
          }
          return item;
        });
        localStorage.setItem("cart", newState);
        return newState;
      } else {
        const newState = [
          ...state,
          {
            name: action.payload.name,
            number: 1,
            src: action.payload.src,
            price: action.payload.price,
            off: action.payload.off,
            code: action.payload.code.toString(),
          },
        ];
        localStorage.setItem("cart", newState);
        return newState;
      }
    },
    IncrementCart: (state, action) => {
      const newState = state.map((item) => {
        if (item.code === action.payload) {
          return { ...item, number: item.number + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", newState);
      return newState;
    },
    DecrementCart: (state, action) => {
      const newState = state
        .map((item) => {
          if (item.code === action.payload) {
            if (item.number === 1) {
              return null;
            } else {
              return { ...item, number: item.number - 1 };
            }
          }
          return item;
        })
        .filter((item) => item !== null);
      localStorage.setItem("cart", newState);
      return newState;
    },
  },
});
export const { AddCart, IncrementCart, DecrementCart, SetCart } =
  CartProductsSlice.actions;

export default CartProductsSlice.reducer;
