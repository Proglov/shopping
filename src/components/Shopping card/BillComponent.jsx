"use client";

import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import { useAppSelector } from "@/store/Hook";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import UserApi from "@/services/withAuthActivities/user";
import moment from "jalali-moment";

export default function BillComponent() {
  const cartProducts = useAppSelector((state) => state.CartProducts);
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [login, setLogin] = useState();
  const [number, setNumber] = useState(0);
  const { getMe } = UserApi;
  const [information, setInformation] = useState({
    name: "",
    phoneNumber: "",
  });

  let counter = cartProducts
    ?.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.number;
    }, 0)
    .toString();

  let price = cartProducts
    ?.reduce((sum, obj) => {
      return sum + obj.number * parseInt(obj.price);
    }, 0)
    .toString();

  useEffect(() => {
    if (localStorage.getItem("UserLogin") == "true") {
      setLogin(true);
      setNumber(1);
    } else {
      setLogin(false);
      setNumber(1);
    }
    if (number === 1) {
      if (!login) {
        toast.warning("شما وارد نشده اید", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/users/login");
      }
      setNumber(0);
    }
    const GetUser = async () => {
      try {
        const user = await getMe();
        setInformation({
          name: user.user.name,
          phoneNumber: user.user.phone,
        });
      } catch (error) {}
    };
    GetUser();
    const add = localStorage.getItem("address");
    const t = localStorage.getItem("time");
    const date = moment.unix(t).format("jYYYY/jMM/jDD HH:mm:ss");
    setTime(date);
    setAddress(add);
  }, [setLogin, login, setAddress, getMe, setInformation, setTime]);

  return (
    <Card className="p-5 m-5 rounded-md">
      <Typography
        variant="h5"
        component="div"
        className="font-bold mb-4 text-center"
        sx={{
          fontSize: {
            xs: "18px",
            sm: "16px",
            md: "24px",
            lg: "24px",
            xl: "24px",
          },
        }}
      >
        فاکتور خرید شما
      </Typography>
      <Box className="p-5 m-5 border-2 border-gray-200 rounded-xl shadow-md grid sm:grid-cols-2 gap-5">
        <Box>
          <span className="text-lg">نام مشتری: </span>
          <span>{information.name}</span>
        </Box>
        <Box>
          <span className="text-lg">شماره تلفن: </span>
          <span>{convertToFarsiNumbers(information.phoneNumber)}</span>
        </Box>
        <Box>
          <span className="text-lg">آدرس تحویل سفارش: </span>
          <span>{address}</span>
        </Box>
        <Box>
          <span className="text-lg">زمان تحویل سفارش: </span>
          <span>
            ساعت: {convertToFarsiNumbers(time.split(" ")[1].split(":")[0])} -
            روز: {convertToFarsiNumbers(time.split(" ")[0])}
          </span>
        </Box>
        <Box>
          <span className="text-lg">تعداد اقلام: </span>
          <span>{counter} عدد</span>
        </Box>
        <Box>
          <span className="text-lg">مبلغ قابل پرداخت: </span>
          <span>{convertToFarsiNumbers(formatPrice(price))} تومان</span>
        </Box>
      </Box>
      <Box className="p-5 mb-1" component="div">
        <Box className="border-2 border-gray-200 rounded-xl shadow-md p-5">
          <div className="grid justify-items-center">
            {cartProducts.map((item, index) => {
              return (
                <>
                  <div className="w-full" key={index} />
                  <div className="m-4 h-auto w-full grid grid-cols-1 gap-4 lg:w-3/4 sm:grid-cols-4">
                    <div className="p-1 mx-auto">
                      <Image
                        height={200}
                        width={200}
                        src={item.src}
                        alt="Product"
                      />
                    </div>
                    <div className="p-2 text-gray-900 sm:col-span-3 grid grid-rows-3 grid-cols-1 justify-items-center items-center sm:grid-rows-2 sm:grid-cols-2 sm:justify-items-start">
                      <div className="sm:col-span-2 mb-2 sm:mb-0">
                        {item.name}
                      </div>
                      <div className="mb-2 sm:mb-0">
                        <div className="w-auto inline-block">
                          <span>تعداد کالا: </span>
                          <span>{convertToFarsiNumbers(item.number)} عدد</span>
                        </div>
                      </div>
                      <div className="grid gap-6">
                        <div>
                          قیمت هر عدد :
                          {convertToFarsiNumbers(
                            formatPrice(item.price.toString())
                          )}{" "}
                          تومان
                        </div>
                        <div>
                          قیمت کل :
                          {convertToFarsiNumbers(
                            formatPrice(
                              Math.ceil(
                                item.number * parseInt(item.price)
                              ).toString()
                            )
                          )}{" "}
                          تومان
                        </div>
                      </div>
                    </div>
                  </div>
                  {cartProducts.length == index + 1 ? (
                    ""
                  ) : (
                    <div className="border-[1px] border-gray-200 w-full h-[2px]"></div>
                  )}
                </>
              );
            })}
          </div>
        </Box>
      </Box>
    </Card>
  );
}
