"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CategoryApi from "@/services/withoutAuthActivities/categories";
import SubCategoryApi from "@/services/withoutAuthActivities/subcategories";
import { useEffect, useState } from "react";

export default function BreadCrumbsProduct() {
  const router = usePathname();
  const id = router.split("/")[2];
  const subId = router.split("/")[3];
  const { getOneCategory } = CategoryApi;
  const { getOneSubcategory } = SubCategoryApi;
  const [name, setName] = useState("");
  const [nameSub, setNameSub] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await getOneCategory({ id: id });
        setName(response.category.name);
      } catch (error) { }
    };
    getCategory();
    const getSubCategory = async () => {
      try {
        const response = await getOneSubcategory({ id: subId });
        setNameSub(response.subcategory.name);
      } catch (error) { }
    };
    getSubCategory();
  }, [getOneCategory, getOneSubcategory, id, subId]);

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
      <Typography className="text-black text-lg">محصول</Typography>
    </Breadcrumbs>
  );
}
