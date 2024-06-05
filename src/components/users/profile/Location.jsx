"use client";

import EditAddress from "@/components/Shopping card/EditAddress";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import UserApi from "@/services/withAuthActivities/user";
import DOMPurify from "dompurify";

export default function Location() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState([]);
  const { getMe } = UserApi;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const GetUser = async () => {
      try {
        const user = await getMe();
        setAddress([...user.user.address]);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    GetUser();
  }, [getMe, setAddress]);

  return (
    <>
      <Box className="flex justify-center me-4">
        <Box className="border-2 border-violet-200 h-full w-full p-5 grid">
          <Box component="div" className="h-fit m-5">
            <span className="text-xl">آدرس های شما :</span>
            <Button
              variant="outlined"
              className="bg-green-500 border-green-600 hover:border-green-700 hover:bg-green-600 text-white float-left rounded-lg"
              onClick={handleOpen}
              size="medium"
            >
              {address.length === 0 ? "اضافه کردن آدرس" : "ویرایش آدرس ها"}
            </Button>
          </Box>
          {address.length !== 0 ? (
            address.map((item, index) => {
              return (
                <Box
                  component="div"
                  className="break-words text-lg m-5 p-5 border-2 border-violet-200"
                  key={index}
                >
                  <Box className="mb-3">
                    {convertToFarsiNumbers((index + 1).toString())})
                  </Box>
                  <Box>{item}</Box>
                </Box>
              );
            })
          ) : (
            <Box className="break-words text-base m-5 p-5">
              آدرسی برای نمایش وجود ندارد
            </Box>
          )}
        </Box>
      </Box>
      <EditAddress
        open={open}
        close={handleClose}
        address={address}
        setAddress={setAddress}
        user={true}
      />
    </>
  );
}
