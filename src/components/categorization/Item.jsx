"use client";

import GalleryItem from "./GalleryItem";
import DetailItem from "./DetailItem";
import CommentItem from "./CommentItem";
import SimilarProducts from "./SimilarProducts";
import ProductApi from "@/services/withoutAuthActivities/product";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/Hook";

export default function Item({ productPage }) {
  const router = usePathname();
  const { getOneProduct } = ProductApi;
  const allProduct = useAppSelector((state) => state.products);
  const oneProduct = allProduct?.filter((item) => {
    return item.name === router.split("/")[3];
  });

  const product = getOneProduct({ id: oneProduct?.id });

  return (
    <>
      <GalleryItem images={product.imagesUrl} />
      <DetailItem detail={product} />
      <SimilarProducts />
      <CommentItem comments={product.commentsIds} />
    </>
  );
}
