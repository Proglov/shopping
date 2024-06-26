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
import { red } from "@mui/material/colors";
import Offers from "./Offers";
import Bill from "./Bill";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/Hook";
import {
  IncrementCart,
  DecrementCart,
} from "@/features/CartProducts/CartProductsSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ShoppingCard({ step }) {
  const cartProducts = useAppSelector((state) => state.CartProducts);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, setLogin] = useState();
  const [number, setNumber] = useState(0);

  let counter =
    cartProducts
      ?.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.number;
      }, 0)
      .toString() | "0";

  useEffect(() => {
    if (localStorage.getItem("UserLogin") == "true") {
      setLogin(true);
      setNumber(1);
    } else {
      setLogin(false);
      setNumber(1);
    }
    if (number === 1 && step !== 0) {
      if (!login) {
        toast.warning("شما وارد نشده اید", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/users/login");
      }
      setNumber(0);
    }
  }, [setLogin, router]);

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
                  xs: "18px",
                  sm: "16px",
                  md: "24px",
                  lg: "24px",
                  xl: "24px",
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
              {step !== 0 ? (
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
              ) : (
                ""
              )}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              className="mb-2 mr-1.5 text-gray-600"
              sx={{
                fontSize: {
                  xs: "16px",
                  sm: "16px",
                  md: "20px",
                  lg: "20px",
                  xl: "20px",
                },
              }}
            >
              {convertToFarsiNumbers(counter)} کالا
            </Typography>
            <div className="grid justify-items-center">
              {counter == 0
                ? "سبد خرید شما خالی است!"
                : cartProducts.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="w-full border border-gray-200" />
                      <div className="m-4 h-auto w-full grid grid-cols-1 gap-4 lg:w-3/4 sm:grid-cols-4">
                        <div className="p-1 mx-auto">
                          <Image
                            height={200}
                            width={200}
                            src={item.src[0]}
                            alt="Product"
                          />
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
                                onClick={() =>
                                  dispatch(IncrementCart(item.code))
                                }
                              >
                                <AddIcon />
                              </Button>
                              <span className="text-red-500">
                                {farsiNumCharacter(item.number)}
                              </span>
                              <Button
                                className="hover:bg-white active:bg-white rounded-lg w-auto"
                                sx={{ color: red[400] }}
                                onClick={() =>
                                  dispatch(DecrementCart(item.code))
                                }
                              >
                                {item.number === 1 ? (
                                  <DeleteOutlineOutlinedIcon />
                                ) : (
                                  <RemoveOutlinedIcon />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="grid">
                            <div>
                              قیمت :
                              {convertToFarsiNumbers(
                                formatPrice(
                                  Math.ceil(
                                    item.number * parseInt(item.price)
                                  ).toString()
                                )
                              )}{" "}
                              تومان
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </Box>
      {step !== 0 ? (
        <>
          {/* <Offers /> */}
          <Bill step={step} />
        </>
      ) : (
        <Bill step={step} />
      )}
    </>
  );
}
