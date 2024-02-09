"use client";

import { Box, Button, Dialog, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useState } from "react";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import ShoppingCard from "./ShoppingCard";
import Link from "next/link";
import { useCartProducts } from "@/context/CartProductsContext";
import { useLogin } from "@/context/LoginContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart({ Close, Open }) {
  const login = useLogin();
  const minPrice = 150000;

  const cartProducts = useCartProducts();

  let counter = cartProducts
    .reduce((accumulator, currentObject) => {
      return accumulator + currentObject.number;
    }, 0)
    .toString();

  return (
    <>
      <Dialog
        fullScreen
        open={Open}
        onClose={Close}
        TransitionComponent={Transition}
      >
        <Box
          className="grid grid-cols-3 p-3 mb-5 shadow-xl border-b-2 border-gray-100 md:ml-1 md:mr-1 items-center"
          component="div"
        >
          <Box component="div" className="col-span-2 md:mr-3">
            <Box
              component="span"
              className="ml-2 md:ml-3"
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "25px",
                  md: "32px",
                  lg: "32px",
                  xl: "32px",
                },
              }}
            >
              سبد خرید من
            </Box>
            <Box
              component="span"
              sx={{
                fontSize: {
                  xs: "16px",
                  sm: "20px",
                  md: "26px",
                  lg: "26px",
                  xl: "26px",
                },
              }}
            >
              {convertToFarsiNumbers(counter)} کالا
            </Box>
          </Box>
          <Box component="div" className="grid justify-end">
            <IconButton onClick={Close}>
              <CloseIcon
                className="text-blue-700"
                sx={{
                  fontSize: {
                    xs: "25px",
                    sm: "35px",
                    md: "45px",
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <ShoppingCard step={0} />
        <Box
          className="grid justify-center text-blue-700 text-xl"
          component="div"
        >
          حداقل سفارش {convertToFarsiNumbers(formatPrice(minPrice.toString()))}{" "}
          تومان
        </Box>
        <Box className="p-3 grid justify-items-center" component="div">
          {login ? (
            <Link href="/shopping-card">
              <Button
                variant="contained"
                className="bg-green-500 hover:bg-green-600 text-xl rounded-lg"
                sx={{
                  width: {
                    xs: "280px",
                    sm: "500px",
                    md: "650px",
                    lg: "800px",
                    xl: "1200px",
                  },
                }}
              >
                نهایی کردن خرید
              </Button>
            </Link>
          ) : (
            <Link href="/users/login">
              <Button
                variant="contained"
                className="bg-green-500 hover:bg-green-600 text-xl rounded-lg"
                sx={{
                  width: {
                    xs: "280px",
                    sm: "500px",
                    md: "650px",
                    lg: "800px",
                    xl: "1200px",
                  },
                }}
              >
                ورود / عضویت
              </Button>
            </Link>
          )}
        </Box>
      </Dialog>
    </>
  );
}
