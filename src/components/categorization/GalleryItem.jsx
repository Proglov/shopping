"use client";

import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

export default function GalleryItem({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

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
          <>
            <Image
              src={images[currentImage]}
              alt="gallery"
              width={280}
              height={100}
              className="h-60 w-72 md:h-[350px] md:w-[550px]"
            />
            <IconButton
              className="absolute bottom-1/2 -left-3 rounded-lg"
              onClick={prevImage}
              color="error"
            >
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            <IconButton
              className="absolute bottom-1/2 -right-3 rounded-lg"
              onClick={nextImage}
              color="error"
            >
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Box className="text-center mt-5 flex flex-row-reverse" component="div">
        {images.length == 0
          ? ""
          : images.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`cursor-pointer h-4 w-4 mx-1 rounded-full inline-block hover:bg-violet-300 ${
                    currentImage === index ? "bg-slate-400" : "bg-violet-200"
                  }`}
                  onClick={() => {
                    setCurrentImage(index);
                  }}
                ></span>
              );
            })}
      </Box>
    </Box>
  );
}
