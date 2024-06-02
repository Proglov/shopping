import EditAddress from "@/components/Shopping card/EditAddress";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function Location() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState([
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
  ]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
              ویرایش آدرس ها
            </Button>
          </Box>
          {address.map((item, index) => {
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
          })}
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
