"use client";

import { Box } from "@mui/material";
import CardItem from "./CardItem";
import CardItemSM from "./CardItemSM";
import { usePathname } from "next/navigation";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";

export default function Products() {
  const router = usePathname();
  const id = router.split("/")[2];
  const subId = router.split("/")[3];
  const { getAllProductsOfACategory } = ProductApi;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getAllProductsOfACategory({ id: id });
        setProducts(response.products);
      } catch (error) {}
    };
    getProduct();
  }, [getAllProductsOfACategory]);

  return (
    <>
      <Box className="mt-6">
        <Box className="hidden sm:flex sm:flex-wrap sm:justify-around">
          {products?.map((item, itemIndex) => {
            if (item.subcategoryId === subId) {
              return <CardItem product={item} key={itemIndex} />;
            }
          })}
        </Box>
        <Box className="sm:hidden">
          {products?.map((item, itemIndex) => {
            if (item.subcategoryId === subId) {
              return <CardItem product={item} key={itemIndex} />;
            }
          })}
        </Box>
      </Box>
    </>
  );
}
