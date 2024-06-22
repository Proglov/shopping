"use client";

import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AddCart,
  DecrementCart,
  IncrementCart,
} from "@/features/CartProducts/CartProductsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Hook";
import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";

export default function CardItem({ product, subID }) {
  const router = usePathname();
  const id = router.split("/")[2];
  const subId = subID;
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.CartProducts);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const item = cartProducts.filter((item) => item.code === product._id)[0];
    setNumber(item?.number?.toString());
  }, [setNumber, cartProducts]);

  return (
    <Card className="ml-6 max-w-[200px] md:h-[330px] h-[300px]">
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
            <Button
              variant="outlined"
              color="info"
              className="md:w-full md:text-base text-xs"
            >
              مشاهده محصول
            </Button>
          </Link>
        </Box>
        <Box className="mt-3 text-center">
          {cartProducts.find((item) => item.code === product._id) ? (
            <div className="border border-gray-400 rounded-lg w-auto inline-block">
              <Button
                className="hover:bg-white active:bg-white rounded-lg w-auto"
                sx={{ color: red[400] }}
                onClick={() => dispatch(IncrementCart(product._id))}
              >
                <AddIcon />
              </Button>
              <span className="text-red-500">
                {convertToFarsiNumbers(number)}
              </span>
              <Button
                className="hover:bg-white active:bg-white rounded-lg w-auto"
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
              color="success"
              className="md:w-full md:text-base text-xs"
              onClick={() => {
                dispatch(
                  AddCart({
                    name: product.name,
                    number: 1,
                    src: product.imagesUrl,
                    price: product.price,
                    off: product?.off,
                    code: product._id,
                  })
                );
              }}
            >
              خرید محصول
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
