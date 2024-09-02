"use client";
import { Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Location from "./Location";
import ChangePassword from "./ChangePassword";
import Specifications from "./Specifications";
import { toast } from "react-toastify";
import MyTX from "./MyTX";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Profile({ tab }) {
  const router = useRouter();
  const login = useSelector((state) => state.Login);

  const menu = [
    {
      tab: 'specifications',
      farsi: "مشخصات"
    },
    {
      tab: 'location',
      farsi: "آدرس ها"
    },
    {
      tab: 'changePassword',
      farsi: "تغییر رمز عبور"
    },
    {
      tab: 'myTX',
      farsi: "سفارشات من"
    }
  ]

  useEffect(() => {
    if (localStorage.getItem('login') !== 'user') {
      toast.warning("شما وارد نشده اید", {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push("/users/login");
    }
  }, [login]);

  return (
    <Box className="w-full max-w-3xl mt-3 mx-auto grid md:grid-cols-4 grid-cols-1">

      <Box className="p-5 shadow-lg shadow-slate-400 mx-auto w-full max-w-lg md:my-5 h-fit">

        <Box className="flex justify-center">
          <PersonIcon sx={{ fontSize: "130px" }} color="disabled" />
        </Box>

        <Box className='flex flex-col'>
          {menu.map((item, index) => {
            return (
              <Link key={index} href={`/users/profile?tab=${item.tab}`}>
                <Button
                  color='info'
                  variant={item.tab === tab ? 'contained' : 'outlined'}
                  className={`flex justify-center gap-x-2 mb-2 rounded w-full`}
                >
                  {index === 0 ? (
                    <AccountBoxIcon />
                  ) : index === 1 ? (
                    <LocationOnIcon />
                  ) : index === 2 ? (
                    <VpnKeyRoundedIcon />
                  ) : (
                    <LiaFileInvoiceDollarSolid className="text-lg" />
                  )}
                  <Box className='text-center md:w-full'>{item.farsi}</Box>
                </Button>
              </Link>
            );
          })}
        </Box>

      </Box>

      <Box className="col-span-3 p-4">
        {tab === menu[0].tab ? (
          <Specifications />
        ) : tab === menu[1].tab ? (
          <Location />
        ) : tab === menu[2].tab ? (
          <ChangePassword />
        ) : (
          <MyTX />
        )}
      </Box>

    </Box>
  );
}
