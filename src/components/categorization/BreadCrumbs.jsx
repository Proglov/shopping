"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from "next/link";
import { useAppSelector } from "@/store/Hook";

export default function BreadCrumbs({ location }) {
  const grouping = useAppSelector((state) => state.Grouping);
  const title = (loc) => {
    const place = grouping.filter((item) => {
      return item.href === loc;
    });
    return place[0].name;
  };

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
        <Typography className="text-black text-lg">
          {title(location)}
        </Typography>
      </Breadcrumbs>
    </>
  );
}
