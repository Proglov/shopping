import BreadCrumbs from "@/components/categorization/BreadCrumbs";
// import FilterProducts from "@/components/categorization/FilterProducts";
import Products from "@/components/categorization/Products";

export default function Category({ params: { category } }) {
  return (
    <>
      <BreadCrumbs location={category}/>
      {/* <FilterProducts /> */}
      <Products />
    </>
  );
}
