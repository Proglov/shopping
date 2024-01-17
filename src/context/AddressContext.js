"use client";

import { createContext, useContext, useState } from "react";

export const AddressContext = createContext();
export const SetAddressContext = createContext();

export function useAddress() {
  return useContext(AddressContext);
}
export function useSetAddress() {
  return useContext(SetAddressContext);
}

export const AddressProvider = ({ children }) => {
  const [Address, setAddress] = useState("");
  return (
    <AddressContext.Provider value={Address}>
      <SetAddressContext.Provider value={setAddress}>
        {children}
      </SetAddressContext.Provider>
    </AddressContext.Provider>
  );
};
