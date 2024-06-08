"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import Link from "next/link";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useState } from "react";
import { useAppSelector } from "@/store/Hook";

export default function PaymentBill() {
  const product = useAppSelector((state) => state.CartProducts);
  const Time = useAppSelector((state) => state.Time);
  let serviceFee = 1479;
  const [pay, setPay] = useState(true);

  let price = product.reduce((sum, obj) => {
    return sum + obj.number * parseInt(obj.price);
  }, 0);

  return (
    <>
      <Box className="p-5 mb-1 grid grid-cols-1 sm:grid-cols-3" component="div">
        <Card className="border-2 border-slate-200 rounded-xl col-span-2">
          <CardHeader
            title="قبض شما"
            className="text-lg border-b-2 border-b-slate-200"
          />
          <CardContent>
            <Box className="grid grid-cols-5" component="div">
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
                {convertToFarsiNumbers(formatPrice(Time.price))}{" "}
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
                {convertToFarsiNumbers(
                  formatPrice(
                    (price + serviceFee + parseInt(Time.price)).toString()
                  )
                )}{" "}
                <span className="text-lg text-gray-600">تومان</span>
              </Box>
              {/* <Box
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
              </Box> */}
            </Box>
          </CardContent>
          <Box component="div" className="flex border-t-4 p-5">
            <FormControl className="flex">
              <Box id="payment" className="text-lg">
                نحوه پرداخت:
              </Box>
              <RadioGroup
                row
                aria-labelledby="payment"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="offline"
                  control={<Radio color="success" />}
                  label="پرداخت درب منزل"
                  checked
                />
                <FormControlLabel
                  value="online"
                  control={<Radio />}
                  label="پرداخت آنلاین"
                  disabled
                />
              </RadioGroup>
            </FormControl>
            <span className="md:block hidden text-sm text-gray-400 mt-10 mr-5">
              به زودی ...
            </span>
            {/* <Button
              className="text-white text-base bg-green-400 hover:bg-green-500 rounded-lg mb-4 w-3/4"
              variant="contained"
            >
              پرداخت آنلاین
            </Button> */}
          </Box>
        </Card>
      </Box>
      <Box
        className="p-5 mb-1 grid grid-cols-2 justify-between mx-5"
        component="div"
      >
        <div className="text-right">
          <Link href="/shopping-card">
            <Button
              variant="contained"
              className="bg-blue-500 text-bold text-base hover:bg-blue-600 rounded-lg w-fit"
            >
              <GrFormNext className="text-white" style={{ fontSize: "35px" }} />
              مرحله قبل
            </Button>
          </Link>
        </div>
        <div className="text-left">
          {pay ? (
            <Link href="/shopping-card/payment/bill">
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
          ) : (
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
          )}
        </div>
      </Box>
    </>
  );
}
