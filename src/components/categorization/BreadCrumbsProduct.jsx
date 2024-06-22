"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CategoryApi from "@/services/withoutAuthActivities/categories";
import SubCategoryApi from "@/services/withoutAuthActivities/subcategories";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";

export default function BreadCrumbsProduct() {
  const router = usePathname();
  const id = router.split("/")[2];
  const subId = router.split("/")[3];
  const productId = router.split("/")[4];
  const { getOneCategory } = CategoryApi;
  const { getOneSubcategory } = SubCategoryApi;
  const { getOneProduct } = ProductApi;
  const [name, setName] = useState("");
  const [nameSub, setNameSub] = useState("");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await getOneCategory({ id: id });
        setName(response.category.name);
      } catch (error) {}
    };
    getCategory();
    const getSubCategory = async () => {
      try {
        const response = await getOneSubcategory({ id: subId });
        setNameSub(response.subcategory.name);
      } catch (error) {}
    };
    getSubCategory();
    const getProduct = async () => {
      try {
        const p = await getOneProduct({ id: productId });
        setProductName(p.data.product.name);
      } catch (error) {}
    };
    getProduct();
  }, [getOneCategory, getOneSubcategory, getOneProduct]);

  return (
    <Breadcrumbs
      separator={<ArrowLeftIcon fontSize="medium" className="text-gray-400" />}
      aria-label="breadcrumb"
    >
      <Link href="/" className="text-base hover:underline text-gray-400">
        خانه
      </Link>
      <Link
        href="/#categorization"
        className="text-base hover:underline text-gray-400"
      >
        دسته بندی
      </Link>
      <Link
        href={`/categories/${id}`}
        className="text-base hover:underline text-gray-400"
      >
        {name}
      </Link>
      <Link
        href={`/categories/${id}/${subId}`}
        className="text-base hover:underline text-gray-400"
      >
        {nameSub}
      </Link>
      <Typography className="text-black text-lg">{productName}</Typography>
    </Breadcrumbs>
  );
}
