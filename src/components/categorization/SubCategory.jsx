"use client";

import { Box, Button } from "@mui/material";
import CardItem from "./CardItem";
import { usePathname } from "next/navigation";
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
  const { getAllProductsOfACategory } = ProductApi;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getAllProductsOfACategory({ id: id });
        const groupedProducts = response.products.reduce((acc, product) => {
          const { subcategoryId, subcategoryName, ...rest } = product;

          const existingSubcategory = acc.find(
            (item) => item.subcategoryId === subcategoryId
          );

          if (existingSubcategory) {
            existingSubcategory.products.push(rest);
          } else {
            acc.push({
              subcategoryName,
              subcategoryId,
              products: [rest],
            });
          }

          return acc;
        }, []);
        setProducts(groupedProducts);
      } catch (error) { }
    };
    getProduct();
  }, [setProducts, getAllProductsOfACategory, id]);

  return (
    <>
      <Box className="mt-6">
        {products.map((item, index) => {
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
                  {item?.subcategoryName}
                </span>
                <Link href={`/categories/${id}/${item.subcategoryId}`}>
                  <Button
                    variant="outlined"
                    className="float-left text-gray-950 text-bold text-base"
                    color="info"
                  >
                    مشاهده بیشتر
                  </Button>
                </Link>
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
                {item?.products.map((product, itemIndex) => {
                  return (
                    <SwiperSlide key={itemIndex} className="p-5">
                      <CardItem product={product} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
