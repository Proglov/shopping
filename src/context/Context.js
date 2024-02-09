import { CartProductsProvider } from "@/context/CartProductsContext";
import { TimeProvider } from "./TimeContext";
import { AddressProvider } from "./AddressContext";
import { LoginProvider } from "./LoginContext";

export const Context = ({ children }) => {
  return (
    <LoginProvider>
      <CartProductsProvider>
        <TimeProvider>
          <AddressProvider>{children}</AddressProvider>
        </TimeProvider>
      </CartProductsProvider>
    </LoginProvider>
  );
};
