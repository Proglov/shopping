"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from "next/link";
import CategoryApi from "@/services/withoutAuthActivities/categories";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const router = usePathname();
  const id = router.split("/")[2];
  const { getOneCategory } = CategoryApi;
  const [name, setName] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await getOneCategory({ id: id });
        setName(response.category.name);
      } catch (error) { }
    };
    getCategory();
  }, [getOneCategory, id]);

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
        <Typography className="text-black text-lg">{name}</Typography>
      </Breadcrumbs>
    </>
  );
}
