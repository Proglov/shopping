"use client";

import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/Hook";

export default function CardItem({ product }) {
  const router = usePathname();
  const grouping = useAppSelector((state) => state.Grouping);

  const place = grouping.filter((item) => {
    return item.href === router.split("/")[2];
  });

  return (
    <Card sx={{ maxWidth: 200, height: 330 }} className="mt-5 ml-6">
      <CardMedia
        sx={{ height: 150, width: 200 }}
        component="img"
        image={product.imagesUrl[0]}
      />
      <CardContent>
        <Box component="div" className="text-lg break-words">
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
