"use client";

import { useAppSelector } from "@/store/Hook";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        image={product.imagesUrl[0]}
      />
      <CardContent>
        <Box component="div" className="text-lg">
          {product.name}
        </Box>
        <Box>
          قیمت :
          {convertToFarsiNumbers(
            formatPrice(Math.ceil(parseInt(product.price)).toString())
          )}{" "}
          تومان
        </Box>
        <Box className="mt-3">
          <Link href={`/categories/${place[0].href}/${product._id}`}>
            <Button variant="outlined" color="info" className="w-full">
              مشاهده محصول
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
