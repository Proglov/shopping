"use client";

import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card } from "@mui/material";
import { GrFormPrevious } from "react-icons/gr";
import Link from "next/link";
import { useAppSelector } from "@/store/Hook";

export default function Bill({ step = 1 }) {
  const product = useAppSelector((state) => state.CartProducts);
  const Time = useAppSelector((state) => state.Time);
  const address = useAppSelector((state) => state.Address.address);
  const minPrice = 150000;

  let serviceFee = 1479;

  function Number(arr) {
    let number =
      arr?.reduce((sum, obj) => {
        return sum + obj.number;
      }, 0) || "0";
    return number.toString();
  }

  function totalPrice(arr) {
    let price =
      arr?.reduce((sum, obj) => {
        return sum + obj.number * parseInt(obj.price);
      }, 0) || "0";
    return price.toString();
  }

  // function profit(arr) {
  //   let price = arr.reduce((sum, obj) => {
  //     return sum + (obj.number * parseInt(obj.price) * obj.off) / 100;
  //   }, 0);
  //   return price.toString();
  // }

  return (
    <>
      <Box className="p-5 mb-1 grid grid-cols-1 sm:grid-cols-3" component="div">
        <Card className="border-2 p-3 border-gray-200 rounded-xl col-span-2">
          <Box className="grid grid-cols-5 grid-rows-7" component="div">
            <Box
              className="col-span-3 lg:text-2xl mb-2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                },
              }}
            >
              تعداد اقلام
            </Box>
            <Box
              className="lg:text-2xl col-span-2 mb-2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                },
              }}
            >
              {convertToFarsiNumbers(Number(product))}{" "}
              <span className="text-lg text-gray-600">کالا</span>{" "}
            </Box>
            <Box
              className="col-span-3 lg:text-2xl mb-2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                },
              }}
            >
              مبلغ کل اقلام
            </Box>
            <Box
              className="lg:text-2xl col-span-2 mb-2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                },
              }}
            >
              {convertToFarsiNumbers(formatPrice(totalPrice(product)))}{" "}
              <span className="text-lg text-gray-600">تومان</span>
            </Box>
            {step !== 0 ? (
              <>
                <Box
                  className="col-span-3 lg:text-2xl mb-2"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "16px",
                      md: "20px",
                    },
                  }}
                >
                  هزینه بسته بندی
                </Box>
                <Box
                  className="lg:text-2xl col-span-2 mb-2"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "16px",
                      md: "20px",
                    },
                  }}
                >
                  {convertToFarsiNumbers(formatPrice(serviceFee.toString()))}{" "}
                  <span className="text-lg text-gray-600">تومان</span>
                </Box>
                <Box
                  className="col-span-3 lg:text-2xl mb-2"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "16px",
                      md: "20px",
                    },
                  }}
                >
                  هزینه ارسال
                </Box>
                <Box
                  className="lg:text-2xl col-span-2 mb-2"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "16px",
                      md: "20px",
                    },
                  }}
                >
                  {Time.select ? (
                    <>
                      {convertToFarsiNumbers(formatPrice(Time.price))}
                      <span className="text-lg text-gray-600">تومان</span>
                    </>
                  ) : (
                    <span className="text-lg text-gray-600">
                      وابسته به زمان ارسالی
                    </span>
                  )}{" "}
                </Box>
              </>
            ) : (
              ""
            )}
            {/* <Box
              className="col-span-3 lg:text-2xl text-green-500 mb-2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                },
              }}
            >
              سود شما از این خرید
            </Box>
            <Box
              className="text-green-500 lg:text-xl col-span-2 mb-2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                },
              }}
            >
              {convertToFarsiNumbers(formatPrice(profit(product)))}{" "}
              <span className="text-lg text-green-400">تومان</span>
            </Box> */}
            {step !== 0 ? (
              <>
                <Box
                  className="col-span-3 lg:text-2xl mb-2"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "16px",
                      md: "20px",
                    },
                  }}
                >
                  مبلغ قابل پرداخت
                </Box>
                <Box
                  className="lg:text-2xl col-span-2 mb-2"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "16px",
                      md: "20px",
                    },
                  }}
                >
                  {Time.select
                    ? convertToFarsiNumbers(
                        formatPrice(
                          (
                            parseInt(totalPrice(product)) +
                            serviceFee +
                            parseInt(Time.price)
                          ).toString()
                        )
                      )
                    : convertToFarsiNumbers(
                        formatPrice(
                          (
                            parseInt(totalPrice(product)) + serviceFee
                          ).toString()
                        )
                      )}{" "}
                  <span className="text-lg text-gray-600">تومان</span>
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
        </Card>
      </Box>
      {step !== 0 ? (
        <>
          <Box
            className="p-5 mb-1 grid grid-cols-2 justify-between mx-5"
            component="div"
          >
            {minPrice < totalPrice(product) ? (
              !Time.select || (address === "") ? (
                <div className="text-red-600 mb-2 text-right text-xl">
                  لطفا آدرس یا زمان ارسال را انتخاب کنید!
                </div>
              ) : (
                <div></div>
              )
            ) : (
              <Box
                className="text-red-600  mb-2 text-right text-lg"
                component="div"
              >
                حداقل سفارش{" "}
                {convertToFarsiNumbers(formatPrice(minPrice.toString()))} تومان
              </Box>
            )}
            {minPrice < totalPrice(product) ? (
              Time.select && address !== "" ? (
                <div className="text-left">
                  <Link href="/shopping-card/payment">
                    <Button
                      variant="contained"
                      className="bg-blue-500 text-bold text-base hover:bg-blue-600 rounded-lg w-fit"
                    >
                      مرحله بعد
                      <GrFormPrevious
                        className="text-white"
                        style={{ fontSize: "35px" }}
                      />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-left">
                  <Button
                    variant="contained"
                    className="text-bold text-base rounded-lg disabled:bg-blue-300 disabled:text-white w-fit"
                    disabled
                  >
                    مرحله بعد
                    <GrFormPrevious
                      className="text-white"
                      style={{ fontSize: "35px" }}
                    />
                  </Button>
                </div>
              )
            ) : (
              <div className="text-left">
                <Button
                  variant="contained"
                  className="text-bold text-base rounded-lg disabled:bg-blue-300 disabled:text-white w-fit"
                  disabled
                >
                  مرحله بعد
                  <GrFormPrevious
                    className="text-white"
                    style={{ fontSize: "35px" }}
                  />
                </Button>
              </div>
            )}
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
}
