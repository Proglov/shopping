"use client";

import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

export default function GalleryItem({ images }) {
  const [currentImage, setCurrentImage] = useState(0);
  // const images = [
  //   "/img/home/category-labaniat.jpg",
  //   "/img/home/category-labaniat.jpg",
  //   "/img/home/category-labaniat.jpg",
  //   "/img/home/category-labaniat.jpg",
  //   "/img/home/category-labaniat.jpg",
  //   "/img/home/category-labaniat.jpg",
  // ];
  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <Box className="m-5 flex justify-center flex-col items-center">
      <Box className="border-2 border-gray-200 p-5 w-fit bg-gray-100 rounded relative">
        <Image
          src={images[currentImage]}
          alt="gallery"
          width={500}
          height={300}
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
      </Box>
      <Box className="text-center mt-5 flex flex-row-reverse" component="div">
        {images.map((item, index) => {
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
