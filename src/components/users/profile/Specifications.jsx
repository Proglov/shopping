"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Specifications() {
  const [isEdit, setIsEdit] = useState(false);
  const [information, setInformation] = useState({
    name: "امیرمحمد",
    family: "یعقوب زاده",
    phoneNumber: "09332413624",
    phone: "55005798",
    email: "moghamamir3@gmail.com",
    userName: "AmirMohammad",
  });
  const [preInformation, setPreInformation] = useState({
    name: "",
    family: "",
    phoneNumber: "",
    phone: "",
    email: "",
    userName: "",
  });

  const submit = () => {};
  return (
    <>
      <Box className="flex justify-center me-4">
        <Box className="border-2 border-violet-200 h-full w-full p-5">
          {!isEdit ? (
            <Box>
              <Box className="p-3 mb-3">
                <span className="font-bold">نام : </span>
                <span>{information.name}</span>
              </Box>
              <Box className="p-3 mb-3">
                <span className="font-bold">نام خانوادگی : </span>
                <span>{information.family}</span>
              </Box>
              <Box className="p-3 mb-3">
                <span className="font-bold">شماره موبایل : </span>
                <span>{information.phoneNumber}</span>
              </Box>
              <Box className="p-3 mb-3">
                <span className="font-bold">شماره تلفن : </span>
                <span>{information.phone}</span>
              </Box>
              <Box className="p-3 mb-3">
                <span className="font-bold">ایمیل : </span>
                <span>{information.email}</span>
              </Box>
              <Box className="p-3 mb-3">
                <span className="font-bold">نام کاربری : </span>
                <span>{information.userName}</span>
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
                <TextField
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
                />
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
                <TextField
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
                />
                <TextField
                  value={information.email}
                  label="ایمیل"
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