import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";

export const metadata = {
  title: "فروشگاه آنلاین",
  description: "پروفایل",
};

export default function ProfileLayout({ children }) {
  return (
    <>
      <div className="bg-gray-100">
        <NavBar />
        {children}
        <FooterMenu />
      </div>
    </>
  );
}
