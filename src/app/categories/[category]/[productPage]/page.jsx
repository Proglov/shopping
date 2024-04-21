import BreadCrumbsProduct from "@/components/categorization/BreadCrumbsProduct";
import GalleryItem from "@/components/categorization/GalleryItem";
import DetailItem from "@/components/categorization/DetailItem";
import Offers from "@/components/Shopping card/Offers";
import CommentItem from "@/components/categorization/CommentItem";

export default function ProductPage({ params: { productPage } }) {
  const product = {
    name: "خرما",
    price: "5456245",
    off: 40,
    src: ["/img/home/category-labaniat.jpg", "/img/home/category-labaniat.jpg"],
    comments: ["salam", "khoda"],
  };
  return (
    <>
      <BreadCrumbsProduct location={productPage} />
      <GalleryItem images={product.src} />
      <DetailItem detail={product} />
      <Offers />
      <CommentItem comments={product.comments} />
    </>
  );
}
