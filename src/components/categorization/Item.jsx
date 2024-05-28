import GalleryItem from "./GalleryItem";
import DetailItem from "./DetailItem";
import CommentItem from "./CommentItem";
import SimilarProducts from "./SimilarProducts";
import ProductApi from "@/services/withoutAuthActivities/product";

export default function Item({ productPage }) {
  const product = {
    name: "خرما",
    price: "5456245",
    off: 40,
    src: ["/img/home/category-labaniat.jpg", "/img/home/category-labaniat.jpg"],
    comments: [
      { message: "salam", name: "amir", id: 5456 },
      { message: "khoda", name: "ali", id: 4568 },
    ],
  };

  // const pro = ProductApi.getOneProduct({id = ...});
  return (
    <>
      <GalleryItem images={product.src} />
      <DetailItem detail={product} />
      <SimilarProducts />
      <CommentItem comments={product.comments} />
    </>
  );
}
