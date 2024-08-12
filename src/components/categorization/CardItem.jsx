"use client";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import {
  AddCart,
  DecrementCart,
  IncrementCart,
} from "@/store/CartProductsSlice";
import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { GiShoppingCart } from "react-icons/gi";

export default function CardItem({ product, subID, id, cartProducts }) {
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
              className="sm:w-full sm:text-base text-xs"
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
