"use client";

import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import UserApi from "@/services/withoutAuthActivities/user";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/Hook";
import { SetLogin } from "@/features/Login/LoginSlice";

export default function SignUpComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState([false, false]);
  const { signUp } = UserApi;
  const router = useRouter();
  const dispatch = useAppDispatch();

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
      const response = await signUp({ phone: phoneNumber });
      localStorage.setItem("token", response.token);

      setShow([false, false]);
      dispatch(SetLogin(true));
      router.push("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Box component="div" className="grid place-items-center h-full w-full">
        <Box
          component="div"
          className="w-full xl:w-1/3 md:w-2/3 h-full md:h-4/5 p-10 border border-slate-300 bg-white rounded-lg"
        >
          <Box className="mb-6 text-2xl text-center" component="div">
            فروشگاه آنلاین
          </Box>
          <Box className="mb-6 text-xl font-bold" component="div">
            ثبت نام
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
            <span className="text-red-600">لطفا این قسمت را خالی نگذارید!</span>
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
            تایید شماره موبایل
          </Button>
          <Box className="text-xs mt-5 text-center" component="div">
            ورود شما به معنای پذیرش{" "}
            <Link href="">
              <span className="text-blue-600"> شرایط سایت </span>
            </Link>{" "}
            و
            <Link href="">
              <span className="text-blue-600"> قوانین حریم‌ خصوصی </span>
            </Link>
            است.
          </Box>
        </Box>
      </Box>
    </>
  );
}
