"use client";

import { useAppSelector } from "@/store/Hook";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function CardItemSM({ product }) {
  const router = usePathname();
  const grouping = useAppSelector((state) => state.Grouping);

  const place = grouping.filter((item) => {
    return item.href === router.split("/")[2];
  });

  return (
    <Card className="w-full h-auto p-5 mb-5 flex">
      <CardMedia
        sx={{ width: 100 }}
        className="my-auto ml-3"
        component="img"
        image={product.src}
      />
      <CardContent>
        <Box component="div" className="text-lg">
          {product.name}
        </Box>
        <Box>
          {product.off == "0" ? (
            <div className="h-12"></div>
          ) : (
            <div className="flex justify-start sm:text-base text-sm">
              <span className="bg-red-500 rounded-md mt-2 text-center h-7 sm:min-w-[50px] p-1 text-white">
                {convertToFarsiNumbers(product.off.toString())}%
              </span>
              <div className="flex justify-end m-3 ml-0 mr-1 line-through text-gray-400">
                {convertToFarsiNumbers(
                  formatPrice(parseInt(product.price).toString())
                )}{" "}
                تومان
              </div>
            </div>
          )}
          <div>
            قیمت :
            {convertToFarsiNumbers(
              formatPrice(
                Math.ceil(
                  (parseInt(product.price) * (100 - product.off)) / 100
                ).toString()
              )
            )}{" "}
            تومان
          </div>
        </Box>
        <Box className="mt-3">
          <Link href={`/categories/${place[0].href}/${product.code}`}>
            <Button variant="outlined" color="info" className="w-full">
              مشاهده محصول
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
