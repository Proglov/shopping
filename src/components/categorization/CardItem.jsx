"use client";

import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CardItem({ product }) {
  const router = usePathname();
  const id = router.split("/")[2];
  const subId = product.subcategoryId;

  return (
    <Card className="ml-6 max-w-[200px] md:h-[300px] h-[280px]">
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
        <Box className="mt-3 text-center">
          <Link href={`/categories/${id}/${subId}/${product._id}`}>
            <Button variant="outlined" color="info" className="md:w-full md:text-base text-xs">
              مشاهده محصول
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
