"use client";
import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "@mui/material";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function GalleryItem({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <>
      {
        images.length !== 0 ?
          <>
            <div className="navigation-wrapper flex justify-center mx-auto max-w-sm">

              {loaded && instanceRef.current && (
                <Button className="min-w-0"
                  onClick={(e) => e.stopPropagation() || instanceRef.current?.next()} disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                >
                  <FaArrowRight />
                </Button>
              )}

              <div ref={sliderRef} className="keen-slider w-full h-[50vw] max-h-[215px]">
                {
                  images.map((item, indx) => {
                    return (
                      <div className="keen-slider__slide relative" key={indx}>
                        <Image
                          src={item}
                          alt="gallery"
                          width={280}
                          height={100}
                          className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
                        />
                      </div>
                    )
                  })
                }
              </div>

              {loaded && instanceRef.current && (
                <Button className="min-w-0"
                  onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0}
                >
                  <FaArrowLeft />
                </Button>
              )}

            </div>

            {loaded && instanceRef.current && (
              <div className="dots flex p-2 justify-center">
                {[
                  ...Array(instanceRef.current.track.details.slides.length).keys(),
                ].reverse().map((idx) => {
                  return (
                    <Button
                      key={idx}
                      variant="contained"
                      color={`${currentSlide === idx ? 'error' : 'secondary'}`}
                      onClick={() => { instanceRef.current?.moveToIdx(idx) }}
                      className={"min-w-0 w-5 h-2 rounded-full mx-1 p-1 py-1.5"}
                    ></Button>
                  )
                })}
              </div>
            )}
          </>
          :
          <div className="h-60 w-72 md:h-[300px] md:w-[350px] max-h-96 mx-auto flex items-center justify-center shadow-md md:text-2xl text-2xl"
            style={{
              border: '1px solid black',
              borderTopRightRadius: '20%',
              borderBottomLeftRadius: '20%'
            }}
          >
            بدون تصویر
          </div>
      }
    </>
  );
}