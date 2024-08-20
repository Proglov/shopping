import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import AddButton from "../AddButton";

export default function CardItem({ product, subID, id }) {


  let img;
  if (product?.imagesUrl?.length !== 0) {
    img = product.imagesUrl[0]
  } else
    img = "/img/no-pic.png"

  return (
    <Card className="ml-6 max-w-[200px] p-1 mb-2 shadow-lg" sx={{ border: '1px solid #dbd9d9' }}>
      <CardMedia
        sx={{ height: 150, width: 200 }}
        component="img"
        image={img}

      />
      <CardContent>
        <Box component="h2" className="text-lg">
          {product.name}
        </Box>
        <Box>
          قیمت<span className="text-red-600 ml-1">:</span>
          {convertToFarsiNumbers(
            formatPrice(Math.ceil(parseInt(product.price)).toString())
          )}{" "}
          تومان
        </Box>
        <Box className="mt-3 text-center">
          <Link href={`/categories/${id}/${subID}/${product._id}`}>
            <Button
              variant="outlined"
              color="info"
              className="sm:w-full sm:text-base text-xs"
            >
              مشاهده محصول
            </Button>
          </Link>
        </Box>
        <Box className="mt-3 text-center">
          <AddButton productId={product._id} which='' sellerId={product.sellerId} />
        </Box>
      </CardContent>
    </Card>
  );
}
