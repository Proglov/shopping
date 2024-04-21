"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { usePathname } from "next/navigation";
import { GroupingContext, useGrouping } from "@/context/GroupingContext";
import { useContext } from "react";
import Link from "next/link";

export default function BreadCrumbsProduct({ location }) {
  const router = usePathname();
  // const grouping = useGrouping(); ?
  const grouping = useContext(GroupingContext);
  const place = grouping.filter((item) => {
    return item.href === router.split("/")[2];
  });

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
        href={`/categories/${place[0].href}`}
        className="text-base hover:underline text-gray-400"
      >
        {place[0].name}
      </Link>
      <Typography className="text-black text-lg">محصول</Typography>
    </Breadcrumbs>
  );
}
