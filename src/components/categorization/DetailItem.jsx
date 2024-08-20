import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Grid } from "@mui/material";
import AddButton from "../AddButton";


export default function DetailItem({ product }) {

  return (
    <Grid container className="mt-3 mx-auto w-full max-w-4xl">
      <Grid item xs={12} sm={6} md={4} className="p-3 text-center">
        نام محصول
        <span className="text-red-600 ml-1">:</span>
        {product.name}
      </Grid>
      <Grid item xs={12} sm={6} md={4} className="p-3 text-center">
        دسته بندی
        <span className="text-red-600 ml-1">:</span>
        <span className="sm:text-lg md:text-xl text-sm">
          {product.subcategoryId.categoryId.name}
          <span className="text-red-600 mx-1">،</span>
          {product.subcategoryId.name}
        </span>
      </Grid>
      <Grid item xs={12} sm={6} md={4} className="p-3 text-center">
        قیمت<span className="text-red-600 ml-1">:</span>
        <span className="sm:text-lg md:text-xl text-sm">
          {convertToFarsiNumbers(
            formatPrice(Math.ceil(parseInt(product.price)).toString())
          )}
          {" "}
        </span>
        تومان
      </Grid>
      <Grid item xs={12} className="p-3 flex sm:justify-start justify-center mr-5 sm:text-base text-sm">
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
        <AddButton productId={product._id} which='' sellerId={product.sellerId} />
      </Grid>
    </Grid>
  );
}
