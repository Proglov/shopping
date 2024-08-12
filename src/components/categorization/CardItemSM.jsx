"use client";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { red } from "@mui/material/colors";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  AddCart,
  DecrementCart,
  IncrementCart,
} from "@/store/CartProductsSlice";
import { GiShoppingCart } from "react-icons/gi";


export default function CardItemSM({ product, subID, id, cartProducts }) {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const item = cartProducts.find((item) => item._id === product._id)
    setNumber(item?.number?.toString());
  }, [setNumber, cartProducts, product._id]);

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
              className="sm:w-full"
              onClick={() => { dispatch(AddCart(product._id)) }}
            >
              افزودن به سبد
              <GiShoppingCart />
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
