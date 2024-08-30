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
  const { getAllProductsOfASubcategory } = ProductApi;
  const [products, setProducts] = useState([]);
  const cartProducts = useSelector((state) => state.CartProducts);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getAllProductsOfASubcategory({ id: subId });
        setProducts(response?.products);
      } catch (error) { }
    };
    getProduct();
  }, [getAllProductsOfASubcategory, id]);

  return (
    <>
      <Box className="mt-6">
        <Box className="hidden sm:flex sm:flex-wrap sm:justify-evenly">
          {products?.map(item => <CardItem product={item} key={item._id} subID={subId} id={id} cartProducts={cartProducts} />)}
        </Box>

        <Box className="sm:hidden">
          {products?.map(item => <CardItemSM product={item} key={item._id} subID={subId} id={id} cartProducts={cartProducts} />)}
        </Box>
      </Box>
    </>
  );
}
