import "./globals.css";
import CustomTheme from "../utils/CustomTheme";
import { EdgeStoreProvider } from "../lib/edgestore";
import { Context } from "@/context/Context";

export const metadata = {
  title: "فروشگاه آنلاین",
  description: "فروشگاه آنلاین",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>
        <EdgeStoreProvider>
          <CustomTheme>
            <Context>{children}</Context>
          </CustomTheme>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
