"use client";

import { createContext, useContext, useState } from "react";

export const LoginContext = createContext();
export const SetLoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}
export function useSetLogin() {
  return useContext(SetLoginContext);
}

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  return (
    <LoginContext.Provider value={login}>
      <SetLoginContext.Provider value={setLogin}>
        {children}
      </SetLoginContext.Provider>
    </LoginContext.Provider>
  );
};
