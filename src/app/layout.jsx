import "./globals.css";
import CustomTheme from "../utils/CustomTheme";
import Providers from "./Providers";

export const metadata = {
  title: "فروشگاه آنلاین",
  description: "فروشگاه آنلاین",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>
        <CustomTheme>
          <Providers>
            {children}
          </Providers>
        </CustomTheme>
      </body>
    </html>
  );
}
