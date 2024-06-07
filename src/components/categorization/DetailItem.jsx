"use client";

import { AddCart } from "@/features/CartProducts/CartProductsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Hook";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card } from "@mui/material";
import { usePathname } from "next/navigation";

export default function DetailItem({ detail }) {
  const router = usePathname();
  const dispatch = useAppDispatch();

  return (
    <>
      <Card className="mt-11 mb-10 p-5 sm:grid sm:grid-cols-7 h-fit">
        <Box className="grid grid-rows-2 col-span-3">
          <Box className="sm:text-lg mb-5 text-sm">
            نام محصول: {detail.name}
          </Box>
          <Box className="sm:text-lg text-sm mb-3 sm:mb-0">
            دسته بندی: {detail.subcategoryId.categoryId.name} ،{" "}
            {detail.subcategoryId.name}
          </Box>
        </Box>
        <Box className="grid grid-rows-2 col-span-3">
          <Box className="grid grid-cols-4 sm:w-1/2">
            <Box className="sm:text-lg text-sm mb-5 col-span-3">
              قیمت:{" "}
              {convertToFarsiNumbers(formatPrice(detail.price.toString()))}{" "}
              تومان
            </Box>
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
            onClick={() => {
              dispatch(
                AddCart({
                  name: detail.name,
                  number: 1,
                  src: detail.imagesUrl,
                  price: detail.price,
                  off: detail?.off,
                  code: detail._id,
                })
              );
            }}
          >
            اضافه کردن به سبد خرید
          </Button>
        </Box>
        <div
          className="sm:text-lg text-sm col-span-7 mt-3 sm:mt-0"
          dangerouslySetInnerHTML={{
            __html: `توضیحات محصول: <br/> ${detail.desc}`,
          }}
        ></div>
      </Card>
    </>
  );
}
