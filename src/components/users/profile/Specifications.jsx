"use client";

import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import UserApi from "@/services/withAuthActivities/user";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Specifications() {
  const [isEdit, setIsEdit] = useState(false);
  const { getMe, updateUser } = UserApi;
  const router = useRouter();
  const [information, setInformation] = useState({
    name: "",
    phoneNumber: "",
    // phone: "55005798",
    email: "",
    userName: "",
  });
  const [preInformation, setPreInformation] = useState({
    name: "",
    phoneNumber: "",
    // phone: "",
    email: "",
    userName: "",
  });
  const [userId, setUserId] = useState("");

  const submit = async () => {
    setIsEdit(false);
    try {
      const obj = information;
      obj.name = DOMPurify.sanitize(obj.name);
      obj.email = DOMPurify.sanitize(obj.email);
      obj.phoneNumber = DOMPurify.sanitize(obj.phoneNumber);
      obj.userName = DOMPurify.sanitize(obj.userName);

      const changedFields = {};
      Object.keys(obj).forEach((key) => {
        if (obj[key] !== preInformation[key]) {
          changedFields[key] = obj[key];
        }
      });

      const response = await updateUser({
        ...changedFields,
        id: userId,
      });

      toast.success("با موفقیت ثبت شد", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("دوباره تلاش کنید", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  useEffect(() => {
    const GetUser = async () => {
      try {
        const user = await getMe();
        setInformation({
          name: user.user.name,
          phoneNumber: user.user.phone,
          // phone: "",
          email: user.user.email,
          userName: user.user.username,
        });
        setUserId(user.user._id);
      } catch (error) {}
    };
    GetUser();
  }, [getMe, setInformation]);

  return (
    <>
      <Box className="flex justify-center me-4">
        <Box className="border-2 border-violet-200 h-full w-full p-5">
          {!isEdit ? (
            <Box>
              <Box className="p-3 mb-3">
                <span className="font-bold">نام : </span>
                <span>
                  {(information.name === "") | (information.name == undefined)
                    ? "فاقد نام"
                    : information.name}
                </span>
              </Box>
              {/* <Box className="p-3 mb-3">
                <span className="font-bold">نام خانوادگی : </span>
                <span>{information.family}</span>
              </Box> */}
              <Box className="p-3 mb-3">
                <span className="font-bold">شماره موبایل : </span>
                <span>
                  {(information.phoneNumber === "") |
                  (information.phoneNumber == undefined)
                    ? "فاقد شماره موبایل"
                    : information.phoneNumber}
                </span>
              </Box>
              {/* <Box className="p-3 mb-3">
                <span className="font-bold">شماره تلفن : </span>
                <span>{information.phone}</span>
              </Box> */}
              <Box className="p-3 mb-3">
                <span className="font-bold">ایمیل : </span>
                <span>
                  {(information.email === "") | (information.email == undefined)
                    ? "فاقد ایمیل"
                    : information.email}
                </span>
              </Box>
              <Box className="p-3 mb-3">
                <span className="font-bold">نام کاربری : </span>
                <span>
                  {(information.userName === "") |
                  (information.userName == undefined)
                    ? "فاقد نام کاربری"
                    : information.userName}
                </span>
              </Box>
              <Box className="md:float-left">
                <Button
                  variant="contained"
                  color="info"
                  className="bg-blue-500 md:hidden"
                  fullWidth
                  onClick={() => {
                    setIsEdit(true);
                    setPreInformation(information);
                  }}
                >
                  ویرایش اطلاعات
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  className="bg-blue-500 md:block hidden"
                  onClick={() => {
                    setIsEdit(true);
                    setPreInformation(information);
                  }}
                >
                  ویرایش اطلاعات
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                <TextField
                  value={information.name}
                  label="نام"
                  onChange={(event) => {
                    const input = event.target.value;
                    const filteredInput = input.replace(/[^آ-یa-zA-Z]+/g, "");
                    setInformation({ ...information, name: filteredInput });
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                      left: "inherit !important",
                      right: "1.75rem !important",
                      transformOrigin: "right !important",
                    },
                    "& legend": { textAlign: "right" },
                    "& .MuiInputBase-input": {
                      width: "300px",
                    },
                  }}
                />
                {/* <TextField
                  value={information.family}
                  label="نام خانوادگی"
                  onChange={(event) => {
                    const input = event.target.value;
                    const filteredInput = input.replace(/[^آ-یa-zA-Z]+/g, "");
                    setInformation({ ...information, family: filteredInput });
                  }}
                  sx={{
                    " & .MuiInputLabel-root": {
                      left: "inherit !important",
                      right: "1.75rem !important",
                      transformOrigin: "right !important",
                    },
                    "& legend": { textAlign: "right" },
                    "& .MuiInputBase-input": {
                      width: "300px",
                    },
                  }}
                /> */}
                <TextField
                  value={information.phoneNumber}
                  label="شماره موبایل"
                  onChange={(event) => {
                    const input = event.target.value;
                    const filteredInput = input.replace(/\D/g, "");
                    setInformation({
                      ...information,
                      phoneNumber: filteredInput,
                    });
                  }}
                  sx={{
                    " & .MuiInputLabel-root": {
                      left: "inherit !important",
                      right: "1.75rem !important",
                      transformOrigin: "right !important",
                    },
                    "& legend": { textAlign: "right" },
                    "& .MuiInputBase-input": {
                      width: "300px",
                    },
                  }}
                />
                {/* <TextField
                  value={information.phone}
                  label="شماره تلفن"
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
                    "& .MuiInputBase-input": {
                      width: "300px",
                    },
                  }}
                /> */}
                <TextField
                  value={information.email}
                  label="ایمیل"
                  type="email"
                  onChange={(event) => {
                    setInformation({
                      ...information,
                      email: event.target.value,
                    });
                  }}
                  sx={{
                    " & .MuiInputLabel-root": {
                      left: "inherit !important",
                      right: "1.75rem !important",
                      transformOrigin: "right !important",
                    },
                    "& legend": { textAlign: "right" },
                    "& .MuiInputBase-input": {
                      width: "300px",
                    },
                  }}
                />
                <TextField
                  value={information.userName}
                  label="نام کاربری"
                  onChange={(event) => {
                    setInformation({
                      ...information,
                      userName: event.target.value,
                    });
                  }}
                  sx={{
                    " & .MuiInputLabel-root": {
                      left: "inherit !important",
                      right: "1.75rem !important",
                      transformOrigin: "right !important",
                    },
                    "& legend": { textAlign: "right" },
                    "& .MuiInputBase-input": {
                      width: "300px",
                    },
                  }}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  className="bg-red-500 hover:bg-red-600 text-xl rounded-lg mt-10 float-left"
                  onClick={() => {
                    setInformation(preInformation);
                    setIsEdit(false);
                  }}
                >
                  انصراف
                </Button>
                <Button
                  variant="contained"
                  className="bg-green-500 hover:bg-green-600 text-xl rounded-lg mt-10 float-right"
                  onClick={submit}
                >
                  تایید
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
