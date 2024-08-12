"use client";
import {
  AddCart,
  DecrementCart,
  IncrementCart,
} from "@/store/CartProductsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Hook";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";
import { GiShoppingCart } from "react-icons/gi";


export default function DetailItem({ product }) {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.CartProducts);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const item = cartProducts.find((item) => item._id === product._id)
    setNumber(item?.number?.toString());
  }, [setNumber, cartProducts, product._id]);

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
        {cartProducts.find((item) => item._id === product._id) ? (
          <div className="border border-red-400 rounded-lg w-fit inline-block">
            <Button
              sx={{ color: red[400] }}
              onClick={() => dispatch(IncrementCart(product._id))}
            >
              <AddIcon />
            </Button>
            <span className="text-red-500">
              {convertToFarsiNumbers(number)}
            </span>
            <Button
              className="mx-0"
              sx={{ color: red[400] }}
              onClick={() => dispatch(DecrementCart(product._id))}
            >
              {number == 1 ? (
                <DeleteOutlineOutlinedIcon />
              ) : (
                <RemoveOutlinedIcon />
              )}
            </Button>
          </div>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            className="sm:w-fit sm:text-base text-xs"
            onClick={() => { dispatch(AddCart(product._id)) }}
          >
            افزودن به سبد
            <GiShoppingCart />
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
