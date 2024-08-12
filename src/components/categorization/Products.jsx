"use client";
import { Box } from "@mui/material";
import CardItem from "./CardItem";
import CardItemSM from "./CardItemSM";
import { usePathname } from "next/navigation";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Products() {
  const router = usePathname();
  const id = router.split("/")[2];
  const subId = router.split("/")[3];
  const { getAllProductsOfACategory } = ProductApi;
  const [products, setProducts] = useState([]);
  const cartProducts = useSelector((state) => state.CartProducts);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getAllProductsOfACategory({ id });
        const filteredProducts = response?.products?.filter(product => product.subcategoryId === subId)
        setProducts(filteredProducts);
      } catch (error) { }
    };
    getProduct();
  }, [getAllProductsOfACategory, id]);

  return (
    <>
      <Box className="mt-6">
        <Box className="hidden sm:flex sm:flex-wrap sm:justify-around gap-8">
          {products?.map((item, itemIndex) => <CardItem product={item} key={itemIndex} subID={subId} id={id} cartProducts={cartProducts} />)}
        </Box>

        <Box className="sm:hidden">
          {products?.map((item, itemIndex) => <CardItemSM product={item} key={itemIndex} subID={subId} id={id} cartProducts={cartProducts} />)}
        </Box>
      </Box>
    </>
  );
}
