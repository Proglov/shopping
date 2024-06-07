"use client";

import { Box, Card } from "@mui/material";
import CardItem from "./CardItem";
import CardItemSM from "./CardItemSM";
import { useAppSelector } from "@/store/Hook";
import { usePathname } from "next/navigation";
import SubCategoryApi from "@/services/withoutAuthActivities/subcategories";
import { useEffect, useState } from "react";

export default function Products() {
  const products = useAppSelector((state) => state.Products.products);
  const router = usePathname();
  const id = router.split("/")[2];
  const { getAllSubcategories } = SubCategoryApi;
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const getSubcategory = async () => {
      try {
        const response = await getAllSubcategories();
        const obj = response.subcategories.filter(
          (item) => item.categoryId._id === id
        );
        setSubCategory(obj);
      } catch (error) {}
    };
    getSubcategory();
  }, [getAllSubcategories, setSubCategory]);

  return (
    <>
      <Box className="mt-6">
        {subCategory.map((item, index) => {
          return (
            <Card
              className="rounded-xl mt-5 mb-10 min-h-[100px]"
              key={index}
            >
              <Box component="div" className="min-h-12 border-b-2 p-5">
                <span className="flex-1 text-right text-gray-950 text-bold text-xl">
                  {item?.name}
                </span>
              </Box>
              {/* <Box className="hidden sm:flex sm:flex-wrap sm:justify-around">
                {products?.map((item, itemIndex) => {
                  return <CardItem product={item} key={itemIndex} />;
                })}
              </Box>
              <Box className="sm:hidden">
                {products?.map((item, itemIndex) => {
                  return <CardItemSM product={item} key={itemIndex} />;
                })}
              </Box> */}
            </Card>
          );
        })}
      </Box>
    </>
  );
}
