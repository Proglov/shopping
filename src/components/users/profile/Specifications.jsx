"use client";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import UserApi from "@/services/withAuthActivities/user";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

export default function Specifications() {
  const { getMe, updateUser } = UserApi;
  const [information, setInformation] = useState({
    name: "",
    phone: "",
    email: "",
    userName: "",
  });
  const [newInformation, setNewInformation] = useState({
    name: "",
    phone: "",
    email: "",
    userName: "",
  });
  const [userId, setUserId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true)
    try {
      const obj = newInformation;
      obj.name = DOMPurify.sanitize(obj.name);
      obj.email = DOMPurify.sanitize(obj.email);
      obj.phone = DOMPurify.sanitize(obj.phone);
      obj.userName = DOMPurify.sanitize(obj.userName);

      const changedFields = {};
      Object.keys(obj).forEach((key) => {
        if (obj[key] !== information[key]) {
          changedFields[key] = obj[key];
        }
      });

      await updateUser({
        ...changedFields,
        id: userId,
      });

      setInformation(prev => ({
        ...prev,
        ...changedFields
      }))
      setIsEdit(false);
      toast.success("با موفقیت ثبت شد", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const { message } = error.response.data
      let newMassage;

      switch (message) {
        case "Phone is not valid":
          newMassage = 'شماره همراه صحیح نمی باشد'
          break;
        case "Phone Already Exists":
        case "Phone Already Exists in the Sellers":
          newMassage = 'با این شماره قبلا ثبت نام شده است'
          break;
        case "Email is not valid":
          newMassage = 'ایمیل صحیح نمیباشد'
          break;
        case "Email Already Exists":
          newMassage = 'با این ایمیل قبلا ثبت نام شده است'
          break;
        case "Username Already Exists":
          newMassage = 'با این نام کاربری قبلا ثبت نام شده است'
          break;
        default:
          newMassage = 'مشکلی رخ داد'
          break;
      }
      toast.error(newMassage, { position: toast.POSITION.TOP_RIGHT });
    } finally { setIsSubmitting(false) }
  };

  useEffect(() => {
    const GetUser = async () => {
      try {
        const user = await getMe();
        setInformation({
          name: user.user.name,
          phone: user.user.phone,
          email: user.user.email,
          userName: user.user.username,
        });
        setNewInformation({
          name: user.user.name,
          phone: user.user.phone,
          email: user.user.email,
          userName: user.user.username,
        });
        setUserId(user.user._id);
      } catch (error) { } finally { setLoading(false) }
    };
    GetUser();
  }, [getMe, setInformation]);

  return (
    <Box className="shadow-lg shadow-slate-400 w-full max-w-lg mx-auto md:mt-2 p-5" sx={{ border: 'unset' }}>
      {loading ? <>لطفا منتظر بمانید ...</>
        :
        !isEdit ? (
          <Box className='flex flex-col gap-3 pr-5 relative'>
            <Box>
              <span>نام و نام خانوادگی : </span>
              <span>
                {(information.name === "") | (information.name == undefined)
                  ? "فاقد نام"
                  : information.name}
              </span>
            </Box>

            <Box>
              <span>شماره موبایل : </span>
              <span>
                {(information.phone === "") |
                  (information.phone == undefined)
                  ? "فاقد شماره موبایل"
                  : information.phone}
              </span>
            </Box>

            <Box>
              <span>ایمیل : </span>
              <span>
                {(information.email === "") | (information.email == undefined)
                  ? "فاقد ایمیل"
                  : information.email}
              </span>
            </Box>

            <Box>
              <span>نام کاربری : </span>
              <span>
                {(information.userName === "") |
                  (information.userName == undefined)
                  ? "فاقد نام کاربری"
                  : information.userName}
              </span>
            </Box>

            <Box className="md:absolute left-0">
              <Button
                variant="contained"
                color="info"
                className="bg-blue-500 md:hidden"
                fullWidth
                onClick={() => {
                  setIsEdit(true);
                  setNewInformation(information);
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
                  setNewInformation(information);
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
                disabled={isSubmitting}
                value={newInformation.name}
                label="نام"
                onChange={(event) => {
                  const input = event.target.value;
                  const filteredInput = input.replace(/[^آ-یa-zA-Z]+/g, "");
                  setNewInformation({ ...newInformation, name: filteredInput });
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
                disabled={isSubmitting}
                value={newInformation.phone}
                label="شماره موبایل"
                onChange={(event) => {
                  const input = event.target.value;
                  const filteredInput = input.replace(/\D/g, "");
                  setNewInformation({
                    ...newInformation,
                    phone: filteredInput,
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
                disabled={isSubmitting}
                value={newInformation.email}
                label="ایمیل"
                type="email"
                onChange={(event) => {
                  setNewInformation({
                    ...newInformation,
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
                disabled={isSubmitting}
                value={newInformation.userName}
                label="نام کاربری"
                onChange={(event) => {
                  setNewInformation({
                    ...newInformation,
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

            {
              isSubmitting &&
              <Box className='mt-2 w-full text-center' color='gray'>
                در حال ارسال ...
              </Box>
            }

            <Box className='flex justify-between'>
              <Button
                disabled={isSubmitting}
                variant="contained"
                className="bg-red-500 hover:bg-red-600 text-lg rounded-lg mt-10 w-18"
                onClick={() => {
                  setNewInformation(information);
                  setIsEdit(false);
                }}
              >
                انصراف
              </Button>
              <Button
                disabled={isSubmitting}
                variant="contained"
                className="bg-green-500 hover:bg-green-600 text-lg rounded-lg mt-10 w-18"
                onClick={submit}
              >
                تایید
              </Button>
            </Box>

          </Box>
        )}
    </Box>
  );
}
