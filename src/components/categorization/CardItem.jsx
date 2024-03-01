import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";

export default function CardItem({ product }) {
  return (
    <Card sx={{ minWidth: 200, height: 330 }} className="ml-4">
      <CardMedia sx={{ height: 150 }} component="img" image={product.src} />
      <CardContent>
        <Box component="div" className="text-lg">
          {product.name}
        </Box>
        <Box>
          {product.off === "0" ? (
            ""
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
          <Button variant="outlined" color="info" className="w-full">
            مشاهده محصول
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
