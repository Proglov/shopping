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
import {
  IncrementCart,
  DecrementCart,
} from "@/store/CartProductsSlice";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { getCartProductsFromServer, getCounterProducts, getTotalPrice } from "@/store/Storage/Storage";
import { MdArrowBackIosNew } from "react-icons/md";
import { useDispatch } from "react-redux";


export const TotalPriceContext = createContext()

const ProductComponent = ({ product, addProduct, removeProduct }) => {
  let img;
  if (product?.imagesUrl?.length !== 0) img = product?.imagesUrl[0]
  else img = "/img/no-pic.png"

  return (
    <div>
      <div className="w-full border border-gray-200" />
      <div className="m-4 h-auto w-full lg:w-3/4 flex sm:flex-row flex-col items-center">

        <div className="p-1 sm:mx-0">
          <Image
            height={200}
            width={200}
            src={img}
            alt="Product"
          />
        </div>

        <div className="p-2 text-gray-900 sm:mx-0">

          <div className=" mb-1 sm:mb-3">
            {product.name}
          </div>

          <div className="mb-1 sm:mb-3 flex">
            فی
            <span className="text-red-500 mx-1">:</span>
            {
              product?.which === 'festival' ?
                <span className="sm:text-base text-sm flex flex-col">
                  <span>
                    {convertToFarsiNumbers(
                      formatPrice(Math.floor((product.price * (1 - product.festivalOffPercentage / 100))).toString())
                    )}
                  </span>
                  <span className="line-through text-red-600">
                    {convertToFarsiNumbers(
                      formatPrice(product.price.toString())
                    )}
                  </span>
                </span>
                :
                product?.which === 'major' && product.number >= product.quantity ?
                  <span className="sm:text-base text-sm flex flex-col">
                    <span>
                      {convertToFarsiNumbers(
                        formatPrice(Math.floor((product.price * (1 - product.majorOffPercentage / 100))).toString())
                      )}
                    </span>
                    <span className="line-through text-red-600">
                      {convertToFarsiNumbers(
                        formatPrice(product.price.toString())
                      )}
                    </span>
                  </span>
                  :
                  <span>
                    {convertToFarsiNumbers(
                      formatPrice(product.price.toString())
                    )}
                  </span>
            }
            <span className="mr-1">
              تومان
            </span>
          </div>

          <div className="mb-1 sm:mb-3">
            مجموع
            <span className="text-red-500 mx-1">:</span>
            {
              product.which === 'major' && product.number >= product.quantity ?
                <>
                  {convertToFarsiNumbers(formatPrice(product.number * product.price * (1 - product.majorOffPercentage / 100)).toString())}
                </>
                :
                product.which === 'festival' ?
                  <>
                    {convertToFarsiNumbers(formatPrice(product.number * product.price * (1 - product.festivalOffPercentage / 100)).toString())}
                  </>
                  :
                  <>
                    {convertToFarsiNumbers(formatPrice(product.number * product.price).toString())}
                  </>
            }
            {" "}
            تومان
          </div>

          <div>
            <div className="border border-gray-400 rounded-lg w-auto inline-block">
              <Button
                className="hover:bg-white active:bg-white rounded-lg w-auto"
                sx={{ color: red[400] }}
                onClick={() => addProduct(product._id)}
              >
                <AddIcon />
              </Button>
              <span className="text-red-500">
                {farsiNumCharacter(product.number)}
              </span>
              <Button
                className="hover:bg-white active:bg-white rounded-lg w-auto"
                sx={{ color: red[400] }}
                onClick={() => removeProduct(product._id)}
              >
                {product.number === 1 ? (
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
  )
}

export default function ShoppingCard({ step }) {
  const dispatch = useDispatch();
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
                        : products.map((product) => <ProductComponent key={product._id} product={product} addProduct={addProduct} removeProduct={removeProduct} />)}
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
