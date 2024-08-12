import Item from "@/components/categorization/Item";

export default function ProductPage({ params: { productPage } }) {
  return (
    <Item productPage={productPage} />
  );
}
