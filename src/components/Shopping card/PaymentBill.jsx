"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import Link from "next/link";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from "react";
import TXApi from "@/services/withAuthActivities/tx";
import { calculateDate, getCartProductsFromServer, getOffCodeBody, getTotalPrice } from "@/store/Storage/Storage";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ResetAddressAndTime } from "@/store/AddressAndTime";
import { ResetCartProducts } from "@/store/CartProductsSlice";
import DiscountCode from "./DiscountCode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentBill() {
  const { createTX } = TXApi;

  const router = useRouter();
  const AddressAndTime = useSelector((state) => state.AddressAndTime);
  const dispatch = useDispatch()

  const [pay, setPay] = useState(true);  // in the future, this says if user paid the money
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  const CreateTX = async () => {
    try {
      setIsSubmitting(true)
      const { token: discountToken } = getOffCodeBody()
      const newArray = products.map((item) => ({ productId: item._id, quantity: item.number, which: item?.which }));
      if (newArray.length === 0) {
        throw new Error('sabad khalist!')
      }
      const res = await createTX({
        boughtProducts: newArray,
        address: AddressAndTime.address,
        shouldBeSentAt: ((calculateDate(AddressAndTime.day, AddressAndTime.time)).getTime()).toString(),
        discountToken,
      });
      toast.success("سفارش شما با موفقیت ثبت شد", {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.removeItem('offCode')
      dispatch(ResetAddressAndTime())
      dispatch(ResetCartProducts())
      router.push("/shopping-card/payment/" + res?.transactionId);
    } catch (error) {
      toast.error("اشکال در اتصال به اینترنت! لطفا دوباره وارد شوید", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally { setIsSubmitting(false) }
  };

  useEffect(() => {
    const getProds = async () => {
      try {
        setLoading(true)
        const prods = await getCartProductsFromServer()
        setProducts(prods)
        setTotalPrice(getTotalPrice(prods))
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    getProds()
  }, [])

  return (
    <>
      <Box className="p-5 mb-1 max-w-xl mx-auto
      " component="div">
        <Card className="rounded-xl">
          <CardHeader
            title="قبض شما"
            className="border-b-[1px] border-b-slate-200"
          />

          {
            loading ?
              <div className="text-center">کمی صبر کنید ...</div>
              :
              <>
                <CardContent>

                  <Box className='flex gap-2 items-baseline'>
                    <Typography className="lg:text-xl mb-2">
                      مبلغ قابل پرداخت
                      <span className="text-red-500 mx-1">:</span>
                    </Typography>
                    <Typography className="lg:text-xl mb-2">
                      {convertToFarsiNumbers(
                        formatPrice(
                          (totalPrice + 50000).toString()
                        )
                      )}{" "}
                      <span className="text-lg text-gray-600">تومان</span>
                    </Typography>
                  </Box>

                  <DiscountCode />

                  <Box component="div" className="flex p-5">

                    <FormControl className="flex">
                      <Box id="payment" className="text-lg">
                        نحوه پرداخت:
                      </Box>

                      <RadioGroup
                        aria-labelledby="payment"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="offline"
                          control={<Radio color="error" />}
                          label="پرداخت درب منزل"
                          checked
                        />
                        <FormControlLabel
                          value="online"
                          control={<Radio />}
                          label={<div>
                            پرداخت آنلاین
                            <span className="text-sm text-gray-400 mr-1">
                              به زودی ...
                            </span>
                          </div>}
                          disabled
                        />

                      </RadioGroup>
                    </FormControl>


                  </Box>
                </CardContent>

              </>
          }

        </Card>
      </Box>

      <Box
        className="p-5 max-w-xl mx-auto mb-1 flex items-baseline justify-between"
        component="div"
      >
        <Link href="/shopping-card">
          <Button
            disabled={loading || isSubmitting}
            variant="contained"
            className="bg-blue-500 text-bold text-base hover:bg-blue-600 rounded-lg w-fit"
          >
            <GrFormNext className="text-white" />
            مرحله قبل
          </Button>
        </Link>

        {
          isSubmitting &&
          <div className="text-gray-700">درحال ارسال ...</div>
        }

        {pay && (
          <Button
            disabled={loading || isSubmitting}
            variant="contained"
            className="bg-green-500 text-bold text-base hover:bg-green-600 rounded-lg w-fit"
            onClick={CreateTX}
          >
            ثبت نهایی
          </Button>
        )}

      </Box>
    </>
  );
}
