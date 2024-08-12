"use client";
import { Box, Button, Dialog, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useEffect, useState } from "react";
import { convertToFarsiNumbers } from "@/utils/funcs";
import ShoppingCard from "./ShoppingCard";
import Link from "next/link";
import { getCounterProducts, isUserLoggedIn } from "@/Storage/Storage";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart({ Close, Open }) {
  const [LoginUser, setLoginUser] = useState(false);
  let counter = getCounterProducts()

  useEffect(() => {
    setLoginUser(isUserLoggedIn());
  }, [setLoginUser]);


  return (
    <Dialog
      fullScreen
      open={Open}
      onClose={Close}
      TransitionComponent={Transition}
    >
      <Box
        className="grid grid-cols-3 p-3 mb-3 shadow-lg border-b-2 border-gray-100 md:ml-1 md:mr-1 items-center"
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
      <ShoppingCard step={0} />

      {
        counter > 0 &&
        <Box className="p-3 grid justify-items-center" component="div">
          {LoginUser ? (
            <Link href="/shopping-card">
              <Button
                variant="contained"
                className="bg-green-500 hover:bg-green-600 text-base rounded-lg"
                onClick={Close}
              >
                نهایی کردن خرید
              </Button>
            </Link>
          ) : (
            <Link href="/users/login">
              <Button
                variant="contained"
                className="bg-green-500 hover:bg-green-600 text-base rounded-lg"
                onClick={Close}
              >
                ورود به حساب کاربری
              </Button>
            </Link>
          )}
        </Box>
      }

    </Dialog>
  );
}