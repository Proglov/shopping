"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/store/Hook";

export default function BreadCrumbsProduct({ location }) {
  const router = usePathname();
  const grouping = useAppSelector((state) => state.Grouping);
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
