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
import { useState } from "react";

export default function AddressCard() {
  const [selectAddress, setSelectAddress] = useState(0);
  const address = [
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
    "تهران،هروی-حسین آباد،میدان،ساختمان،پلاک",
  ];

  return (
    <>
      <Box className="p-5 mb-1" component="div">
        <Card className="border-gray-300">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              className="font-bold mb-4"
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "16px",
                  md: "20px",
                  lg: "24px",
                  xl: "28px",
                },
              }}
            >
              آدرس تحویل سفارش
              <Button
                variant="outlined"
                className="bg-gray-100 border-gray-100 hover:border-gray-300 text-gray-900 font-medium float-left"
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "10px",
                    md: "14px",
                    lg: "18px",
                    xl: "18px",
                  },
                }}
              >
                ویرایش آدرس تحویل
              </Button>
            </Typography>
            {address.map((item, index) => {
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
                    checkedIcon={<CheckCircleIcon sx={{ color: blue[700] }} />}
                    onClick={() => setSelectAddress(index)}
                    className="ml-2"
                    checked={selectAddress === index}
                  />
                  {item}
                </Box>
              );
            })}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
