"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import UserApi from "@/services/withoutAuthActivities/user";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const [show, setShow] = useState([false, false, false]);
  const { updateUser, getMe } = UserApi;
  const user = getMe({ token: localStorage.getItem("token") });

  const submit = () => {
    if ((oldPass == "") | (newPass == "") | (repeatNewPass == "")) {
      setShow([false, false, true]);
      return;
    }
    if (oldPass !== user.password) {
      setShow([true, false, false]);
      return;
    }
    if (newPass !== repeatNewPass) {
      setShow([false, true, false]);
      return;
    }
    setShow([false, false, false]);
    const response = updateUser({
      token: localStorage.getItem("token"),
      password: newPass,
    });
  };
  return (
    <>
      <Box className="flex justify-center me-4">
        <Box className="border-2 border-violet-200 h-full w-full p-5 grid gap-5">
          <TextField
            value={oldPass}
            label="رمز فعلی"
            type="password"
            onChange={(event) => {
              setOldPass(event.target.value);
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
          {show[0] ? (
            <span className="text-red-600">رمز اشتباه می باشد !</span>
          ) : (
            ""
          )}
          <TextField
            value={newPass}
            label="رمز جدید"
            type="password"
            onChange={(event) => {
              setNewPass(event.target.value);
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
            value={repeatNewPass}
            label="تکرار رمز جدید"
            type="password"
            onChange={(event) => {
              setRepeatNewPass(event.target.value);
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
          {show[1] ? (
            <span className="text-red-600">
              رمز جدید را به درستی تکرار نکرده اید !
            </span>
          ) : (
            ""
          )}
          {show[2] ? (
            <span className="text-red-600">
              لطفا تمامی موارد را وارد کنید !
            </span>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            className="bg-green-500 hover:bg-green-600 text-xl rounded-lg mt-10 float-right"
            onClick={submit}
          >
            تایید
          </Button>
        </Box>
      </Box>
    </>
  );
}
