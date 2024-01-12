"use client";

import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card, TextField } from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

export default function Bill({ product, Time }) {
  let serviceFee = 1479;

  function Number(arr) {
    let number = arr.reduce((sum, obj) => {
      return sum + obj.number;
    }, 0);
    return number.toString();
  }

  function totalPrice(arr) {
    let price = arr.reduce((sum, obj) => {
      return sum + (obj.number * parseInt(obj.price) * (100 - obj.off)) / 100;
    }, 0);
    return price.toString();
  }

  function profit(arr) {
    let price = arr.reduce((sum, obj) => {
      return sum + (obj.number * parseInt(obj.price) * obj.off) / 100;
    }, 0);
    return price.toString();
  }

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
            <Box
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
                      (parseInt(totalPrice(product)) + serviceFee).toString()
                    )
                  )}{" "}
              <span className="text-lg text-gray-600">تومان</span>
            </Box>
            <Box
              className="lg:text-2xl col-span-3 mt-2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                },
              }}
            >
              <ConfirmationNumberOutlinedIcon /> <span>افزودن کد تخفیف</span>
            </Box>
            <Box
              className="lg:text-2xl col-span-2 mt-2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "20px",
                },
              }}
            >
              <TextField
                label="کد تخفیف"
                variant="outlined"
                color="success"
                sx={{
                  " & .MuiInputLabel-root": {
                    left: "inherit !important",
                    right: "1.75rem !important",
                    transformOrigin: "right !important",
                  },
                  "& legend": { textAlign: "right" },
                }}
              />
            </Box>
          </Box>
        </Card>
      </Box>
      <Box className="p-5 mb-1 grid justify-center" component="div">
        {!Time.select ? (
          <div className="text-red-600 mb-2 text-center text-xl">
            لطفا زمان ارسال را انتخاب کنید!
          </div>
        ) : (
          ""
        )}
        {Time.select ? (
          <Button
            variant="contained"
            className="bg-blue-500 text-bold text-xl hover:bg-blue-600 rounded-lg"
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
            پرداخت آنلاین
          </Button>
        ) : (
          <Button
            variant="contained"
            className="text-bold text-xl rounded-lg disabled:bg-blue-300 disabled:text-white"
            sx={{
              width: {
                xs: "280px",
                sm: "500px",
                md: "650px",
                lg: "800px",
                xl: "1200px",
              },
            }}
            disabled
          >
            پرداخت آنلاین
          </Button>
        )}
      </Box>
    </>
  );
}
