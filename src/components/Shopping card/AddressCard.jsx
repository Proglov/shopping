"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import EditAddress from "./EditAddress";
import { useAppDispatch } from "@/store/Hook";
import { SetAddress } from "@/features/Address/AddressSlice";
import UserApi from "@/services/withAuthActivities/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function AddressCard() {
  const [selectAddress, setSelectAddress] = useState(-1);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState([]);
  const [userId, setUserId] = useState("");
  const { getMe } = UserApi;
  const router = useRouter();

  const dispatch = useAppDispatch();

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
        toast.error("لطفا دوباره وارد شوید", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // router.push("/users/login");
      }
    };
    GetUser();
  }, [getMe, setAddress, setUserId]);

  return (
    <>
      <Box className="p-5 mb-1" component="div">
        <Card className="border-2 border-gray-200 rounded-xl">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              className="font-bold mb-4"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "20px",
                  md: "23px",
                  lg: "23px",
                  xl: "23px",
                },
              }}
            >
              آدرس تحویل سفارش
              {address.length == 0 ? (
                ""
              ) : (
                <Button
                  variant="outlined"
                  className="bg-gray-200 border-gray-300 hover:border-gray-400 hover:bg-gray-300 text-gray-950 font-medium float-left rounded-lg"
                  sx={{
                    fontSize: {
                      xs: "10px",
                      sm: "10px",
                      md: "14px",
                      lg: "18px",
                      xl: "18px",
                    },
                  }}
                  onClick={handleOpen}
                >
                  ویرایش آدرس تحویل
                </Button>
              )}
            </Typography>
            {address.length == 0 ? (
              <Button
                variant="outlined"
                className="bg-green-500 border-green-600 hover:border-green-700 hover:bg-green-600 text-white font-medium float-left rounded-lg m-5"
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "10px",
                    md: "14px",
                    lg: "18px",
                    xl: "18px",
                  },
                }}
                onClick={handleOpen}
              >
                اضافه کردن آدرس تحویل
              </Button>
            ) : (
              address.map((item, index) => {
                return (
                  <Box
                    component="div"
                    className="break-words"
                    key={index}
                    sx={{
                      fontSize: {
                        xs: "17px",
                        sm: "20px",
                        md: "26px",
                        lg: "26px",
                        xl: "26px",
                      },
                    }}
                  >
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={
                        <CheckCircleIcon sx={{ color: blue[700] }} />
                      }
                      onClick={() => {
                        setSelectAddress(index);
                        dispatch(SetAddress(address[index]));
                      }}
                      className="ml-2"
                      checked={selectAddress === index}
                    />
                    {item}
                  </Box>
                );
              })
            )}
          </CardContent>
        </Card>
      </Box>
      <EditAddress
        open={open}
        close={handleClose}
        address={address}
        setAddress={setAddress}
        userID={userId}
      />
    </>
  );
}
