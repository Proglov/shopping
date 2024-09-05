import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import AddButton from "../AddButton";


export default function CardItem({ product, subID, id, margin = 1 }) {
  let img;
  if (product?.imagesUrl?.length !== 0) {
    img = product.imagesUrl[0]
  } else
    img = "/img/no-pic.png"

  return (
    <Card className={`relative mx-${margin} max-w-[200px] min-h-[400px] p-1 mb-2 shadow-lg`} sx={{ border: '1px solid #dbd9d9' }}>
      <CardMedia
        sx={{ height: 150, width: 200 }}
        component="img"
        image={img}
      />
      <CardContent>

        <Box component="h2" className="text-lg flex justify-between items-center">
          <span>{product.name}</span>
          {
            product?.which === 'festival' &&
            <span className='bg-red-500 rounded-2xl text-center self-center sm:min-w-[50px] min-w-[40px] sm:text-base text-xs p-1 text-white'>
              {convertToFarsiNumbers(product?.festivalOffPercentage.toString())}%
            </span>
          }
        </Box>

        <Box className={`p-3 pr-0 ${product?.which !== 'major' && 'mt-3'} flex`}>
          قیمت
          <span className="text-red-600 ml-1">:</span>

          {
            product?.which === 'festival' ?
              <span className="sm:text-base text-sm flex flex-col">
                <span>
                  {convertToFarsiNumbers(
                    formatPrice(Math.floor((product.price * (1 - product.festivalOffPercentage / 100))).toString())
                  )}
                </span>
                <span className="line-through text-red-600">
                  {convertToFarsiNumbers(
                    formatPrice(product.price.toString())
                  )}
                </span>
              </span>
              :
              <span>
                {convertToFarsiNumbers(
                  formatPrice(product.price.toString())
                )}
              </span>
          }
          <span className="mr-1">
            تومان
          </span>
        </Box>

        {
          product.which === 'major' &&
          <Box className='text-cyan-500 text-xs'>
            با خرید حداقل {convertToFarsiNumbers(product.quantity)} عدد، {convertToFarsiNumbers(product.majorOffPercentage)}% تخفیف بگیر!
          </Box>

        }

        <Box className='absolute bottom-1 min-h-[120px]'>
          <Box className="my-3 text-center">
            <AddButton productId={product._id} which={product.which} quantity={product?.quantity} profit={product.price * product?.majorOffPercentage / 100} sellerId={product.sellerId} />
          </Box>
          <Link href={`/categories/${id}/${subID}/${product._id}`}>
            <Button
              variant="outlined"
              color="info"
              className="sm:w-full text-sm"
            >
              مشاهده محصول
            </Button>
          </Link>
        </Box>

      </CardContent>
    </Card>
  );
}