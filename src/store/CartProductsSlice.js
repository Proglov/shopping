import { loadCartState } from "@/store/Storage/Storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = loadCartState();

export const CartProductsSlice = createSlice({
  name: "CartProducts",
  initialState,
  reducers: {
    SetCart: (_state, action) => {
      return action.payload;
    },
    AddCart: (state, action) => {
      const newState = [
        ...state,
        {
          number: 1,
          _id: action.payload.id.toString(),
          sellerId: action.payload.sellerId.toString(),
          which: action.payload.which.toString(),
        }
      ];
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    IncrementCart: (state, action) => {
      const newState = state.map((item) => {
        if (item._id === action.payload) {
          return { ...item, number: item.number + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    DecrementCart: (state, action) => {
      const newState = state
        .map((item) => {
          if (item._id === action.payload) {
            if (item.number === 1) {
              return null;
            } else {
              return { ...item, number: item.number - 1 };
            }
          }
          return item;
        })
        .filter((item) => item !== null);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    ResetCartProducts: () => {
      localStorage.setItem("cart", []);
      return []
    }
  },
});

export const { AddCart, IncrementCart, DecrementCart, SetCart, ResetCartProducts } = CartProductsSlice.actions;

export default CartProductsSlice.reducer;