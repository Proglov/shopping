"use client";

import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button } from "@mui/material";

export default function DetailItem({ detail }) {
  return (
    <>
      <Box className="mt-11 mb-10 p-5 sm:grid sm:grid-cols-7 bg-slate-100 h-fit">
        <Box className="grid grid-rows-2 col-span-3">
          <Box className="sm:text-lg mb-5 text-sm">
            نام محصول: {detail.name}
          </Box>
          <Box className="sm:text-lg text-sm mb-3 sm:mb-0">
            یک توضیح مناسب محصول در این قسمت قرار میگیرد.
          </Box>
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
        <Box className="sm:text-lg text-sm">
          دسته بندی:
        </Box>
      </Box>
    </>
  );
}
