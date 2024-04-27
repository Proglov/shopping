import BreadCrumbsProduct from "@/components/categorization/BreadCrumbsProduct";
import GalleryItem from "@/components/categorization/GalleryItem";
import DetailItem from "@/components/categorization/DetailItem";
import CommentItem from "@/components/categorization/CommentItem";
import SimilarProducts from "@/components/categorization/SimilarProducts";

export default function ProductPage({ params: { productPage } }) {
  const product = {
    name: "خرما",
    price: "5456245",
    off: 40,
    src: ["/img/home/category-labaniat.jpg", "/img/home/category-labaniat.jpg"],
    comments: [
      { message: "salam", name: "amir" },
      { message: "khoda", name: "ali" },
    ],
  };
  return (
    <>
      <BreadCrumbsProduct location={productPage} />
      <GalleryItem images={product.src} />
      <DetailItem detail={product} />
      <SimilarProducts />
      <CommentItem comments={product.comments} />
    </>
  );
}
