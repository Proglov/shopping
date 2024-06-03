import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    code: "546",
    number: 5,
    name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
    src: "/img/home/category-labaniat.jpg",
    price: "1000",
    off: "50",
  },
  {
    code: "525",
    number: 7,
    name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
    src: "/img/home/tanagholat.jpg",
    price: "1700",
    off: "60",
  },
  {
    code: "446",
    number: 1,
    name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
    src: "/img/home/category-labaniat.jpg",
    price: "1080.45",
    off: "0",
  },
  {
    code: "687",
    number: 2,
    name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
    src: "/img/home/tanagholat.jpg",
    price: "1500",
    off: "60",
  },
];

export const CartProductsSlice = createSlice({
  name: "CartProducts",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      const itemExists = state.find(
        (item) => item.code === action.payload.code
      );

      if (itemExists) {
        return state.map((item) => {
          if (item.code === action.payload.code) {
            return { ...item, number: item.number + 1 };
          }
          return item;
        });
      } else {
        return [
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
      }
    },
    IncrementCart: (state, action) => {
      return state.map((item) => {
        if (item.code === action.payload) {
          return { ...item, number: item.number + 1 };
        }
        return item;
      });
    },
    DecrementCart: (state, action) => {
      return state
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
    },
  },
});
export const { AddCart, IncrementCart, DecrementCart } =
  CartProductsSlice.actions;

export default CartProductsSlice.reducer;
