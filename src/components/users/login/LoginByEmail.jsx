"use client";

import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import AuthenticationComponent from "./AuthenticationComponent";
import UserApi from "@/services/withoutAuthActivities/user";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginComponent from "./LoginComponent";
import { isEmailValid } from "@/utils/funcs";
import { useRouter } from "next/navigation";

export default function LoginByEmail() {
  const [information, setInformation] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [show, setShow] = useState([false, false, false]);
  const [next, setNext] = useState(false);
  const [email, setEmail] = useState(true);
  const { signInWithEmailOrUsername } = UserApi;
  const router = useRouter();

  const submit = async () => {
    if ((information.emailOrUsername === "") || (information.password === "")) {
      setShow([true, false, false]);
      return;
    }
    if (!isEmailValid(information.emailOrUsername)) {
      if (information.emailOrUsername.length < 8) {
        setShow([false, true, false]);
        return;
      }
    }
    if (information.password.length < 8) {
      setShow([false, false, true]);
      return;
    }
    try {
      const obj = information;
      obj.password = DOMPurify.sanitize(obj.password);
      obj.emailOrUsername = DOMPurify.sanitize(obj.emailOrUsername);
      const response = await signInWithEmailOrUsername(obj);
      localStorage.setItem("token", response.token);
      toast.success("ورود شما موفقیت آمیز بود", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShow([false, false, false]);
      localStorage.setItem("UserLogin", "true");
      router.push("/");
      // setNext(true);
    } catch (error) {
      const mes = error.response.data.message;
      if (mes === "Invalid Credentials") {
        toast.error("ایمیل یا نام کاربری یا رمز عبور اشتباه می باشد", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "no user found") {
        toast.error("شما قبلا ثبت نام نکرده اید", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setShow([false, false, false]);
    }
  };

  return (
    <>
      {next ? (
        <AuthenticationComponent />
      ) : !email ? (
        <LoginComponent />
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
              ورود
            </Box>
            <Box className="text-base mb-6 font-thin" component="div">
              سلام!
              <br />
              لطفا ایمیل یا نام کاربری و رمز عبور خود را وارد کنید
            </Box>
            <Box className="mb-4 grid gap-4">
              <TextField
                value={information.emailOrUsername}
                fullWidth
                label="نام کاربری یا ایمیل"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    submit();
                  }
                }}
                onChange={(event) => {
                  setInformation({
                    ...information,
                    emailOrUsername: event.target.value,
                  });
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
              <TextField
                value={information.password}
                fullWidth
                label="رمز عبور"
                type="password"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    submit();
                  }
                }}
                onChange={(event) => {
                  setInformation({
                    ...information,
                    password: event.target.value,
                  });
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
            <Box className="text-center mt-3">
              {show[0] ? (
                <span className="text-red-600">
                  لطفا تمامی موارد خواسته شده را وارد کنید!
                </span>
              ) : (
                ""
              )}
              {show[1] ? (
                <span className="text-red-600">
                  نام کاربری یا ایمیل به درستی وارد نشده است!
                </span>
              ) : (
                ""
              )}
              {show[2] ? (
                <span className="text-red-600">
                  رمز عبور حداقل هشت کاراکتر است!
                </span>
              ) : (
                ""
              )}
            </Box>
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-xl rounded-lg w-full mt-10"
              onClick={submit}
            >
              {/* تایید شماره موبایل */}
              وارد شدن
            </Button>
            <Box component="div" className="mt-4">
              برای وارد شدن با شماره موبایل از
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setEmail(false)}
              >
                {" "}
                این قسمت{" "}
              </span>
              اقدام کنید
            </Box>
            <Box component="div" className="mt-5">
              اگر هنوز ثبت نام نکرده اید همین حالا
              <Link href="/users/signup">
                <span className="text-blue-600"> ثبت نام </span>
              </Link>
              کنید !
            </Box>
            <Box component="div" className="mt-4">
              اگر &nbsp;
              <span className="text-red-400 text-lg">
                فروشنده
              </span>
              &nbsp; هستید از
              <Link href="/Seller/login">
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
