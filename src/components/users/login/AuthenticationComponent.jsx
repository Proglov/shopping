"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthenticationComponent() {
  const [code, setCode] = useState("");
  const [show, setShow] = useState([false, false]);
  const router = useRouter();

  const submit = () => {
    if (!code) {
      setShow([true, false]);
      return;
    }
    if (!/^([0-9]{6})$/.test(code)) {
      setShow([false, true]);
      return;
    }
    setShow([false, false]);
    localStorage.setItem("UserLogin", "true");
    router.push("/");
  };

  return (
    <>
      <Box component="div" className="grid place-items-center h-full w-full">
        <Box
          component="div"
          className="w-full md:w-1/3 h-full md:h-4/5 p-10 border border-slate-300 bg-white rounded-lg"
        >
          <Box className="mb-12 mt-5 text-2xl text-center" component="div">
            فروشگاه آنلاین
          </Box>
          <Box className="text-base mb-6 font-thin" component="div">
            کد ارسال شده را وارد کنید
          </Box>
          <Box className="mb-4">
            <TextField
              value={code}
              fullWidth
              label="کد ارسالی"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                const input = event.target.value;
                const filteredInput = input.replace(/\D/g, "");
                setCode(filteredInput);
              }}
            />
          </Box>
          {show[0] ? (
            <span className="text-red-600">لطفا کد را وارد کنید!</span>
          ) : (
            ""
          )}
          {show[1] ? (
            <span className="text-red-600">کد را به درستی وارد کنید!</span>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            className="bg-green-500 hover:bg-green-600 text-xl rounded-lg w-full mt-10"
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
