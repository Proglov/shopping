"use client";

import GalleryItem from "./GalleryItem";
import DetailItem from "./DetailItem";
import CommentItem from "./CommentItem";
import SimilarProducts from "./SimilarProducts";
import ProductApi from "@/services/withoutAuthActivities/product";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/Hook";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const p = await getOneProduct({ id: router.split("/")[4] });
        setProduct({ ...p.data.product });
      } catch (error) {
        toast.error("دوباره تلاش کنید", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [getOneProduct, setProduct, router]);
  if (isLoading) {
    return <div className="mt-5">درحال دریافت اطلاعات</div>;
  }
  return (
    <>
      <GalleryItem images={product.imagesUrl} />
      <DetailItem detail={product} />
      {/* <SimilarProducts /> */}
      <CommentItem />
    </>
  );
}
