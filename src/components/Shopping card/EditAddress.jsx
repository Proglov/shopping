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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function EditAddress({ open, close, address, setAddress, userID, user = false }) {

  let newAddress = { address: "", index: 0 };
  const [editIndex, setEditIndex] = useState(-1);
  const { updateUser } = UserApi;

  const Changed = (str, index) => {
    newAddress = { address: str, index };
  };

  const onSet = async (flag) => {
    // flag 1 : add new address
    // flag 2 : edit
    // flag 3 : cancel edit
    if (flag === 1) {
      let newAddresses = ["", ...address];
      setAddress(newAddresses);
      setEditIndex(0);
    } else if (flag === 2) {
      let newAddresses = [...address];
      newAddresses[newAddress.index] = newAddress.address;
      if (newAddresses[newAddress.index] !== "" && newAddresses[newAddress.index] !== " ") {
        try {
          const obj = newAddresses.map((item) => DOMPurify.sanitize(item));
          await updateUser({
            address: obj,
            id: userID,
          });
          toast.success("با موفقیت ثبت شد", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setAddress(newAddresses);
          newAddress.address = "";
        } catch (error) {
          toast.error("دوباره تلاش کنید", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        setEditIndex(newAddress.index);
      }
    } else if (flag === 3) {
      let newAddresses = [...address];
      newAddresses = newAddresses.filter(Boolean); // removes null and undefined and "" in the array
      setAddress(newAddresses);
    }
  };

  const handleDelete = async (index) => {
    let arr = [...address];
    arr.splice(index, 1);
    try {
      await updateUser({
        address: arr,
        id: userID,
      });
      toast.success("با موفقیت حذف شد", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddress(arr);
    } catch (error) {
      toast.error("دوباره تلاش کنید", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          xs: { width: "100%", maxWidth: "672px" },
          sm: { width: "85%" },
          md: { width: "90%" },
          lg: { width: "80%" }
        },
      }}
    >

      <DialogTitle>
        <Box className="flex justify-between items-baseline">

          {user ? (
            <div className="sm:text-lg lg:text-xl text-base">آدرس ها</div>
          ) : (
            <div className="sm:text-lg lg:text-xl text-base">آدرس تحویل سفارش</div>
          )}

          <Button
            variant="contained"
            className="bg-green-500 text-white hover:bg-green-600"
            disabled={editIndex > -1}
            onClick={() => onSet(1)}
          >
            افزودن آدرس
          </Button>

        </Box>
      </DialogTitle>

      <DialogContent dividers={address.length > 0}>
        {address.map((item, index) => {
          const isEditing = editIndex === index;
          return (
            <Box
              key={index}
              component="div"
              className="text-lg m-2"
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
                      onClick={() => setEditIndex(index)}
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
                    onChange={(event) => Changed(event.target.value, index)}
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
                        setEditIndex(-1);
                        onSet(2);
                      }}
                    >
                      ذخیره
                    </Button>

                    <Button
                      variant="outlined"
                      className="border-0 hover:border-0 text-red-800"
                      onClick={() => {
                        setEditIndex(-1);
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
            setEditIndex(-1);
          }}
        >
          بستن
        </Button>
      </DialogActions>

    </Dialog>
  );
}