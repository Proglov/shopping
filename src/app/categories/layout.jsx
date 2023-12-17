import FooterMenu from "@/components/home/FooterMenu"
import NavBar from "@/components/home/NavBar"

export const metadata = {
    title: 'فروشگاه آنلاین',
    description: 'دسته بندیها',
}

export default function RootLayout({ children }) {

    return (
        <html lang="fa-IR" dir='rtl'>
            <body>
                <NavBar />
                {children}
                <FooterMenu active={1} />
            </body>
        </html>
    )
}
