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
  const [product, setProduct] = useState({
    desc: "",
    imagesUrl: [],
    name: "",
    price: 0,
    sellerId: "",
    subcategoryId: {
      categoryId: {
        name: "",
      },
    },
    __v: 0,
    _id: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const p = await getOneProduct({ id: router.split("/")[4] });
        setProduct({ ...p.data.product });
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    getProduct();
  }, [getOneProduct, setProduct, router]);

  return (
    <>
      <GalleryItem images={product.imagesUrl} />
      <DetailItem detail={product} />
      <SimilarProducts />
      {/* <CommentItem /> */}
    </>
  );
}
