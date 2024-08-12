"use client";
import {
  convertToFarsiNumbers,
  farsiNumCharacter,
  formatPrice,
} from "@/utils/funcs";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Typography } from "@mui/material";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";
import Bill from "./Bill";
import Image from "next/image";
import { useAppDispatch } from "@/store/Hook";
import {
  IncrementCart,
  DecrementCart,
} from "@/store/CartProductsSlice";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { checkUserLoggedIn, getCartProductsFromServer, getCounterProducts, getTotalPrice } from "@/Storage/Storage";
import { MdArrowBackIosNew } from "react-icons/md";


export const TotalPriceContext = createContext()

export default function ShoppingCard({ step }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  let counter = getCounterProducts()

  const addProduct = id => {
    dispatch(IncrementCart(id));
    setProducts(prev => {
      const newState = []
      prev.map(product => {
        const newProd = { ...product }
        if (product._id === id)
          newProd.number++
        newState.push(newProd)
      })
      return newState
    })
  }

  const removeProduct = id => {
    dispatch(DecrementCart(id));
    setProducts(prev => {
      const newState = []
      prev.map(product => {
        const newProd = { ...product }
        if (product._id === id)
          newProd.number--
        if (newProd.number !== 0)
          newState.push(newProd)
      })
      return newState
    })
  }


  useEffect(() => {
    const getProds = async () => {
      try {
        await checkUserLoggedIn()
        setLoading(true)
        setProducts(await getCartProductsFromServer())
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    getProds()

  }, [router, setProducts]);

  useEffect(() => {
    const price = getTotalPrice(products)
    setTotalPrice(price)
  }, [products])


  return (
    <div>
      <Box className="mb-1 mx-auto max-w-xl shadow-lg rounded-xl" style={{ border: '1px solid #ededed' }} component="div">
        <Accordion expanded={expanded} onChange={() => setExpanded(prev => !prev)}>

          <AccordionSummary aria-controls="panel1d-content">
            <Typography
              variant="h5"
              component="div"
              className="flex flex-col justify-between"
            >
              <Typography className="sm:text-base md:text-lg lg:text-[22px] text-sm flex">
                <ShoppingBasketOutlinedIcon className="text-lime-500 ml-1" />
                سبد خرید
                <MdArrowBackIosNew className={`mt-1 mr-2 text-gray-400 transition-all ${expanded && '-rotate-90'}`} />
              </Typography>
              {
                counter !== 0 &&
                <Typography
                  variant="h5"
                  component="div"
                  className="my-2 mr-1.5 text-gray-600 sm:text-base md:text-lg lg:text-[22px] text-sm">
                  {convertToFarsiNumbers(counter)} کالا
                </Typography>
              }
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Card className="shadow-none">
              <CardContent>
                {
                  loading ? <>لطفا صبر کنید ...</>
                    :
                    <div>
                      {counter == 0
                        ? "سبد خرید شما خالی است!"
                        : products.map((item, index) => {
                          return (
                            <div key={index}>
                              <div className="w-full border border-gray-200" />
                              <div className="m-4 h-auto w-full lg:w-3/4 flex sm:flex-row flex-col items-center">
                                <div className="p-1 sm:mx-0">
                                  <Image
                                    height={200}
                                    width={200}
                                    src={item.imagesUrl[0] || "/img/no-pic.png"}
                                    alt="Product"
                                  />
                                </div>
                                <div className="p-2 text-gray-900 sm:mx-0">

                                  <div className=" mb-1 sm:mb-3">
                                    {item.name}
                                  </div>

                                  <div className="mb-1 sm:mb-3">
                                    فی
                                    <span className="text-red-500 mx-1">:</span>
                                    {convertToFarsiNumbers(formatPrice(parseInt(item.price).toString()))}
                                    {" "}
                                    تومان
                                  </div>

                                  <div className="mb-1 sm:mb-3">
                                    مجموع
                                    <span className="text-red-500 mx-1">:</span>
                                    {convertToFarsiNumbers(formatPrice(item.number * parseInt(item.price).toString()))}
                                    {" "}
                                    تومان
                                  </div>

                                  <div>
                                    <div className="border border-gray-400 rounded-lg w-auto inline-block">
                                      <Button
                                        className="hover:bg-white active:bg-white rounded-lg w-auto"
                                        sx={{ color: red[400] }}
                                        onClick={() => addProduct(item._id)}
                                      >
                                        <AddIcon />
                                      </Button>
                                      <span className="text-red-500">
                                        {farsiNumCharacter(item.number)}
                                      </span>
                                      <Button
                                        className="hover:bg-white active:bg-white rounded-lg w-auto"
                                        sx={{ color: red[400] }}
                                        onClick={() => removeProduct(item._id)}
                                      >
                                        {item.number === 1 ? (
                                          <DeleteOutlineOutlinedIcon />
                                        ) : (
                                          <RemoveOutlinedIcon />
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                }
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* {step !== 0 && 
          <Offers />
        } */}

      <TotalPriceContext.Provider value={{ totalPrice }}>
        <Bill step={step} counter={counter} />
      </TotalPriceContext.Provider>
    </div>
  );
}
