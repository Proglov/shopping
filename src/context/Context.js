import { CartProductsProvider } from "@/context/CartProductsContext";
import { TimeProvider } from "./TimeContext";
import { AddressProvider } from "./AddressContext";
import { LoginProvider } from "./LoginContext";
import { GroupingProvider } from "./GroupingContext";

export const Context = ({ children }) => {
  return (
    <LoginProvider>
      <CartProductsProvider>
        <TimeProvider>
          <AddressProvider>
            <GroupingProvider>{children}</GroupingProvider>
          </AddressProvider>
        </TimeProvider>
      </CartProductsProvider>
    </LoginProvider>
  );
};
