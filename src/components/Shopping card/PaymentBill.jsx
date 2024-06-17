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
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/Hook";
import TXApi from "@/services/withAuthActivities/tx";
import UserApi from "@/services/withAuthActivities/user";
import { loadState } from "@/Storage/Storage";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentBill() {
  const product = useAppSelector((state) => state.CartProducts);
  const Time = useAppSelector((state) => state.Time);
  let serviceFee = 1479;
  const [pay, setPay] = useState(true);
  const { createTX } = TXApi;
  const { getMe } = UserApi;
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  let price = product.reduce((sum, obj) => {
    return sum + obj.number * parseInt(obj.price);
  }, 0);

  const CreateTX = async () => {
    try {
      const state = loadState();
      const newArray = state.map((item) => {
        return { productId: item.code, quantity: item.number };
      });
      const response = await createTX({
        discountId: "",
        boughtProducts: newArray,
        address: address,
        shouldBeSentAt: date,
        userId: userId,
      });
      toast.success("سفارش شما با موفقیت ثبت شد", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push("/shopping-card/payment/bill");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const GetUser = async () => {
      try {
        const user = await getMe();
        setUserId(user.user._id);
      } catch (error) {}
    };
    GetUser();
    setAddress(localStorage.getItem("address"));
    setDate(localStorage.getItem("time"));
  }, [getMe, setUserId, setAddress, setDate]);

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
            <Button
              variant="contained"
              className="bg-green-500 text-bold text-base hover:bg-green-600 rounded-lg w-fit"
              onClick={CreateTX}
              size="large"
            >
              ثبت نهایی
            </Button>
          ) : (
            <Button
              variant="contained"
              className="text-bold text-base rounded-lg disabled:bg-green-300 disabled:text-white w-fit"
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
