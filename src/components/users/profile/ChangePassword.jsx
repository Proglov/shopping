"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import UserApi from "@/services/withAuthActivities/user";
import DOMPurify from "dompurify";

export default function ChangePassword() {
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const [show, setShow] = useState([false, false]);
  const { updateUser } = UserApi;
  const [password, setPassword] = useState("");

  const submit = async () => {
    if ((newPass == "") | (repeatNewPass == "")) {
      setShow([false, true]);
      return;
    }
    if (newPass !== repeatNewPass) {
      setShow([true, false]);
      return;
    }
    setShow([false, false]);
    try {
      const pass = DOMPurify.sanitize(newPass);
      const response = await updateUser({
        password: pass,
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Box className="flex justify-center me-4">
        <Box className="border-2 border-violet-200 h-full w-full p-5 grid gap-5">
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
          {show[0] ? (
            <span className="text-red-600">
              رمز جدید را به درستی تکرار نکرده اید !
            </span>
          ) : (
            ""
          )}
          {show[1] ? (
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
