"use client";

import { Box, Button } from "@mui/material";
import CardItem from "./CardItem";
import { usePathname } from "next/navigation";
import SubCategoryApi from "@/services/withoutAuthActivities/subcategories";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const swiperBreaks = {
  200: {
    slidesPerView: 1,
    width: 240,
  },
  400: {
    slidesPerView: 1,
    width: 240,
  },
  500: {
    slidesPerView: 1,
    width: 240,
  },
  540: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  598: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  600: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  700: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  750: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  800: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  900: {
    slidesPerView: 3,
    spaceBetween: 0,
  },
  1000: {
    slidesPerView: 3,
    spaceBetween: 0,
  },
  1050: {
    slidesPerView: 3,
    spaceBetween: 0,
  },
  1100: {
    slidesPerView: 4,
    spaceBetween: 0,
  },
  1200: {
    slidesPerView: 4,
    spaceBetween: 0,
  },
  1250: {
    slidesPerView: 4,
    spaceBetween: 0,
  },
  1400: {
    slidesPerView: 5,
    spaceBetween: 0,
  },
  1800: {
    slidesPerView: 6,
    spaceBetween: 0,
  },
  2000: {
    slidesPerView: 7,
    spaceBetween: 0,
  },
};

export default function SubCategory() {
  const [products, setProducts] = useState([]);
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
        setProducts(response.products);
      } catch (error) {}
    };
    getProduct();
  }, [getAllSubcategories, setSubCategory, getAllProductsOfACategory]);

  return (
    <>
      <Box className="mt-6">
        {subCategory.map((item, index) => {
          return (
            <Box
              className="rounded-xl mt-5 mb-10 min-h-[100px] border-2 border-violet-100 shadow-lg shadow-violet-300"
              key={index}
            >
              <Box
                component="div"
                className="min-h-12 border-b-2 p-5 items-center"
              >
                <span className="flex-1 text-right text-gray-950 text-bold text-xl">
                  {item?.name}
                </span>
                {products?.find(
                  (product) => item._id === product.subcategoryId
                ) ? (
                  <Link href={`/categories/${id}/${item._id}`}>
                    <Button
                      variant="outlined"
                      className="float-left text-gray-950 text-bold text-base"
                      color="info"
                    >
                      مشاهده بیشتر
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
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
                className="w-full rounded-lg"
              >
                {products?.map((product, itemIndex) => {
                  if (item._id === product.subcategoryId) {
                    return (
                      <SwiperSlide key={itemIndex} className="p-5">
                        <CardItem product={product} />
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
