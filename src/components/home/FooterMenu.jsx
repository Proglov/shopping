"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { Badge, Button, IconButton, Typography } from "@mui/material";
import Cart from "../Shopping card/Cart";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { getCounterProductsWithoutLS } from "@/store/Storage/Storage";
import { useSelector } from "react-redux";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function FooterMenu({ active }) {
  const [open, setOpen] = React.useState(false);
  const [counter, setCounter] = useState(0)
  const products = useSelector((state) => state.CartProducts);
  const login = useSelector((state) => state.Login);

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
        className="fixed bottom-0 bg-white lg:w-3/4 sm:w-[90%] w-full h-20 z-[100] rounded-ss-full rounded-se-full border-t-2 border-purple-700 opacity-95"
        sx={{
          transform: {
            sm: "translateX(-5%)",
            lg: "translateX(-20%)",
          },
        }}
      >
        <div className="m-5 flex justify-evenly gap-3 items-center">
          <Link href="/">
            <Button
              className={`sm:mx-10 mx-5 flex flex-col ${active === 0 ? "text-blue-700" : "text-black"
                }`}
            >
              <div className="mx-auto">
                <AiOutlineHome className="text-2xl" />
              </div>
              <div className="text-center sm:text-sm text-xs md:text-base">خانه</div>
            </Button>
          </Link>


          {
            login !== 'seller' ?
              <>
                <Link href="/#categorization">
                  <div
                    className={`sm:mx-10 mx-5 flex flex-col ${active === 1 ? "text-blue-700" : "text-black"
                      }`}
                  >
                    <div className="mx-auto">
                      <TbCategory className="text-2xl" />
                    </div>
                    <div className="text-center sm:text-sm text-xs md:text-base">
                      دسته بندی ها
                    </div>
                  </div>
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
              </>
              :
              <IconButton
                className="text-base"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <Link href="/Seller">
                  <span className="flex flex-col">
                    <StorefrontIcon className="mx-auto" />
                    <span className="text-base">پنل مدیریت</span>
                  </span>
                </Link>
              </IconButton>

          }
        </div>
      </Typography>

      {
        login !== 'seller' &&
        <Cart Close={handleClose} Open={open} />
      }
    </>
  );
}
