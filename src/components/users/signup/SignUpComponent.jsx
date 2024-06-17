"use client";

import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import UserApi from "@/services/withoutAuthActivities/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";
import { Password } from "@mui/icons-material";

export default function SignUpComponent() {
  const [information, setInformation] = useState({
    phone: "",
    username: "",
    password: "",
  });
  const [repeatPass, setRepeatPass] = useState("");
  const [show, setShow] = useState([false, false, false]);
  const { signUp } = UserApi;
  const router = useRouter();

  const submit = async () => {
    if (
      information.password === "" ||
      information.phone === "" ||
      information.username === "" ||
      repeatPass === ""
    ) {
      setShow([true, false, false]);
      return;
    }
    if (!/^[0][9]([0-9]{9})$/.test(information.phone)) {
      setShow([false, true, false]);
      return;
    }
    if (repeatPass !== information.password) {
      setShow([false, false, true]);
      return;
    }
    try {
      const obj = information;
      obj.username = DOMPurify.sanitize(obj.username);
      obj.password = DOMPurify.sanitize(obj.password);
      obj.phone = DOMPurify.sanitize(obj.phone);
      const response = await signUp(obj);
      localStorage.setItem("token", response.token);
      toast.success("ثبت نام شما موفقیت آمیز بود", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShow([false, false]);
      localStorage.setItem("UserLogin", "true");
      router.push("/");
    } catch (error) {
      const mes = error.response.data.message;
      if (mes === "phone number is invalid!") {
        toast.error("شماره تلفن نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "Password Should have more than 8 characters") {
        toast.error("رمز عبور باید حداقل شامل هشت کارکتر باشد", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "username is not valid") {
        toast.error("نام کاربری نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "Username Already Exists") {
        toast.error("این نام کاربری قبلا استفاده شده است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "Phone Already Exists") {
        toast.error("شما قبلا ثبت نام کرده اید", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "this phone number already exists!") {
        toast.error("شما قبلا ثبت نام کرده اید", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <>
      <Box component="div" className="grid place-items-center w-full">
        <Box
          component="div"
          className="w-full md:w-2/3 h-fit my-10 p-10 border border-slate-300 bg-white rounded-lg"
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
            لطفا اطلاعات خواسته شده را وارد کنید
          </Box>
          <Box className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4">
            <TextField
              value={information.phone}
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
                setInformation({ ...information, phone: filteredInput });
              }}
            />
            <TextField
              value={information.username}
              fullWidth
              label="نام کاربری"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                setInformation({
                  ...information,
                  username: event.target.value,
                });
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
            <TextField
              value={repeatPass}
              fullWidth
              label="تکرار رمز عبور"
              type="password"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                setRepeatPass(event.target.value);
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
          <Box className="mt-3 text-center">
            {show[0] ? (
              <span className="text-red-600">
                لطفا تمامی موارد خواسته شده را وارد کنید !
              </span>
            ) : (
              ""
            )}
            {show[1] ? (
              <span className="text-red-600">
                شماره موبایل به درستی وارد نشده است !
              </span>
            ) : (
              ""
            )}
            {show[2] ? (
              <span className="text-red-600">
                رمز عبور با تکرار آن مطابقت ندارد !
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
            ثبت نام
          </Button>
          <Box component="div" className="mt-5">
            اگر قبلا ثبت نام کرده اید
            <Link href="/users/login">
              <span className="text-blue-600"> از اینجا وارد </span>
            </Link>
            شوید !
          </Box>
          <Box className="text-xs mt-5 text-center" component="div">
            ثبت نام شما به معنای پذیرش{" "}
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
