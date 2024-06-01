"use client";

import GalleryItem from "./GalleryItem";
import DetailItem from "./DetailItem";
import CommentItem from "./CommentItem";
import SimilarProducts from "./SimilarProducts";
import ProductApi from "@/services/withoutAuthActivities/product";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/Hook";
import { useEffect, useState } from "react";

export default function Item() {
  const router = usePathname();
  const { getOneProduct } = ProductApi;
  const allProduct = useAppSelector((state) => state.products);
  const oneProduct = allProduct?.filter((item) => {
    return item.name === router.split("/")[3];
  });
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const p = await getOneProduct({ id: oneProduct?._id });
        setProduct({ ...p });
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    getProduct();
  }, [getOneProduct, setProduct]);

  return (
    <>
      <GalleryItem images={product.imagesUrl} />
      <DetailItem detail={product} />
      <SimilarProducts />
      <CommentItem comments={product.commentsIds} />
    </>
  );
}
