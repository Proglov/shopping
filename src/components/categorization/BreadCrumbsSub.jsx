"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from "next/link";
import SubCategoryApi from "@/services/withoutAuthActivities/subcategories";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BreadCrumbsSub() {
  const router = usePathname();
  const subId = router.split("/")[3];
  const { getOneSubcategory } = SubCategoryApi;
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [nameSub, setNameSub] = useState("");

  useEffect(() => {
    const getSubCategory = async () => {
      try {
        const response = await getOneSubcategory({ id: subId });
        setNameSub(response.subcategory.name);
        setName(response.subcategory.categoryId.name);
        setId(response.subcategory.categoryId._id);
      } catch (error) {}
    };
    getSubCategory();
  }, [getOneSubcategory]);

  return (
    <>
      <Breadcrumbs
        separator={
          <ArrowLeftIcon fontSize="medium" className="text-gray-400" />
        }
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
        <Typography className="text-black text-lg">{nameSub}</Typography>
      </Breadcrumbs>
    </>
  );
}
