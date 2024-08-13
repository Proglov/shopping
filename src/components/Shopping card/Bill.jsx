"use client";
import { useContext } from "react";
import { convertToFarsiNumbers, formatPrice, iranianCalendar } from "@/utils/funcs";
import { Box, Button, Card, Typography } from "@mui/material";
import { GrFormPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TotalPriceContext } from "./ShoppingCard"
import { useSelector } from "react-redux";
import { calculateDate } from "@/store/Storage/Storage";

export default function Bill({ counter, step }) {
  const router = useRouter();
  const { totalPrice } = useContext(TotalPriceContext)
  const AddressAndTime = useSelector((state) => state.AddressAndTime);

  const theTime = calculateDate(AddressAndTime.day, AddressAndTime.time)
  const theHour = theTime.getHours()

  return (
    <>
      {
        totalPrice > 0 &&
        <>

          <Box className="p-5 mb-1 max-w-xl mx-auto" component="div">
            <Card className="shadow-2xl" sx={{
              boxShadow: 'unset',
              borderRadius: '20px',
              borderTopRightRadius: '0%',
              borderTopLeftRadius: '0%'
            }}>

              <Box sx={{
                marginBottom: {
                  xs: "-15px",
                  sm: "-14px",
                  md: "-19px",
                  lg: "-24px",
                  xl: "-27px",
                }
              }}>
                <Typography
                  className="top-3 relative"
                  sx={{
                    border: '1px solid rgb(209,213,219)',
                    transform: "translateY(15px)",
                    borderTopWidth: "2px",
                    borderTopRightRadius: "50%",
                    borderTopLeftRadius: "50%",
                  }}
                />
                <Typography
                  sx={{
                    zIndex: "100",
                    position: "relative",
                    width: {
                      xs: "30%",
                      sm: "25%",
                      md: "28%",
                      lg: "30%",
                      xl: "35%",
                    },
                    fontSize: {
                      xs: "15px",
                      sm: "16px",
                      md: "20px",
                      lg: "22px",
                      xl: "24px",
                    },
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                  className="bg-white m-2 flex justify-center mx-auto"
                >
                  <LiaFileInvoiceDollarSolid className="mt-1 text-cyan-500 ml-1" />
                  <span className="mr-1">فاکتور
                    {" "}
                    {
                      step === 0 ?
                        <>اولیه</>
                        :
                        <>نهایی</>
                    }
                  </span>
                </Typography>
              </Box>

              <Box className="p-3 lg:pt-5 pt-4 rounded-b-lg">
                <Box className='flex items-baseline mb-2'>
                  <Typography className="lg:text-xl" >
                    تعداد اقلام
                  </Typography>

                  <span className="text-red-500 mx-1">:</span>

                  <Typography className="lg:text-xl">
                    {convertToFarsiNumbers(counter)}{" "}
                    <span className="text-lg text-gray-600">کالا</span>
                  </Typography>
                </Box>

                <Box className='flex items-baseline mb-2'>
                  <Typography className="lg:text-xl mb-2" >
                    مبلغ کل اقلام
                  </Typography>

                  <span className="text-red-500 mx-1">:</span>

                  <Typography className="lg:text-xl mb-2" >
                    {convertToFarsiNumbers(formatPrice(totalPrice))}
                    {" "}
                    <span className="text-lg text-gray-600">تومان</span>
                  </Typography>
                </Box>

                {step !== 0 && (
                  <>
                    <Box className='flex items-baseline mb-2'>

                      <Typography className="lg:text-xl mb-2" >
                        هزینه ارسال
                      </Typography>

                      <span className="text-red-500 mx-1">:</span>

                      <Typography className="lg:text-xl mb-2" >
                        {convertToFarsiNumbers(formatPrice(50000))}
                        {" "}
                        <span className="text-lg text-gray-600">تومان</span>
                      </Typography>
                    </Box>

                    <Box className='flex items-baseline mb-2'>

                      <Typography className="lg:text-xl mb-2" >
                        مبلغ قابل پرداخت
                      </Typography>

                      <span className="text-red-500 mx-1">:</span>

                      <Typography className="lg:text-xl mb-2" >
                        {convertToFarsiNumbers(formatPrice((totalPrice + 50000).toString()))}
                        {" "}
                        <span className="text-lg text-gray-600">تومان</span>
                      </Typography>

                    </Box>

                    {AddressAndTime.address !== '' && (
                      <Box className='flex items-baseline mb-2'>

                        <Typography className="lg:text-xl mb-2" >
                          آدرس
                        </Typography>

                        <span className="text-red-500 mx-1">:</span>

                        <Typography className="lg:text-xl mb-2" >
                          {AddressAndTime.address}
                        </Typography>

                      </Box>
                    )}

                    <Box className='flex items-baseline mb-2'>

                      <Typography className="lg:text-xl mb-2" >
                        تاریخ ارسال
                      </Typography>

                      <span className="text-red-500 mx-1">:</span>

                      <Typography className="lg:text-xl mb-2 flex justify-start gap-3" >
                        <span>
                          {iranianCalendar(theTime)}
                        </span>

                        {
                          theHour < 12 ?
                            <span>
                              {convertToFarsiNumbers(theHour)}
                              {" "}
                              صبح
                            </span>
                            :
                            theHour == 12 ?
                              <span>
                                {convertToFarsiNumbers(12)}
                                {" "}
                                ظهر
                              </span>
                              :
                              theHour < 14 ?
                                <span>
                                  {convertToFarsiNumbers(theHour - 12)}
                                  {" "}
                                  ظهر
                                </span>
                                :
                                theHour < 17 ?
                                  <span>
                                    {convertToFarsiNumbers(theHour - 12)}
                                    {" "}
                                    بعد از ظهر
                                  </span>
                                  :
                                  theHour < 19 ?
                                    <span>
                                      {convertToFarsiNumbers(theHour - 12)}
                                      {" "}
                                      عصر
                                    </span>
                                    :
                                    <span>
                                      {convertToFarsiNumbers(theHour - 12)}
                                      {" "}
                                      شب
                                    </span>
                        }

                      </Typography>

                    </Box>
                  </>
                )}


              </Box>

            </Card>
          </Box>


          {step !== 0 && (
            <Box
              className={`max-w-xl mx-auto p-5 mb-1 ${!AddressAndTime.address && 'flex justify-between items-baseline'}`}
              component="div"
            >
              {
                !AddressAndTime.address &&
                <div className="text-red-500">
                  آدرس خود را انتخاب نمایید
                </div>
              }
              <div className="text-left">
                <Button
                  variant="contained"
                  className="bg-blue-500 text-bold text-base hover:bg-blue-600 rounded-lg w-fit disabled:text-white"
                  onClick={() => {
                    router.push("/shopping-card/payment");
                  }}
                  disabled={!AddressAndTime.address}
                >
                  مرحله بعد
                  <GrFormPrevious className="text-white text-[35px]" />
                </Button>
              </div>
            </Box>
          )}
        </>
      }
    </>
  );
}
