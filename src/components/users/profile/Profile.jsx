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
import { useState } from "react";
import { useAppDispatch } from "@/store/Hook";
import { SetLogin } from "@/features/Login/LoginSlice";
import { useRouter } from "next/navigation";

export default function Profile() {
  const menu = ["مشخصات", "آدرس ها", "تغییر رمز عبور"];
  const [active, setActive] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOpen = () => {
    setOpenDialog(true);
  };
  const Close = () => {
    setOpenDialog(false);
  };

  const logOut = () => {
    setOpenDialog(false);
    dispatch(SetLogin(false));
    router.push("/");
  };

  return (
    <>
      <Box className="h-3/4 w-full mt-3 mx-5 grid grid-cols-4">
        <Box className="p-5 shadow-lg shadow-slate-400 relative">
          <Box className="flex justify-center">
            <PersonIcon sx={{ fontSize: "150px" }} color="secondary" />
          </Box>
          {menu.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex mb-2 rounded hover:bg-slate-400 hover:cursor-pointer ${
                  active === index ? "bg-slate-300" : ""
                }`}
                onClick={() => setActive(index)}
              >
                {index === 0 ? (
                  <AccountBoxIcon className="m-2" />
                ) : index === 1 ? (
                  <LocationOnIcon className="m-2" />
                ) : (
                  <VpnKeyRoundedIcon className="m-2" />
                )}
                <Box className="m-2">{item}</Box>
              </div>
            );
          })}
          <Box className="absolute bottom-3">
            <Button color="error" className="text-lg" onClick={handleOpen}>
              خروج
            </Button>
          </Box>
        </Box>
        <Box className="col-span-3"></Box>

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
