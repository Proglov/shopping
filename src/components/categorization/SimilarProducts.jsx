"use client";

import { Box, Button, Card } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AddCart } from "@/features/CartProducts/CartProductsSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function SimilarProducts() {
  const dispatch = useDispatch();
  const similar = [
    {
      name: "خامه صباح - 200 میلی لیتر",
      off: 26,
      realPrice: 32000000,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خامه صباح - 1 میلی لیتر",
      off: 25,
      realPrice: 32000000,
      src: "/img/home/tanagholat.jpg",
    },
    {
      name: "خامه صباح - 2 میلی لیتر",
      off: 22,
      realPrice: 32000000,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خامه صباح - 3 میلی لیتر",
      off: 2,
      realPrice: 32000000,
      src: "/img/home/tanagholat.jpg",
    },
    {
      name: "خامه صباح - 4 میلی لیتر",
      off: 16,
      realPrice: 32000000,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خامه صباح - 5 میلی لیتر",
      off: 62,
      realPrice: 32000000,
      src: "/img/home/tanagholat.jpg",
    },
    {
      name: "خامه صباح - 6 میلی لیتر",
      off: 46,
      realPrice: 32000000,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خامه صباح - 7 میلی لیتر",
      off: 65,
      realPrice: 32000000,
      src: "/img/home/tanagholat.jpg",
    },
  ];

  return (
    <>
      <Box className="p-5 mb-1" component="div">
        <Card className="border-2 border-gray-200 rounded-xl">
          <div className="h-12 border-b-2 flex items-stretch">
            <span className="self-center flex-1 text-center text-gray-950 text-bold text-lg">
              محصولات مشابه
            </span>
          </div>
          <div className="grid justify-items-center p-5 overflow-auto h-96 sm:h-80">
            {similar.map((item, index) => {
              return (
                <div key={index}>
                  <div className="m-4 h-auto w-full grid grid-cols-1 gap-4 lg:w-3/4 sm:grid-cols-4">
                    <div className="p-1 mx-auto">
                      <Image
                        height={200}
                        width={200}
                        src={item.src}
                        alt="Product"
                      />
                    </div>
                    <div className="p-2 text-gray-900 sm:col-span-2 grid grid-rows-3 grid-cols-1 justify-items-center items-center sm:justify-items-start">
                      <div className="mb-2 sm:mb-0">{item.name}</div>
                      <div className="flex justify-start px-2 sm:text-base text-sm">
                        <span className="bg-red-500 rounded-md mt-2 text-center h-7 sm:pt-1 pt-1.5 sm:min-w-[50px] p-1 text-white">
                          {convertToFarsiNumbers(item.off.toString())}%
                        </span>
                        <div className="flex justify-end m-3 ml-8 line-through text-gray-400">
                          {convertToFarsiNumbers(
                            formatPrice(item.realPrice.toString())
                          )}{" "}
                          تومان
                        </div>
                      </div>
                      <div className="sm:text-lg">
                        {convertToFarsiNumbers(
                          formatPrice(
                            (
                              (item.realPrice * (100 - item.off)) /
                              100
                            ).toString()
                          )
                        )}{" "}
                        تومان
                      </div>
                    </div>
                    <div className="sm:self-end justify-self-center">
                      <Button
                        variant="outlined"
                        className="bg-green-500 border-green-600 hover:border-green-700 hover:bg-green-600 text-white font-medium float-left rounded-lg"
                        sx={{
                          fontSize: {
                            xs: "10px",
                            sm: "10px",
                            md: "10px",
                            lg: "14px",
                            xl: "14px",
                          },
                        }}
                        onClick={() => {
                          dispatch(
                            AddCart({
                              name: item.name,
                              number: 1,
                              src: item.src,
                              price: item.realPrice,
                              off: item.off,
                              code: Math.floor(Math.random() * 99999),
                            })
                          );
                        }}
                      >
                        افزودن به سبد
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
                    </div>
                  </div>
                  <div className="w-full border border-gray-200" />
                </div>
              );
            })}
          </div>
        </Card>
      </Box>
    </>
  );
}
