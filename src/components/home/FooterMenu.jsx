"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { Badge, Button, Typography } from "@mui/material";
import Cart from "../Shopping card/Cart";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { getCounterProductsWithoutLS } from "@/Storage/Storage";
import { useSelector } from "react-redux";

export default function FooterMenu({ active }) {
  const [open, setOpen] = React.useState(false);
  const [counter, setCounter] = useState(0)
  const products = useSelector((state) => state.CartProducts);

  useEffect(() => {
    setCounter(getCounterProductsWithoutLS(products))
  }, [products])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="h-[90px]"></div>

      <Typography
        variant="div"
        className="fixed bottom-0 bg-white lg:w-1/2 sm:w-[90%] w-full h-20 pt-[-2px] z-[100] rounded-ss-full rounded-se-full border-t-2 border-purple-700 opacity-95"
        sx={{
          transform: {
            sm: "translateX(-5%)",
            lg: "translateX(-50%)",
          },
        }}
      >
        <div className="m-5 flex justify-center">
          <Link href="/">
            <Button
              className={`sm:mx-10 mx-5 flex flex-col ${active === 0 ? "text-blue-700" : "text-black"
                }`}
            >
              <div className="mx-auto">
                <AiOutlineHome className="text-2xl" />
              </div>
              <div className="text-center">خانه</div>
            </Button>
          </Link>

          <Link href="/#categorization">
            <Button
              className={`sm:mx-10 mx-5 flex flex-col ${active === 1 ? "text-blue-700" : "text-black"
                }`}
            >
              <div className="mx-auto">
                <TbCategory className="text-2xl" />
              </div>
              <div className="text-center sm:text-sm text-xs md:text-base">
                دسته بندی ها
              </div>
            </Button>
          </Link>

          <Button
            className={`sm:mx-10 mx-5 flex flex-col ${active === 2 ? "text-blue-700" : "text-black"
              }`}
            onClick={handleClickOpen}
          >
            <div className="mx-auto">
              <Badge
                badgeContent={convertToFarsiNumbers(counter)}
                color="error"
                sx={{ zIndex: "300" }}
              >
                <GiShoppingCart
                  className="text-2xl"
                  style={{ zIndex: "300" }}
                />
              </Badge>
            </div>
            <div className="text-center sm:text-sm text-xs md:text-base">
              سبد خرید
            </div>
          </Button>
        </div>
      </Typography>
      <Cart Close={handleClose} Open={open} />
    </>
  );
}
