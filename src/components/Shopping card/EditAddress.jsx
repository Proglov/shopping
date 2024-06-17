"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import UserApi from "@/services/withAuthActivities/user";
import DOMPurify from "dompurify";

let newAddress = { address: "", index: 0 };

export default function EditAddress({
  open,
  close,
  address,
  setAddress,
  userID,
  user = false,
}) {
  const [edit, setEdit] = useState({});
  const { updateUser } = UserApi;

  const Changed = (str, index) => {
    newAddress = { address: str, index: index };
  };

  const onSet = async (flag) => {
    if (flag === 1) {
      let str = ["", ...address];
      setAddress(str);
      setEdit({ ...edit, [0]: true });
    } else if (flag === 2) {
      let str = [...address];
      str[newAddress.index] = newAddress.address;
      if (str[newAddress.index] !== "" && str[newAddress.index] !== " ") {
        try {
          const obj = str.map((item) => {
            return DOMPurify.sanitize(item);
          });
          const response = await updateUser({
            address: obj,
            id: userID,
          });
          setAddress(str);
          newAddress.address = "";
        } catch (error) {
          alert(error.response.data.message);
        }
      } else {
        setEdit({ ...edit, [newAddress.index]: true });
      }
    } else if (flag === 3) {
      let str = [...address];
      str = str.filter(Boolean);
      setAddress(str);
    }
  };

  const handleDelete = async (index) => {
    let arr = [...address];
    arr.splice(index, 1);
    try {
      const response = await updateUser({
        address: arr,
        id: userID,
      });
      setAddress(arr);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          lg: { width: "80%", maxWidth: "none" },
          md: { width: "90%", maxWidth: "none" },
          sm: { width: "100%", maxWidth: "none" },
          xs: { width: "100%", maxWidth: "none" },
        },
      }}
    >
      <DialogTitle>
        <Box className="grid md:grid-cols-2 justify-center">
          {user ? (
            <span className="md:text-3xl text-lg">آدرس ها</span>
          ) : (
            <span className="md:text-3xl text-lg">آدرس تحویل سفارش</span>
          )}
          <Box component="div" className="mt-2 md:mt-0 md:flex md:justify-end">
            <Button
              variant="contained"
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={() => onSet(1)}
            >
              اضافه کردن آدرس
            </Button>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {address.map((item, index) => {
          const isEditing = edit[index];
          return (
            <Box
              key={index}
              component="div"
              className="text-lg m-2 grid md:grid-cols-2"
            >
              {!isEditing ? (
                <>
                  <span>{item}</span>
                  <Box
                    component="div"
                    className="mt-2 md:mt-0 md:flex md:justify-end"
                  >
                    <Button
                      variant="outlined"
                      className="border-0 hover:border-0 text-blue-800"
                      onClick={() => setEdit({ ...edit, [index]: true })}
                    >
                      ویرایش
                    </Button>
                    <Button
                      variant="outlined"
                      className="border-0 hover:border-0 text-red-800"
                      onClick={() => handleDelete(index)}
                    >
                      حذف
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    label="آدرس"
                    focused="true"
                    defaultValue={item}
                    onChange={(event) => {
                      Changed(event.target.value, index);
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
                  <Box
                    component="div"
                    className="mt-2 md:mt-0 md:flex md:justify-end"
                  >
                    <Button
                      variant="outlined"
                      className="border-0 hover:border-0 text-green-800"
                      onClick={() => {
                        setEdit({ ...edit, [index]: false });
                        onSet(2);
                      }}
                    >
                      ذخیره
                    </Button>
                    <Button
                      variant="outlined"
                      className="border-0 hover:border-0 text-red-800"
                      onClick={() => {
                        setEdit({ ...edit, [index]: false });
                        onSet(3);
                      }}
                    >
                      انصراف
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          );
        })}
      </DialogContent>
      <DialogActions className="flex md:justify-start justify-center m-1">
        <Button
          variant="contained"
          className="bg-red-500 text-white hover:bg-red-600 mr-2"
          onClick={() => {
            close();
            onSet(3);
            setEdit({ ...edit, [0]: false });
          }}
        >
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
}
