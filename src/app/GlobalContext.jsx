"use client";
import { createContext } from "react";

export const GlobalContext = createContext()

export default function GlobalContextProvider({ children, backend }) {
  return <GlobalContext.Provider value={{ backend }}>{children}</GlobalContext.Provider>;
}
