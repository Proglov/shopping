import { CartProductsProvider } from "@/context/CartProductsContext";
import { TimeProvider } from "./TimeContext";
import { AddressProvider } from "./AddressContext";

export const Context = ({ children }) => {
  return (
    <CartProductsProvider>
      <TimeProvider>
        <AddressProvider>{children}</AddressProvider>
      </TimeProvider>
    </CartProductsProvider>
  );
};
