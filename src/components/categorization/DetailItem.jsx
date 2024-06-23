"use client";

import {
  AddCart,
  DecrementCart,
  IncrementCart,
} from "@/features/CartProducts/CartProductsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Hook";
import { convertToFarsiNumbers, formatPrice } from "@/utils/funcs";
import { Box, Button, Card } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";

export default function DetailItem({ detail }) {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.CartProducts);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const item = cartProducts.filter((item) => item.code === detail._id)[0];
    setNumber(item?.number?.toString());
  }, [setNumber, cartProducts, detail._id]);

  return (
    <>
      <Card className="mt-11 mb-10 p-5 sm:grid sm:grid-cols-7 h-fit">
        <Box className="grid grid-rows-2 col-span-3">
          <Box className="sm:text-lg mb-5 text-sm">
            نام محصول: {detail.name}
          </Box>
          <Box className="sm:text-lg text-sm mb-3 sm:mb-0">
            دسته بندی: {detail.subcategoryId.categoryId.name} ،{" "}
            {detail.subcategoryId.name}
          </Box>
        </Box>
        <Box className="grid grid-rows-2 col-span-3">
          <Box className="grid grid-cols-4 sm:w-1/2">
            <Box className="sm:text-lg text-sm mb-5 col-span-3">
              قیمت:{" "}
              {convertToFarsiNumbers(formatPrice(detail.price.toString()))}{" "}
              تومان
            </Box>
          </Box>
        </Box>
        <Box className="sm:my-auto flex justify-center">
          {cartProducts.find((item) => item.code === detail._id) ? (
            <div className="border border-gray-400 rounded-lg w-auto inline-block">
              <Button
                className="hover:bg-white active:bg-white rounded-lg w-auto"
                sx={{ color: red[400] }}
                onClick={() => dispatch(IncrementCart(detail._id))}
              >
                <AddIcon />
              </Button>
              <span className="text-red-500">
                {convertToFarsiNumbers(number)}
              </span>
              <Button
                className="hover:bg-white active:bg-white rounded-lg w-auto"
                sx={{ color: red[400] }}
                onClick={() => dispatch(DecrementCart(detail._id))}
              >
                {number == 1 ? (
                  <DeleteOutlineOutlinedIcon />
                ) : (
                  <RemoveOutlinedIcon />
                )}
              </Button>
            </div>
          ) : (
            <Button
              variant="outlined"
              className="bg-green-500 border-green-600 hover:border-green-700 hover:bg-green-600 text-white font-medium float-left rounded-lg"
              onClick={() => {
                dispatch(
                  AddCart({
                    name: detail.name,
                    number: 1,
                    src: detail.imagesUrl,
                    price: detail.price,
                    off: detail?.off,
                    code: detail._id,
                  })
                );
              }}
            >
              خرید محصول
            </Button>
          )}
        </Box>
        <div
          className="sm:text-lg text-sm col-span-7 mt-3 sm:mt-0"
          dangerouslySetInnerHTML={{
            __html: `توضیحات محصول: ${detail.desc}`,
          }}
        ></div>
      </Card>
    </>
  );
}
