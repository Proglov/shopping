import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import AddButton from "../AddButton";


export default function CardItemSM({ product, subID, id }) {


  let img;
  if (product?.imagesUrl?.length !== 0) {
    img = product.imagesUrl[0]
  } else
    img = "/img/no-pic.png"

  return (
    <Card className="w-full h-auto p-5 mb-5 flex">
      <CardMedia
        sx={{ width: 100 }}
        className="my-auto ml-3"
        component="img"
        image={img}
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
          <Link href={`/categories/${id}/${subID}/${product._id}`}>
            <Button variant="outlined" color="info" className="w-full">
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
