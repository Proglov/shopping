"use client";
import { Box, Button } from "@mui/material";
import CardItem from "./CardItem";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useKeenSlider } from 'keen-slider/react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import 'keen-slider/keen-slider.min.css'
import '@/styles/Swiper.css'



function Arrow(props) {
  return (
    <Button
      sx={{ zIndex: 1000 }}
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"}`}
    >
      {!!props.left && (
        <MdOutlineKeyboardArrowLeft className='text-6xl text-blue-500' />
      )}
      {!!props.right && (
        <MdOutlineKeyboardArrowRight className='text-6xl text-blue-500' />
      )}
    </Button>
  )
}

const Slider = ({ item, cartProducts, id }) => {
  const [_currentSlider, setCurrentSlide] = useState(0)
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

      <div className="navigation-wrapper">
        {loaded && instanceRef.current && (
          <Arrow
            right={true}
            onClick={(e) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          />
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
          <Arrow
            left={true}
            onClick={(e) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
          />
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