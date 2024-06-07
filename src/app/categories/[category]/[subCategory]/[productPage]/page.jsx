import BreadCrumbsProduct from "@/components/categorization/BreadCrumbsProduct";
import Item from "@/components/categorization/Item";

export default function ProductPage({ params: { productPage } }) {
  return (
    <>
      <BreadCrumbsProduct location={productPage} />
      <Item productPage={productPage} />
    </>
  );
}
