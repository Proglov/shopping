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
import { ResetAddressAndTime, SetAddress } from "@/store/AddressAndTime";
import UserApi from "@/services/withAuthActivities/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function AddressCard() {
  const { getMe } = UserApi;

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();
  const AddressAndTime = useSelector((state) => state.AddressAndTime);


  useEffect(() => {
    const GetUser = async () => {
      try {
        setLoading(true)
        const response = await getMe();
        setAddress([...response?.user?.address]);
        setUserId(response?.user?._id);

        const addressIndex = response?.user?.address.findIndex(currentAddress => AddressAndTime.address === currentAddress)
        if (addressIndex < 0) dispatch(ResetAddressAndTime())

      } catch (error) {
        toast.error("لطفا دوباره وارد شوید", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setLoading(false)
      }
    };
    GetUser();
  }, [getMe, setAddress, setUserId]);

  return (
    <>
      <Box className="p-5 mb-1 max-w-2xl mx-auto" component="div">
        <Card className="rounded-xl">
          <CardContent>

            {
              loading ? <>کمی صبر کنید ...</>
                :
                <>
                  <Box
                    variant="div"
                    component="div"
                    className={`mb-4 ${address.length !== 0 && 'flex justify-between'}`}>

                    <Typography variant="h2" fontSize={{ xs: '20px', sm: '22px', lg: '25px' }}>
                      آدرس تحویل سفارش
                    </Typography>

                    {address.length == 0 ? (
                      <Typography className="mx-auto text-center mt-2 text-sm sm:text-base md:text-lg">
                        آدرسی برای شما به ثبت نرسیده است
                      </Typography>
                    ) : (
                      <Button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-950 rounded-lg text-xs sm:text-base md:text-lg"
                        onClick={() => setOpen(true)}
                      >
                        ویرایش آدرس ها
                      </Button>
                    )}

                  </Box>

                  {address.length == 0 ? (
                    <Typography className="flex ">
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white rounded-lg mx-auto text-sm sm:text-base md:text-lg"
                        onClick={() => setOpen(true)}
                      >
                        افزودن آدرس تحویل
                      </Button>
                    </Typography>
                  ) : (
                    address.map((item, index) => {
                      return (
                        <Box
                          component="div"
                          className="flex"
                          key={index}>
                          <Checkbox
                            onClick={() => dispatch(SetAddress(address[index]))}
                            checked={item === AddressAndTime.address}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={
                              <CheckCircleIcon sx={{ color: blue[700] }} />
                            }
                          />
                          <Typography className="text-sm sm:text-base md:text-lg mt-3 sm:mt-1 md:mt-2">
                            {item}
                          </Typography>
                        </Box>
                      );
                    })
                  )}

                </>
            }



          </CardContent>
        </Card>
      </Box>
      <EditAddress
        open={open}
        close={() => setOpen(false)}
        address={address}
        setAddress={setAddress}
        userID={userId}
      />
    </>
  );
}
