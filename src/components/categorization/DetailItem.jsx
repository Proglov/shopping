"use client";

import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card } from "@mui/material";
import { usePathname } from "next/navigation";
import { GroupingContext, useGrouping } from "@/context/GroupingContext";
import { useContext } from "react";

export default function DetailItem({ detail }) {
  const router = usePathname();
  // const grouping = useGrouping(); ?
  const grouping = useContext(GroupingContext);

  const place = grouping.filter((item) => {
    return item.href === router.split("/")[2];
  });

  return (
    <>
      <Card className="mt-11 mb-10 p-5 sm:grid sm:grid-cols-7 h-fit">
        <Box className="grid grid-rows-3 col-span-3">
          <Box className="sm:text-lg mb-5 text-sm">
            نام محصول: {detail.name}
          </Box>
          <Box className="sm:text-lg text-sm mb-3 sm:mb-0">
            دسته بندی: {place[0].name}
          </Box>
          <Box className="sm:text-lg text-sm mb-3 sm:mb-0">برند:</Box>
        </Box>
        <Box className="grid grid-rows-2 col-span-3">
          <Box className="grid grid-cols-4 sm:w-1/2">
            <Box
              className={`sm:text-lg text-sm mb-5 col-span-3  ${
                detail.off != 0 ? "line-through text-gray-400" : ""
              }`}
            >
              قیمت:{" "}
              {convertToFarsiNumbers(formatPrice(detail.price.toString()))}{" "}
              تومان
            </Box>
            <span className="bg-red-500 rounded-md text-center h-7 sm:pt-1 pt-1.5 sm:min-w-[50px] p-1 text-white">
              {convertToFarsiNumbers(detail.off.toString())}%
            </span>
          </Box>
          <Box className="sm:text-lg text-sm">
            قیمت با تخفیف:{" "}
            {convertToFarsiNumbers(
              formatPrice(parseInt(detail.price).toString())
            )}{" "}
            تومان
          </Box>
        </Box>
        <Box className="sm:my-auto flex justify-center">
          <Button
            variant="outlined"
            className="bg-green-500 border-green-600 hover:border-green-700 hover:bg-green-600 text-white font-medium float-left rounded-lg"
            sx={{
              fontSize: {
                xs: "10px",
                sm: "10px",
                md: "10px",
                lg: "14px",
                xl: "14px",
              },
            }}
          >
            اضافه کردن به سبد خرید
          </Button>
        </Box>
        <Box className="sm:text-lg text-sm col-span-7 mt-3 sm:mt-0">
          یک توضیح مناسب محصول در این قسمت قرار میگیرد.
        </Box>
      </Card>
    </>
  );
}
