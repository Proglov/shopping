"use client";
import { Box, Button } from "@mui/material";
import CardItem from "./CardItem";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const CustomBtn = ({ onClick, Icon, length }) => (
  <>
    {
      length > 2 &&
      <Button
        className="md:block lg:hidden hidden h-5 place-self-center rounded-2xl"
        onClick={onClick}
      >
        {Icon}
      </Button>
    }
    {
      length > 4 &&
      <Button
        className="lg:block hidden h-5 place-self-center rounded-2xl"
        onClick={onClick}
      >
        {Icon}
      </Button>
    }
  </>
)

const Slider = ({ item, cartProducts, id }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: "auto", spacing: '-22' },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })


  return (
    <Box
      className="rounded-xl mt-5 mb-10 min-h-[100px] shadow-lg shadow-gray-300 max-w-5xl mx-auto"
    >
      <Box
        component="div"
        className="min-h-12 border-b-2 border-gray-200 p-5 items-center"
      >
        <span className="flex-1 text-right text-gray-950 text-bold text-xl">
          {item?.subcategoryName}
        </span>
        <Link href={`/categories/${id}/${item.subcategoryId}`}>
          <Button
            variant="outlined"
            className="float-left"
            color="info"
          >
            مشاهده بیشتر
          </Button>
        </Link>
      </Box>
      <div className="navigation-wrapper flex justify-center sm:mx-2 mx-auto ">
        {loaded && instanceRef.current && (
          <CustomBtn onClick={(e) => e.stopPropagation() || instanceRef.current?.next()} Icon={<FaArrowRight className="mx-auto" />} length={instanceRef.current.track.details.slides.length - 1} />
        )}
        <div ref={sliderRef} className="keen-slider">
          {item?.products.map((product, i) => {
            return (
              <div className="keen-slider__slide sm:min-w-60 min-w-52 mt-2" key={i}>
                <CardItem product={product} subID={item.subcategoryId} id={id} cartProducts={cartProducts} />
              </div>
            );
          })}
        </div>
        {loaded && instanceRef.current && (
          <CustomBtn onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()} Icon={<FaArrowLeft className="mx-auto" />} length={instanceRef.current.track.details.slides.length - 1} />
        )}
      </div>
    </Box>
  )
}

export default function SubCategory({ id }) {
  const [subcategories, setSubcategories] = useState([]);
  const { getAllProductsOfACategory } = ProductApi;
  const cartProducts = useSelector((state) => state.CartProducts);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getAllProductsOfACategory({ id });

        //differentiate products based on the subcategories
        const groupedProducts = response.products.reduce((acc, product) => {
          const { subcategoryId, subcategoryName, ...rest } = product;

          const existingSubcategory = acc.find((item) => item.subcategoryId === subcategoryId);

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

        setSubcategories(groupedProducts);
      } catch (error) { }
    };
    getProduct();
  }, [setSubcategories, getAllProductsOfACategory, id]);


  return (
    <Box className="mt-6">
      {subcategories.map((item, index) =>
        <Slider item={item} key={index} cartProducts={cartProducts} id={id} />
      )}
    </Box>
  );
}