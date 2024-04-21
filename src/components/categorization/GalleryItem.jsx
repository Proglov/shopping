"use client";

import { Box, Button } from "@mui/material";
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
    <Box className="m-5 flex justify-center">
      <Box className="border-2 border-gray-200 p-5 w-fit bg-gray-100 rounded relative ">
        <Image
          src={images[currentImage]}
          alt="gallery"
          width={500}
          height={300}
        />
        <Button
          className="absolute bottom-1/2 -left-3"
          onClick={prevImage}
          color="error"
        >
          <ArrowBackIosOutlinedIcon />
        </Button>
        <Button
          className="absolute bottom-1/2 -right-3"
          onClick={nextImage}
          color="error"
        >
          <ArrowForwardIosOutlinedIcon />
        </Button>
      </Box>
    </Box>
  );
}
