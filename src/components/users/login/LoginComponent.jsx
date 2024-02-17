"use client";

import { useSetLogin } from "@/context/LoginContext";
import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState([false, false]);
  const setLogin = useSetLogin();
  const router = useRouter();

  const submit = () => {
    if (!phoneNumber) {
      setShow([true, false]);
      return;
    }
    if (!/^[0][9]([0-9]{9})$/.test(phoneNumber)) {
      setShow([false, true]);
      return;
    }
    setShow([false, false]);
    setLogin(true);
    router.push("/");
  };

  return (
    <>
      <Box component="div" className="grid place-items-center h-full w-full">
        <Box
          component="div"
          className="w-full md:w-1/3 h-full md:h-2/3 p-10 border border-slate-300 bg-white rounded-lg"
        >
          <Box className="mb-6 text-2xl text-center" component="div">
            فروشگاه آنلاین
          </Box>
          <Box className="mb-6 text-xl font-bold" component="div">
            ورود / عضویت
          </Box>
          <Box className="text-base mb-6 font-thin" component="div">
            سلام!
            <br />
            لطفا شماره موبایل خود را وارد کنید
          </Box>
          <Box className="mb-10">
            <TextField
              fullWidth
              label="شماره موبایل"
              onChange={(event) => {
                setPhoneNumber(event.target.value);
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
            {show[0] ? (
              <span className="text-red-600">
                لطفا این قسمت را خالی نگذارید
              </span>
            ) : (
              ""
            )}
            {show[1] ? (
              <span className="text-red-600">
                شماره موبایل به درستی وارد نشده است
              </span>
            ) : (
              ""
            )}
          </Box>
          <Button
            variant="contained"
            className="bg-green-500 hover:bg-green-600 text-xl rounded-lg w-full"
            onClick={submit}
          >
            ورود
          </Button>
          <Box className="text-xs mt-2" component="div">
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