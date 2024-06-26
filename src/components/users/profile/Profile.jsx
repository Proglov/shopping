"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Location from "./Location";
import ChangePassword from "./ChangePassword";
import Specifications from "./Specifications";
import { toast } from "react-toastify";

export default function Profile() {
  const menu = ["مشخصات", "آدرس ها", "تغییر رمز عبور"];
  const [active, setActive] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [login, setLogin] = useState();
  const [number, setNumber] = useState(0);

  const handleOpen = () => {
    setOpenDialog(true);
  };
  const Close = () => {
    setOpenDialog(false);
  };

  const logOut = () => {
    setOpenDialog(false);
    localStorage.removeItem("UserLogin");
    localStorage.removeItem("token");
    router.push("/");
  };

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
  }, [setLogin, router, login, number]);

  return (
    <>
      <Box className="h-full md:h-3/4 w-full mt-3 md:mx-5 grid md:grid-cols-4 grid-cols-1">
        <Box className="p-5 shadow-lg shadow-slate-400 relative md:h-96 my-5">
          <Box className="flex justify-center">
            <PersonIcon sx={{ fontSize: "130px" }} color="secondary" />
          </Box>
          {menu.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex mb-2 rounded hover:bg-slate-400 hover:cursor-pointer ${active === index ? "bg-slate-300" : ""
                  }`}
                onClick={() => setActive(index)}
              >
                {index === 0 ? (
                  <AccountBoxIcon className="m-3" />
                ) : index === 1 ? (
                  <LocationOnIcon className="m-3" />
                ) : (
                  <VpnKeyRoundedIcon className="m-3" />
                )}
                <Box className="m-3">{item}</Box>
              </div>
            );
          })}
          <Box className="md:hidden">
            <Button
              color="error"
              className="text-lg"
              onClick={handleOpen}
              fullWidth
            >
              خروج
            </Button>
          </Box>
          <Box className="md:block absolute bottom-3 hidden">
            <Button color="error" className="text-lg" onClick={handleOpen}>
              خروج
            </Button>
          </Box>
        </Box>
        <Box className="col-span-3 p-4 ">
          {active === 0 ? (
            <Specifications />
          ) : active === 1 ? (
            <Location />
          ) : (
            <ChangePassword />
          )}
        </Box>
        <Dialog
          onClose={Close}
          open={openDialog}
          sx={{
            "& .MuiDialog-paper": {
              lg: { width: "50%", maxWidth: "none" },
              md: { width: "70%", maxWidth: "none" },
              sm: { width: "100%", maxWidth: "none" },
              xs: { width: "100%", maxWidth: "none" },
            },
          }}
        >
          <DialogContent dividers>
            <Box component="div" className="text-xl mt-3">
              آیا واقعا می خواهید خارج شوید؟
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="bg-red-500 hover:bg-red-600 text-xl rounded-lg w-1/6"
              onClick={logOut}
            >
              خروج
            </Button>
            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-xl rounded-lg w-1/6 mr-4"
              onClick={Close}
            >
              انصراف
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
