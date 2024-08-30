import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Grid, Typography } from "@mui/material";
import AddButton from "../AddButton";


export default function DetailItem({ product }) {

  return (
    <Grid container className="mt-3 mx-auto w-full max-w-4xl">

      <>
        {
          product?.which === 'festival' ?
            <Grid item xs={12} className="p-3 text-center text-teal-500 sm:text-base text-xs">
              این محصول در طرح جشنواره شگفت انگیز، {" "}
              {convertToFarsiNumbers(product.festivalOffPercentage)} درصد تخفیف خورده !
            </Grid>
            : product?.which === 'major' &&
            <Grid item xs={12} className="p-3 text-center text-teal-500">
              <Typography className="sm:text-base text-sm">
                این محصول در طرح محصولات عمده حضور دارد
              </Typography>
              <Typography className="sm:text-base text-sm">
                با خرید حداقل {convertToFarsiNumbers(product.quantity)} عدد، {convertToFarsiNumbers(product.majorOffPercentage)} درصد تخفیف بگیرید !
              </Typography>
            </Grid>
        }
      </>

      <Grid item xs={12} sm={6} md={4} className="p-3 text-center">
        نام محصول
        <span className="text-red-600 ml-1">:</span>
        {product.name}
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="p-3 text-center">
        دسته بندی
        <span className="text-red-600 ml-1">:</span>
        <span className="sm:text-lg md:text-xl text-sm">
          {product.categoryName}
          <span className="text-red-600 mx-1">،</span>
          {product.subcategoryName}
        </span>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="p-3 text-center flex justify-center">
        قیمت<span className="text-red-600 ml-1">:</span>

        {
          product?.which === 'festival' ?
            <span className="sm:text-lg md:text-xl text-sm flex flex-col">
              <span>
                {convertToFarsiNumbers(
                  formatPrice(Math.floor((product.price * (1 - product.festivalOffPercentage / 100))).toString())
                )}
              </span>
              <span className="line-through text-xs">
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
      </Grid>

      <Grid item xs={12} className="p-3 flex sm:justify-start justify-center sm:mr-12 md:mr-14 lg:mr-16 sm:text-base text-sm">
        توضیحات محصول
        <span className="text-red-600 ml-1">:</span>
        <div
          className="sm:text-lg md:text-xl text-sm"
          dangerouslySetInnerHTML={{
            __html: product.desc,
          }}
        />
      </Grid>

      <Grid item xs={12} className="mt-3 text-center">
        <AddButton productId={product._id} which={product.which} quantity={product?.quantity} profit={product.price * product?.majorOffPercentage / 100} sellerId={product.sellerId} />
      </Grid>

    </Grid>
  );
}
