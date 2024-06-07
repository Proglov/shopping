"use client";

import { Box, Card } from "@mui/material";
import CardItem from "./CardItem";
import CardItemSM from "./CardItemSM";
import { useAppSelector } from "@/store/Hook";
import { usePathname } from "next/navigation";
import SubCategoryApi from "@/services/withoutAuthActivities/subcategories";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperBreaks = {
  200: {
    slidesPerView: 3,
    spaceBetween: 170,
  },
  400: {
    slidesPerView: 3,
    spaceBetween: 150,
  },
  500: {
    slidesPerView: 3,
    spaceBetween: 130,
  },
  540: {
    slidesPerView: 3,
    spaceBetween: 100,
  },
  580: {
    slidesPerView: 3,
    spaceBetween: 50,
  },
  598: {
    slidesPerView: 4,
    spaceBetween: 180,
  },
  600: {
    slidesPerView: 4,
    spaceBetween: 190,
  },
  640: {
    slidesPerView: 3,
    spaceBetween: 120,
  },
  700: {
    slidesPerView: 3,
    spaceBetween: 100,
  },
  750: {
    slidesPerView: 3,
    spaceBetween: 50,
  },
  800: {
    slidesPerView: 4,
    spaceBetween: 150,
  },
  900: {
    slidesPerView: 4,
    spaceBetween: 80,
  },
  1000: {
    slidesPerView: 4,
    spaceBetween: 50,
  },
  1050: {
    slidesPerView: 4,
    spaceBetween: 0,
  },
  1100: {
    slidesPerView: 5,
    spaceBetween: 30,
  },
  1200: {
    slidesPerView: 5,
    spaceBetween: 100,
  },
  1250: {
    slidesPerView: 5,
    spaceBetween: 0,
  },
  1400: {
    slidesPerView: 6,
    spaceBetween: 0,
  },
  1800: {
    slidesPerView: 7,
    spaceBetween: 0,
  },
  2000: {
    slidesPerView: 8,
    spaceBetween: 0,
  },
};

export default function Products() {
  // const products = useAppSelector((state) => state.Products.products);
  const router = usePathname();
  const id = router.split("/")[2];
  const { getAllSubcategories } = SubCategoryApi;
  const { getAllProductsOfACategory } = ProductApi;
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

    const getProduct = async () => {
      try {
        const response = await getAllProductsOfACategory({ id: id });
        console.log(response);
      } catch (error) {}
    };
    getProduct();
  }, [getAllSubcategories, setSubCategory, getAllProductsOfACategory]);

  return (
    <>
      <Box className="mt-6">
        {subCategory.map((item, index) => {
          return (
            <Card className="rounded-xl mt-5 mb-10 min-h-[100px]" key={index}>
              <Box component="div" className="min-h-12 border-b-2 p-5">
                <span className="flex-1 text-right text-gray-950 text-bold text-xl">
                  {item?.name}
                </span>
              </Box>
              <Swiper
                dir="rtl"
                modules={[Navigation, Pagination]}
                navigation
                loop
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                lazy="true"
                pagination={{ type: "progressbar" }}
                breakpoints={swiperBreaks}
                className="w-full rounded-lg p-5"
              >
                <SwiperSlide></SwiperSlide>
              </Swiper>
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
