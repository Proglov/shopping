"use client";
import EditAddress from "@/components/Shopping card/EditAddress";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import UserApi from "@/services/withAuthActivities/user";

export default function Location() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState([]);
  const { getMe } = UserApi;
  const [userId, setUserId] = useState("");

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
        setUserId(user.user._id);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    GetUser();
  }, [getMe, setAddress, setUserId]);

  return (
    <>
      <Box className="shadow-lg shadow-slate-400 w-full max-w-lg mx-auto md:mt-2 p-5" sx={{ border: 'unset' }}>

        <Box component="div" className="flex justify-between items-center m-5">
          <Box className="text-xl">آدرس های شما :</Box>
          <Button
            variant="text"
            className="bg-green-500  hover:bg-green-600 text-white rounded-lg"
            onClick={handleOpen}
          >
            {address.length === 0 ? "اضافه کردن آدرس" : "ویرایش آدرس ها"}
          </Button>
        </Box>

        <Box>
          {address.length !== 0 ? (
            address.map((item, index) => {
              return (
                <Box
                  component="div"
                  className="text-lg m-1 mt-3 shadow-lg shadow-slate-400 p-3 rounded-lg"
                  key={index}
                >
                  {item}
                </Box>
              );
            })
          ) : (
            <Box className="text-base m-5">
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
        userID={userId}
        user={true}
      />
    </>
  );
}
