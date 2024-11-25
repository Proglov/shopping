import "./globals.css";
import CustomTheme from "../utils/CustomTheme";
import Providers from "./Providers";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "فروشگاه آنلاین",
  description: "فروشگاه آنلاین",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className="bg-slate-100">
        <CustomTheme>
          <Providers>{children}</Providers>
        </CustomTheme>
        <ToastContainer />
      </body>
    </html>
  );
}
