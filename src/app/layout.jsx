import "./globals.css";
import CustomTheme from "../utils/CustomTheme";
import Providers from "./Providers";
import { ToastContainer } from "react-toastify";
import GlobalContextProvider from "./GlobalContext";

export const metadata = {
  title: "فروشگاه آنلاین",
  description: "فروشگاه آنلاین",
};

export default function RootLayout({ children }) {
  const backend = process.env.NEXT_PUBLIC_BackEnd_API

  return (
    <html lang="fa-IR" dir="rtl">
      <body className="bg-slate-100">
        <CustomTheme>
          <GlobalContextProvider backend={backend}>
            <Providers>{children}</Providers>
          </GlobalContextProvider>
        </CustomTheme>
        <ToastContainer />
      </body>
    </html>
  );
}
