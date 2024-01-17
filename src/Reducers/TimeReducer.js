import { Action_ChangeTime, Action_SetTime } from "./ActionType";

export const initialTime = {
  day: 0, // today = 0 , tomorrow = 1
  time: [0, 0], // [start,end]
  price: "0",
  select: false,
};

export function TimeReducer(state, action) {
  switch (action.type) {
    case Action_ChangeTime: {
      return {
        ...state,
        select: false,
      };
    }
    case Action_SetTime: {
      return {
        day: action.payload.day,
        time: action.payload.time,
        price: action.payload.price,
        select: action.payload.select,
      };
    }
    default: {
      return state;
    }
  }
}
