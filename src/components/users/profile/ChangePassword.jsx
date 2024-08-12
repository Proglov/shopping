"use client";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import UserApi from "@/services/withAuthActivities/user";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const { updateUser, getMe } = UserApi;
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    if (newPass === "" || repeatNewPass === "") {
      setError('تمامی فیلد ها الزامیست!')
    } else if (newPass.length < 8) {
      setError('رمزعبو حداقل شامل هشت کاراکتر میباشد!')
    } else if (newPass !== repeatNewPass) {
      setError('رمز عبور با تکرار آن مطابقت ندارد!')
    } else {
      try {
        const pass = DOMPurify.sanitize(newPass);
        await updateUser({
          password: pass,
          id: userId,
        });
        setNewPass('')
        setRepeatNewPass('')
        toast.success("رمز عبور با موفقیت تغییر یافت", { position: toast.POSITION.TOP_RIGHT });
      } catch (error) {
        toast.error("دوباره تلاش کنید", { position: toast.POSITION.TOP_RIGHT });
      }
    }

  };

  useEffect(() => {
    const GetUser = async () => {
      try {
        const user = await getMe();
        setUserId(user.user._id);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    GetUser();
  }, [getMe, setUserId]);

  return (
    <Box className="shadow-lg shadow-slate-400 w-full max-w-lg mx-auto md:mt-2 p-5 grid gap-3" sx={{ border: 'unset' }}>

      <TextField
        value={newPass}
        label="رمز جدید"
        type="password"
        onChange={(event) => {
          setError('')
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
          setError('')
          setRepeatNewPass(event.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit()
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

      {!!error && (
        <span className="text-red-600">
          {error}
        </span>
      )}

      <Button
        variant="contained"
        className="bg-green-500 hover:bg-green-600 text-xl rounded-lg mt-10 float-right"
        onClick={submit}
      >
        تایید
      </Button>
    </Box>
  );
}
