"use client";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { blue } from "@mui/material/colors";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useAppDispatch } from "@/store/Hook";
import { SetTime, ChangeTime } from "@/features/ShippingTime/TimeSlice";
import moment from "jalali-moment";

export default function ShippingTime() {
  const [active, setActive] = useState("today");
  const [selectTime, setSelectTime] = useState(-1);
  const [showMore, setShowMore] = useState(false);
  const dispatch = useAppDispatch();

  const todayTime = [
    { start: "10:00", end: "12:00", price: "15000" },
    { start: "12:00", end: "14:00", price: "15000" },
    { start: "15:00", end: "16:00", price: "12000" },
    { start: "16:00", end: "18:00", price: "15000" },
    { start: "17:00", end: "19:00", price: "30000" },
    { start: "19:00", end: "20:00", price: "40000" },
    { start: "19:00", end: "20:00", price: "40000" },
    { start: "19:00", end: "20:00", price: "40000" },
    { start: "19:00", end: "20:00", price: "40000" },
  ];

  const tomorrowTime = [
    { start: "08:00", end: "12:00", price: "95000" },
    { start: "02:00", end: "14:00", price: "55000" },
    { start: "15:00", end: "16:00", price: "12000" },
    { start: "16:00", end: "18:00", price: "15000" },
    { start: "17:00", end: "19:00", price: "30000" },
    { start: "19:00", end: "20:00", price: "40000" },
    { start: "19:00", end: "20:00", price: "40000" },
    { start: "19:00", end: "20:00", price: "40000" },
    { start: "19:00", end: "20:00", price: "40000" },
    { start: "19:00", end: "20:00", price: "40000" },
  ];

  const selected = (date) => {
    const day = active === "today" ? 0 : 1;
    const time = [parseInt(date.start), parseInt(date.end)];
    const price = date.price;
    const select = true;
    dispatch(SetTime({ day: day, time: time, price: price, select: select }));
  };

  const submit = (date) => {
    const time = moment().format("jYYYY/jMM/jDD HH:mm:ss");
    const day = time.split(" ")[0];
    const hour = date.start + ":00";
    const jalaliDate = day + " " + hour;
    const momentDate = moment(jalaliDate, "jYYYY/jMM/jDD HH:mm:ss").utc();
    const secondsSince1970 = momentDate.unix();
    if (active === "today") {
      localStorage.setItem("time", secondsSince1970);
    } else {
      const c = parseInt(secondsSince1970) + 86400;
      localStorage.setItem("time", c.toString());
    }
  };

  return (
    <>
      <Box className="p-5 mb-1" component="div">
        <Card className="border-2 border-gray-200 rounded-xl">
          <CardContent>
            <Grid container className="mb-4">
              <Grid
                item
                xs={1.5}
                xl={0.5}
                container
                direction="row"
                alignItems="center"
              >
                <CalendarTodayOutlinedIcon fontSize="large" />
              </Grid>
              <Grid item xs={10.5} xl={11.4} container direction="column">
                <Grid>
                  <Typography
                    variant="h5"
                    component="div"
                    className="font-bold"
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
                    ارسال عادی
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant="h7"
                    component="div"
                    className="text-gray-500"
                    sx={{
                      fontSize: {
                        xs: "14px",
                        sm: "12px",
                        md: "16px",
                        lg: "16px",
                        xl: "18px",
                      },
                    }}
                  >
                    تحویل در روز و بازه انتخابی
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Box className="grid justify-items-center" component="div">
              <Button
                variant="contained"
                className={`mb-3 text-bold text-lg hover:text-white hover:bg-blue-400 rounded-lg ${
                  active === "today"
                    ? "bg-blue-700 text-white"
                    : "bg-blue-100 text-blue-600"
                }`}
                sx={{
                  width: {
                    xs: "280px",
                    sm: "500px",
                    md: "650px",
                    lg: "800px",
                    xl: "1200px",
                  },
                }}
                onClick={() => {
                  setActive("today");
                  setShowMore(false);
                  setSelectTime(-1);
                  dispatch(ChangeTime());
                }}
              >
                امروز
              </Button>
              <Button
                variant="contained"
                className={`mb-3 text-bold text-lg hover:text-white hover:bg-blue-400 rounded-lg ${
                  active === "tomorrow"
                    ? "bg-blue-700 text-white"
                    : "bg-blue-100 text-blue-600"
                }`}
                sx={{
                  width: {
                    xs: "280px",
                    sm: "500px",
                    md: "650px",
                    lg: "800px",
                    xl: "1200px",
                  },
                }}
                onClick={() => {
                  setActive("tomorrow");
                  setShowMore(false);
                  setSelectTime(-1);
                  dispatch(ChangeTime());
                }}
              >
                فردا
              </Button>
            </Box>
            <Box className="p-3">
              {active === "today"
                ? todayTime.map((item, index) => {
                    if (showMore)
                      return (
                        <Box
                          component="div"
                          className="break-words text-bold text-black"
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
                              setSelectTime(index);
                              selected(item);
                              submit(item);
                            }}
                            className="ml-2"
                            checked={selectTime === index}
                          />
                          {convertToFarsiNumbers(item.start)} تا{" "}
                          {convertToFarsiNumbers(item.end)}
                          <span className="float-left md:mt-0 mt-2">
                            {convertToFarsiNumbers(formatPrice(item.price))}{" "}
                            تومان
                          </span>
                        </Box>
                      );
                    if (index < 6)
                      return (
                        <Box
                          component="div"
                          className="break-words text-bold text-black"
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
                              setSelectTime(index);
                              selected(item);
                              submit(item);
                            }}
                            className="ml-2"
                            checked={selectTime === index}
                          />
                          {convertToFarsiNumbers(item.start)} تا{" "}
                          {convertToFarsiNumbers(item.end)}
                          <span className="float-left md:mt-0 mt-2">
                            {convertToFarsiNumbers(formatPrice(item.price))}{" "}
                            تومان
                          </span>
                        </Box>
                      );
                  })
                : tomorrowTime.map((item, index) => {
                    if (showMore)
                      return (
                        <Box
                          component="div"
                          className="break-words text-bold text-black"
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
                              setSelectTime(index);
                              selected(item);
                              submit(item);
                            }}
                            className="ml-2"
                            checked={selectTime === index}
                          />
                          {convertToFarsiNumbers(item.start)} تا{" "}
                          {convertToFarsiNumbers(item.end)}
                          <span className="float-left md:mt-0 mt-2">
                            {convertToFarsiNumbers(formatPrice(item.price))}{" "}
                            تومان
                          </span>
                        </Box>
                      );
                    if (index < 6)
                      return (
                        <Box
                          component="div"
                          className="break-words text-bold text-black"
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
                              setSelectTime(index);
                              selected(item);
                              submit(item);
                            }}
                            className="ml-2"
                            checked={selectTime === index}
                          />
                          {convertToFarsiNumbers(item.start)} تا{" "}
                          {convertToFarsiNumbers(item.end)}
                          <span className="float-left md:mt-0 mt-2">
                            {convertToFarsiNumbers(formatPrice(item.price))}{" "}
                            تومان
                          </span>
                        </Box>
                      );
                  })}
              {!showMore && (
                <Box component="div" className="grid justify-items-center">
                  <Button
                    size="medium"
                    variant="text"
                    className="text-lg text-blue-700 text-bold"
                    onClick={() => setShowMore(true)}
                  >
                    زمان های تحویل بیشتر
                    <ExpandMoreOutlinedIcon sx={{ fontSize: 40 }} />
                  </Button>
                </Box>
              )}
              {showMore && (
                <Box component="div" className="grid justify-items-center">
                  <Button
                    size="medium"
                    variant="text"
                    className="text-xl text-red-700 text-bold"
                    onClick={() => setShowMore(false)}
                  >
                    زمان های تحویل کمتر
                    <ExpandLessIcon sx={{ fontSize: 40 }} />
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
