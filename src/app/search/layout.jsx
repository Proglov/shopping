import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";

export const metadata = {
  title: "فروشگاه آنلاین",
  description: "دسته بندیها",
};

export default function CategoriesLayout({ children }) {
  return (
    <div className="bg-slate-100">
      <NavBar />
      <div className="m-5">{children}</div>
      <FooterMenu active={-1} />
    </div>
  );
}
