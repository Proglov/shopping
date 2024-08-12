import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";

export const metadata = {
  title: "فروشگاه آنلاین",
  description: "پروفایل",
};

export default function ProfileLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <FooterMenu />
    </>
  );
}
