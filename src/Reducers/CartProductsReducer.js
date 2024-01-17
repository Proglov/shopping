import {
  Action_AddCart,
  Action_DecrementCart,
  Action_IncrementCart,
} from "./ActionType";

export const initialCartProducts = [
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

export function CartProductsReducer(state, action) {
  switch (action.type) {
    case Action_AddCart: {
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
            code: action.payload.code,
          },
        ];
      }
    }
    case Action_IncrementCart: {
      return state.map((item) => {
        if (item.code === action.payload) {
          return { ...item, number: item.number + 1 };
        }
        return item;
      });
    }
    case Action_DecrementCart: {
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
    }
    default: {
      return state;
    }
  }
}
