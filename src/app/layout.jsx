import './globals.css'
import CustomTheme from '../utils/CustomTheme'
import { EdgeStoreProvider } from '../lib/edgestore';

export const metadata = {
  title: 'نخبگان',
  description: 'سایت نخبگان',
}

export default function RootLayout({ children }) {

  return (
    <html lang="fa-IR" dir='rtl'>
      <body>
        <EdgeStoreProvider>
          <CustomTheme>
            {children}
          </CustomTheme>
        </EdgeStoreProvider>
      </body>
    </html>
  )
}
