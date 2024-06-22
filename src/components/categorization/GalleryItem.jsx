"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function GalleryItem({ images }) {
  return (
    <Box className="m-5 flex justify-center flex-col items-center">
      <Box className="border-2 border-gray-200 p-5 w-fit bg-gray-100 rounded relative">
        {images.length == 0 ? (
          <Box
            className="min-h-[240px] min-w-[288px] md:min-h-[350px] md:min-w-[550px] text-lg flex items-center justify-center"
            component="div"
          >
            <span>بدون تصویر</span>
          </Box>
        ) : (
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="min-h-[240px] min-w-[288px] md:min-h-[350px] md:min-w-[550px]"
          >
            {/* {images.map((item, index) => {
              <SwiperSlide key={index}>
                <Image
                  src={item}
                  alt="gallery"
                  width={280}
                  height={100}
                  className="h-60 w-72 md:h-[350px] md:w-[550px]"
                />
              </SwiperSlide>;
            })} */}
          </Swiper>
        )}
      </Box>
    </Box>
  );
}
