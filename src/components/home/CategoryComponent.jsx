import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryComponent({
  src,
  caption,
  href,
  charachtersLengthLevel,
}) {
  return (
    <div className="mx-auto">
      <Link href={`/categories/${href}`} className="bg-blue-300">
        <Image
          alt="دسته بندی"
          src={src}
          width={200}
          height={200}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: " 0.5rem",
          }}
        />

        <Typography
          className="text-center"
          sx={{
            fontSize: {
              xs: `${
                charachtersLengthLevel === 2
                  ? "12px"
                  : charachtersLengthLevel === 1
                  ? "14px"
                  : "15px"
              }`,
              sm: "15px",
              md: "16px",
              lg: "18px",
            },
          }}
        >
          {caption}
        </Typography>
      </Link>
    </div>
  );
}
