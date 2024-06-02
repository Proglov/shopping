"use client";

import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import SellerApi from "@/services/withoutAuthActivities/seller";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/Hook";
import { SetLogin } from "@/features/Login/LoginSlice";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpSeller() {
  const [information, setInformation] = useState({
    name: "",
    storeName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    workingPhone: "",
    address: "",
    bio: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const [show, setShow] = useState([false, false, false, false]);
  const { sellerSignUp } = SellerApi;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const submit = async () => {
    if (
      (information.name === "") |
      (information.storeName === "") |
      (information.email === "") |
      (information.username === "") |
      (information.password === "") |
      (information.phone === "") |
      (information.workingPhone === "") |
      (information.address === "") |
      (information.bio === "") |
      (repeatPassword === "")
    ) {
      setShow([true, false, false, false]);
      return;
    }
    if (information.password !== repeatPassword) {
      setShow([false, true, false, false]);
      return;
    }
    if (!/^[0][9]([0-9]{9})$/.test(information.phone)) {
      setShow([false, false, true, false]);
      return;
    }
    if (!/^([0-9]{11})$/.test(information.workingPhone)) {
      setShow([false, false, false, true]);
      return;
    }
    try {
      const obj = information;
      obj.name = DOMPurify.sanitize(obj.name);
      obj.storeName = DOMPurify.sanitize(obj.storeName);
      obj.email = DOMPurify.sanitize(obj.email);
      obj.username = DOMPurify.sanitize(obj.username);
      obj.password = DOMPurify.sanitize(obj.password);
      obj.phone = DOMPurify.sanitize(obj.phone);
      obj.workingPhone = DOMPurify.sanitize(obj.workingPhone);
      obj.address = DOMPurify.sanitize(obj.address);
      obj.bio = DOMPurify.sanitize(obj.bio);

      const response = await sellerSignUp(obj);
      localStorage.setItem("token", response.token);
      toast.success("ثبت نام شما موفقیت آمیز بود", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShow([false, false, false, false]);
      dispatch(SetLogin(true));
      router.push("/");
    } catch (error) {
      const mes = error.response.data.message;
      if (mes === "working phone number is invalid!") {
        toast.error("تلفن فروشگاه نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "phone number is invalid!") {
        toast.error("شماره تلفن نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "username is not valid") {
        toast.error("نام کاربری نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "address is not valid") {
        toast.error("آدرس نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "bio is not valid") {
        toast.error("معرفی فروشگاه کوتاه است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "storeName is not valid") {
        toast.error("نام فروشگاه نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "name is not valid") {
        toast.error("نام و نام خانوادگی نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "email is not valid") {
        toast.error("ایمیل نامعتبر است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "Phone Already Exists") {
        toast.error("شماره تلفن قبلا ثبت شده است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "Phone Already Exists In Users") {
        toast.error("شماره تلفن قبلا به عنوان مشتری ثبت شده است", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (mes === "Working Phone Already Exists") {
        toast.error("شماره تلفن فروشگاه قبلا ثبت شده است", {
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
            لطفا اطلاعات خواسته شده را وارد کنید :
          </Box>
          <Box className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4">
            <TextField
              value={information.name}
              label="نام و نام خانوادگی"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                const input = event.target.value;
                const filteredInput = input.replace(/[^آ-یa-zA-Z]+/g, "");
                setInformation({ ...information, name: filteredInput });
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
              value={information.storeName}
              label="نام فروشگاه"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                const input = event.target.value;
                const filteredInput = input.replace(/[^آ-یa-zA-Z]+/g, "");
                setInformation({ ...information, storeName: filteredInput });
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
              value={information.email}
              label="ایمیل"
              type="email"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                setInformation({ ...information, email: event.target.value });
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
              value={information.phone}
              label="تلفن همراه"
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
              value={information.workingPhone}
              label="تلفن فروشگاه"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                const input = event.target.value;
                const filteredInput = input.replace(/\D/g, "");
                setInformation({ ...information, workingPhone: filteredInput });
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
              value={information.address}
              label="آدرس"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                setInformation({ ...information, address: event.target.value });
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
              value={information.bio}
              label="معرفی فروشگاه"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                setInformation({ ...information, bio: event.target.value });
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
              value={information.username}
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
              value={repeatPassword}
              label="تکرار رمز عبور"
              type="password"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit();
                }
              }}
              onChange={(event) => {
                setRepeatPassword(event.target.value);
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
          <Box component="div" className="text-center mt-3">
            {show[0] ? (
              <span className="text-red-600">
                لطفا تمامی موارد را وارد کنید !
              </span>
            ) : (
              ""
            )}
            {show[1] ? (
              <span className="text-red-600">
                رمز عبور با تکرار آن مطابقت ندارد !
              </span>
            ) : (
              ""
            )}
            {show[2] ? (
              <span className="text-red-600">
                تلفن همراه را به درستی وارد کنید !
              </span>
            ) : (
              ""
            )}
            {show[3] ? (
              <span className="text-red-600">
                تلفن فروشگاه را به درستی وارد کنید !
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
