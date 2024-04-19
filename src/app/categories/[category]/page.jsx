import BreadCrumbs from "@/components/categorization/BreadCrumbs";
import Products from "@/components/categorization/Products";

export default function Category({ params: { category } }) {
  return (
    <>
      <BreadCrumbs location={category}/>
      <Products />
    </>
  );
}
