import "./globals.css";
import CustomTheme from "../utils/CustomTheme";
import { EdgeStoreProvider } from "../lib/edgestore";
import Providers from "./Providers";

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
            <Providers>
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </Providers>
          </CustomTheme>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
