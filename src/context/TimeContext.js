"use client";

import { TimeReducer, initialTime } from "@/Reducers/TimeReducer";
import { createContext, useContext, useReducer } from "react";

export const TimeContext = createContext();
export const TimeDispatchContext = createContext();

export function useTime() {
  return useContext(TimeContext);
}

export function useTimeDispatch() {
  return useContext(TimeDispatchContext);
}

export const TimeProvider = ({ children }) => {
  const [Time, TimeDispatch] = useReducer(TimeReducer, initialTime);
  return (
    <TimeContext.Provider value={Time}>
      <TimeDispatchContext.Provider value={TimeDispatch}>
        {children}
      </TimeDispatchContext.Provider>
    </TimeContext.Provider>
  );
};
