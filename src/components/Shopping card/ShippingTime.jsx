"use client";
import { FaCalendarAlt } from "react-icons/fa";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { convertToFarsiNumbers, dayOfWeek } from "@/utils/funcs";
import Wheel from "./Wheel"
import "@/styles/wheel.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetDay, SetTime } from "@/store/AddressAndTime";

export default function ShippingTime() {

  const todayIndex = (new Date).getDay()
  const days = []
  for (let i = 0; i < 7; i++) {
    days.push((i + todayIndex) % 7)
  }

  return (
    <Box className="p-5 mb-1 max-w-xl mx-auto" component="div">
      <Card className="rounded-xl">
        <CardContent >

          <Box className='flex'>

            <Typography>
              <FaCalendarAlt color="#0288d1" className="text-3xl" />
            </Typography>

            <Box className='flex flex-col mr-3'>

              <Typography
                variant="h5"
                component="div"
                className="text-lg sm:text-xl md:text-2xl"
              >
                ارسال عادی
              </Typography>


              <Typography
                variant="h7"
                component="div"
                className="text-gray-500 text-base sm:text-lg">
                تحویل در روز و بازه انتخابی
              </Typography>

            </Box>

          </Box>

          <CustomDate days={days} />

        </CardContent>
      </Card>
    </Box>
  );
}

const CustomDate = ({ days }) => {

  const dispatch = useDispatch();
  const AddressAndTime = useSelector((state) => state.AddressAndTime);


  const [isEditing, setIsEditing] = useState(false)
  const [day, setDay] = useState(0) // day 0: today, 1 : tomorrow , etc
  const [time, setTime] = useState(0) // time 0: 7AM, 1: 8AM

  const nowHours = (new Date).getHours()
  const hoursGray = nowHours < 5 ? 0 : nowHours - 5 // 5: 7 - 2 -> 7 : first hour, 2 : maximum shipping time

  const dayCalculator = (relative) => {
    return dayOfWeek(days[relative])
  }
  const timeCalculator = (relative) => {
    return <span dir="ltr">
      {
        convertToFarsiNumbers(relative + 7)
      }
      <span className="text-red-500">:</span>
      <span>
        {convertToFarsiNumbers('00')}
      </span>
    </span>
  }

  const clickHandler = () => {
    setIsEditing(false);
    dispatch(SetDay(day));
    dispatch(SetTime(time));
  }

  return (
    <>
      <div className="h-[200px] flex justify-center items-center">
        روز
        <span className="text-red-500 mx-1">:</span>
        <div className="w-[100px] sm:w-[150px] h-[180px]">
          <Wheel
            initIdx={AddressAndTime.day}
            length={7}
            width={100}
            setValue={dayCalculator}
            setState={setDay}
            setState2={setIsEditing}
          />
        </div>

        <div className="w-[100px] sm:w-[150px] h-[180px]">
          <Wheel
            initIdx={AddressAndTime.time}
            length={15}
            width={100}
            perspective="right"
            setValue={timeCalculator}
            setState={setTime}
            setState2={setIsEditing}
            shouldBeGray={day === 0 ? hoursGray : 0}
          />
        </div>

        <span className="text-red-500 mx-1">:</span>
        ساعت

        <br />
      </div >

      {
        isEditing &&
        <div div className="text-center">
          {
            (day === 0 && time < hoursGray) ?
              <Button variant="outlined" disabled>
                امکان انتخاب این زمان وجود ندارد
              </Button>
              :
              <Button variant="outlined" color="success" onClick={clickHandler}>
                تغییر ارسال به
                {" "}
                {dayCalculator(day)}
                &nbsp;
                {timeCalculator(time)}
              </Button>
          }

        </div >

      }

      <div className="mt-10 flex justify-center gap-1 text-base md:text-lg lg:text-xl">
        <div>
          تحویل کالا در روز
        </div>
        <div>
          {dayCalculator(AddressAndTime.day || 0)}
          {" "}
          ساعت
          {" "}
          {timeCalculator(AddressAndTime.time || 0)}
        </div>
      </div>



    </>
  )
}