"use client";

import { Box } from "@mui/material";
import CardItem from "./CardItem";
import CardItemSM from "./CardItemSM";
import { useAppSelector } from "@/store/Hook";

export default function Products() {
  const products = useAppSelector((state) => state.products);

  return (
    <>
      <Box className="mt-6">
        <Box className="hidden sm:flex sm:flex-wrap sm:justify-around">
          {products?.map((item, itemIndex) => {
            return <CardItem product={item} key={itemIndex} />;
          })}
        </Box>
        <Box className="sm:hidden">
          {products?.map((item, itemIndex) => {
            return <CardItemSM product={item} key={itemIndex} />;
          })}
        </Box>
      </Box>
    </>
  );
}
