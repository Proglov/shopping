"use client";

import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import SellerApi from "@/services/withoutAuthActivities/seller";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginByEmailSeller from "./LoginByEmailSeller";
import { useRouter } from "next/navigation";

export default function LoginSeller() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState([false, false]);
  const [next, setNext] = useState(false);
  const [email, setEmail] = useState(false);
  const { sellerSignInWithPhone } = SellerApi;
  const router = useRouter();

  const submit = async () => {
    if (!phoneNumber) {
      setShow([true, false]);
      return;
    }
    if (!/^[0][9]([0-9]{9})$/.test(phoneNumber)) {
      setShow([false, true]);
      return;
    }
    try {
      const phone = DOMPurify.sanitize(phoneNumber);
      const response = await sellerSignInWithPhone({ phone: phone });
      localStorage.setItem("token", response.token);
      toast.success("ورود شما موفقیت آمیز بود", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShow([false, false]);
      localStorage.setItem("SellerLogin", "true");
      router.push("/");
      // setNext(true);
    } catch (error) {
      const mes = error.response.data.message;
      if (mes === "no seller found") {
        toast.error("شماره تلفن شما ثبت نشده است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setShow([false, false]);
    }
  };

  return (
    <>
      {next ? (
        ""
      ) : email ? (
        <LoginByEmailSeller />
      ) : (
        <Box component="div" className="grid place-items-center h-fit w-full">
          <Box
            component="div"
            className="w-full xl:w-2/5 md:w-2/3 my-10 p-10 border border-slate-300 bg-white rounded-lg"
          >
            <Box className="mb-6 text-2xl text-center" component="div">
              فروشگاه آنلاین
            </Box>
            <Box className="mb-6 text-xl font-bold" component="div">
              ورود فروشندگان
            </Box>
            <Box className="text-base mb-6 font-thin" component="div">
              سلام!
              <br />
              لطفا شماره موبایل خود را وارد کنید
            </Box>
            <Box className="mb-4">
              <TextField
                value={phoneNumber}
                fullWidth
                label="شماره موبایل"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    submit();
                  }
                }}
                onChange={(event) => {
                  const input = event.target.value;
                  const filteredInput = input.replace(/\D/g, "");
                  setPhoneNumber(filteredInput);
                }}
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
            {show[0] ? (
              <span className="text-red-600">
                لطفا این قسمت را خالی نگذارید!
              </span>
            ) : (
              ""
            )}
            {show[1] ? (
              <span className="text-red-600">
                شماره موبایل به درستی وارد نشده است!
              </span>
            ) : (
              ""
            )}
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-xl rounded-lg w-full mt-10"
              onClick={submit}
            >
              {/* تایید شماره موبایل */}
              وارد شدن
            </Button>
            <Box component="div" className="mt-4">
              برای وارد شدن با نام کاربری و رمز عبور از
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setEmail(true)}
              >
                {" "}
                این قسمت{" "}
              </span>
              اقدام کنید .
            </Box>
            <Box component="div" className="mt-5">
              اگر هنوز ثبت نام نکرده اید همین حالا
              <Link href="/Seller/signup">
                <span className="text-blue-600"> ثبت نام </span>
              </Link>
              کنید !
            </Box>
            <Box component="div" className="mt-4">
              اگر
              &nbsp;
              <span className="text-red-400 text-lg">
                مشتری
              </span>
              &nbsp;
              هستید از
              <Link href="/users/login">
                <span className="text-blue-600"> این قسمت </span>
              </Link>
              وارد شوید .
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
