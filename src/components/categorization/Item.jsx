"use client";
import GalleryItem from "./GalleryItem";
import DetailItem from "./DetailItem";
import CommentItem from "./CommentItem";
import ProductApi from "@/services/withoutAuthActivities/product";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { GradientCircularProgress } from "@/app/loading";

export default function Item() {
  const path = usePathname();
  const router = useRouter()
  const { getOneProduct } = ProductApi;
  const [product, setProduct] = useState({
    desc: "",
    imagesUrl: [],
    name: "",
    price: 0,
    subcategoryId: {
      categoryId: {
        name: "",
      },
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const p = await getOneProduct({ id: path.split("/")[4] });
        setProduct({ ...p?.product });
      } catch (error) {
        router.push('/not-found')
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [getOneProduct, setProduct, path]);

  if (isLoading) {
    return (
      <div className="mt-5 grid justify-center h-[400px]">
        <GradientCircularProgress />
      </div>
    );
  }
  return (
    <>
      <GalleryItem images={product.imagesUrl} />
      <DetailItem product={product} />
      <CommentItem productID={path.split("/")[4]} />
      {/* <SimilarProducts /> */}
    </>
  );
}
