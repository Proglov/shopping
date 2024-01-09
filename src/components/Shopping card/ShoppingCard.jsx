"use client";

import {
  convertToFarsiNumbers,
  farsiNumCharacter,
  formatPrice,
} from "@/utils/funcs";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { red } from "@mui/material/colors";
import Offers from "./Offers";
import Bill from "./Bill";

export default function ShoppingCard({ Time }) {
  const [product, setProduct] = useState([
    {
      code: "546",
      number: 5,
      name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
      src: "/img/home/category-labaniat.jpg",
      price: "1000",
      off: "60",
    },
    {
      code: "525",
      number: 7,
      name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
      src: "/img/home/tanagholat.jpg",
      price: "1700",
      off: "60",
    },
    {
      code: "446",
      number: 1,
      name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
      src: "/img/home/category-labaniat.jpg",
      price: "1080.45",
      off: "60",
    },
    {
      code: "687",
      number: 2,
      name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
      src: "/img/home/tanagholat.jpg",
      price: "1500",
      off: "60",
    },
  ]);

  let counter = product
    .reduce((accumulator, currentObject) => {
      return accumulator + currentObject.number;
    }, 0)
    .toString();

  const handleIncrement = (Id) => {
    setProduct(
      product.map((item) => {
        if (item.code === Id) {
          return { ...item, number: item.number + 1 };
        }
        return item;
      })
    );
  };

  const handleDecrement = (Id) => {
    setProduct(
      product
        .map((item) => {
          if (item.code === Id) {
            if (item.number === 1) {
              return null;
            } else {
              return { ...item, number: item.number - 1 };
            }
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  return (
    <>
      <Box className="p-5 mb-1" component="div">
        <Card className="border-2 border-gray-200 rounded-xl">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              className="font-bold mb-4"
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "16px",
                  md: "20px",
                  lg: "24px",
                  xl: "28px",
                },
              }}
            >
              <ShoppingBasketOutlinedIcon
                sx={{
                  marginLeft: "3px",
                  fontSize: {
                    xs: "20px",
                    sm: "20px",
                    md: "25px",
                    lg: "30px",
                    xl: "30px",
                  },
                }}
              />{" "}
              سبد خرید شما
              <Link href="/">
                <Button
                  variant="outlined"
                  className="bg-green-500 border-green-600 hover:border-green-700 hover:bg-green-600 text-white font-medium float-left rounded-lg"
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "10px",
                      md: "14px",
                      lg: "18px",
                      xl: "18px",
                    },
                  }}
                >
                  اضافه کردن به سبد
                  <AddShoppingCartIcon
                    sx={{
                      marginRight: "3px",
                      fontSize: {
                        xs: "14px",
                        sm: "16px",
                        md: "18px",
                      },
                    }}
                  />
                </Button>
              </Link>
            </Typography>
            <Typography
              variant="h5"
              component="div"
              className="mb-2 mr-1.5 text-gray-600"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                  lg: "20px",
                  xl: "24px",
                },
              }}
            >
              {convertToFarsiNumbers(counter)} کالا
            </Typography>
            <div className="grid justify-items-center">
              {product.length === 0
                ? "سبد خرید شما خالی است!"
                : product.map((item, index) => {
                    return (
                      <>
                        <div className="w-full border border-gray-200" />
                        <div
                          className="m-4 h-auto w-full grid grid-cols-1 gap-4 lg:w-3/4 sm:grid-cols-4"
                          key={index}
                        >
                          <div className="p-1">
                            <img src={item.src} alt="Product" />
                          </div>
                          <div className="p-2 text-gray-900 sm:col-span-3 grid grid-rows-3 grid-cols-1 justify-items-center items-center sm:grid-rows-2 sm:grid-cols-2 sm:justify-items-start">
                            <div className="sm:col-span-2 mb-2 sm:mb-0">
                              {item.name}
                            </div>
                            <div className="mb-2 sm:mb-0">
                              <div className="border border-gray-400 rounded-lg w-auto inline-block">
                                <Button
                                  className="hover:bg-white active:bg-white rounded-lg w-auto"
                                  sx={{ color: red[400] }}
                                  onClick={() => handleIncrement(item.code)}
                                >
                                  <AddIcon />
                                </Button>
                                <span className="text-red-500">
                                  {farsiNumCharacter(item.number)}
                                </span>
                                <Button
                                  className="hover:bg-white active:bg-white rounded-lg w-auto"
                                  sx={{ color: red[400] }}
                                  onClick={() => handleDecrement(item.code)}
                                >
                                  {item.number === 1 ? (
                                    <DeleteOutlineOutlinedIcon />
                                  ) : (
                                    <RemoveOutlinedIcon />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-rows-2">
                              <div className="flex justify-start px-2 sm:text-base text-sm">
                                <span className="bg-red-500 rounded-md mt-2 text-center h-7 sm:pt-1 pt-1.5 sm:min-w-[50px] p-1 text-white">
                                  {convertToFarsiNumbers(item.off.toString())}%
                                </span>
                                <div className="flex justify-end m-3 ml-8 line-through text-gray-400">
                                  {convertToFarsiNumbers(
                                    formatPrice(
                                      (
                                        item.number * parseInt(item.price)
                                      ).toString()
                                    )
                                  )}{" "}
                                  تومان
                                </div>
                              </div>
                              <div>
                                قیمت :
                                {convertToFarsiNumbers(
                                  formatPrice(
                                    Math.ceil(
                                      (item.number *
                                        parseInt(item.price) *
                                        (100 - item.off)) /
                                        100
                                    ).toString()
                                  )
                                )}{" "}
                                تومان
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
            </div>
          </CardContent>
        </Card>
      </Box>
      <Offers setProduct={setProduct} />
      <Bill product={product} Time={Time} />
    </>
  );
}
