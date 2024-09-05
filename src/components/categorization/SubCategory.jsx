"use client";
import { Box, Button } from "@mui/material";
import CardItem from "./CardItem";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useKeenSlider } from 'keen-slider/react'
import { useSelector } from "react-redux";
import 'keen-slider/keen-slider.min.css'
import '@/styles/Swiper.css'
import { GradientCircularProgress } from "@/app/loading";
import SliderWrapper from "../SliderWrapper";


const Plate = ({ children, classNameProp, subcategoryName, subcategoryId, id }) =>
  <Box
    className={`${classNameProp} rounded-xl mt-5 mb-10 min-h-[100px] bg-orange-400 shadow-lg shadow-gray-300 max-w-5xl mx-auto`}
  >

    <Box
      component="div"
      className="min-h-12  p-5 items-center"
    >
      <span className="flex-1 text-right text-gray-950 text-bold text-xl">
        {subcategoryName}
      </span>
      <Link href={`/categories/${id}/${subcategoryId}`}>
        <Button
          variant="outlined"
          className="float-left"
          color="info"
        >
          مشاهده بیشتر
        </Button>
      </Link>
    </Box>

    {children}
  </Box>



const Slider = ({ item, cartProducts, id }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
      loop: true,
      breakpoints: {
        "(min-width: 0px)": {
          slides: { perView: "auto", spacing: '-22' },
        },
        "(min-width: 640px)": {
          slides: { perView: "auto", spacing: '-37' },
        },
      },
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  const getComponentProps = (product) => ({
    product,
    subID: product?.subcategoryId
  });

  const extraProps = {
    id,
    cartProducts,
  }

  const plateExtraProps = {
    subcategoryName: item?.products[0]?.subcategoryName,
    id,
    subcategoryId: item?.products[0]?.subcategoryId,
  }

  const breakPoints = {
    xs: item?.products.length >= 3,
    sm: item?.products.length >= 3,
    md: item?.products.length >= 5,
    lg: item?.products.length >= 6
  }

  return (
    <SliderWrapper Component={CardItem} breakPoints={breakPoints} array={item?.products} componentProps={getComponentProps} extraProps={extraProps} currentSlide={currentSlide} instanceRef={instanceRef} loaded={loaded} sliderRef={sliderRef} Plate={Plate} plateExtraProps={plateExtraProps} />
  )
}

export default function SubCategory({ id }) {
  const [subcategories, setSubcategories] = useState([]);
  const { getAllProductsOfACategory } = ProductApi;
  const cartProducts = useSelector((state) => state.CartProducts);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true)
      try {
        const response = await getAllProductsOfACategory({ id, page: 1, perPage: 10 });
        setSubcategories(response?.products.sort((a, b) => a._id.localeCompare(b._id)));
      } catch (error) { } finally { setIsLoading(false) }
    };
    getProduct();
  }, [setSubcategories, getAllProductsOfACategory, id]);


  return (
    <Box className="mt-6">
      {
        isLoading ?
          <div className="flex justify-center">
            <GradientCircularProgress />
          </div>
          :
          <>
            {subcategories.map((item) =>
              <Slider item={item} key={item?._id} cartProducts={cartProducts} id={id} />
            )}
          </>
      }
    </Box>
  );
}