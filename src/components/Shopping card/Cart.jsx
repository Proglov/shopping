"use client";

import { Box, Button, Dialog, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useEffect, useState } from "react";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import ShoppingCard from "./ShoppingCard";
import Link from "next/link";
import { useAppSelector } from "@/store/Hook";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart({ Close, Open }) {
  const minPrice = 150000;
  const [LoginUser, setLoginUser] = useState(false);

  const cartProducts = useAppSelector((state) => state.CartProducts);

  let counter =
    cartProducts
      ?.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.number;
      }, 0)
      .toString() | "0";

  function totalPrice(arr) {
    let price = arr.reduce((sum, obj) => {
      return sum + obj.number * parseInt(obj.price);
    }, 0);
    return price.toString();
  }

  useEffect(() => {
    if (localStorage.getItem("UserLogin") == "true") {
      setLoginUser(true);
    } else {
      setLoginUser(false);
    }
  }, [setLoginUser]);

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
                  xs: "18px",
                  sm: "20px",
                  md: "25px",
                  lg: "25px",
                  xl: "25px",
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
                  sm: "18px",
                  md: "23px",
                  lg: "23px",
                  xl: "23px",
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
        <>
          <ShoppingCard step={0} />
          <Box
            className="grid justify-center text-blue-700 text-base"
            component="div"
          >
            حداقل سفارش{" "}
            {convertToFarsiNumbers(formatPrice(minPrice.toString()))} تومان
          </Box>
          <Box className="p-3 grid justify-items-center" component="div">
            {LoginUser ? (
              minPrice < totalPrice(cartProducts) ? (
                <Link href="/shopping-card">
                  <Button
                    variant="contained"
                    className="bg-green-500 hover:bg-green-600 text-base rounded-lg"
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
                <Button
                  variant="contained"
                  disabled
                  className="bg-green-500 hover:bg-green-600 text-base rounded-lg"
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
              )
            ) : (
              <Link href="/users/login">
                <Button
                  variant="contained"
                  className="bg-green-500 hover:bg-green-600 text-base rounded-lg"
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
        </>
      </Dialog>
    </>
  );
}
