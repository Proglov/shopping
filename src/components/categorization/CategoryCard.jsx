"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import CardItem from "./CardItem";
import CategoryComponent from "@/components/home/CategoryComponent";
import { GroupingContext, useGrouping } from "@/context/GroupingContext";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function CategoryCard() {
  const [next, setNext] = useState({});

  const grouping = useGrouping();
  // const grouping = useContext(GroupingContext);

  const products = [
    {
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "هویج",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
  ];

  const color = [
    "bg-gradient-to-l from-purple-100 to-pink-300",
    "bg-gradient-to-l from-sky-100 to-indigo-300",
    "bg-gradient-to-l from-violet-100 to-fuchsia-300",
    "bg-gradient-to-l from-orange-100 to-red-300",
    "bg-gradient-to-l from-rose-100 to-pink-300",
    "bg-gradient-to-l from-amber-100 to-yellow-200",
  ];

  const handlePrevSlide = (index) => {
    setNext({ ...next, [index]: false });
  };

  const handleNextSlide = (index) => {
    setNext({ ...next, [index]: true });
  };

  return (
    <>
      {/* xl */}
      {grouping.map((group, groupIndex) => {
        const flag = next[groupIndex];
        return (
          <React.Fragment key={groupIndex}>
            <Card
              className={`xl:block hidden mb-4 border-2 border-stone-300 relative overflow-hidden ${color[groupIndex % color.length]
                }`}
            >
              <Link href={`/categories/${group.href}`}>
                <CardHeader
                  title={group.name}
                  className="border-b-2 border-b-stone-300 text-center"
                />
              </Link>
              <CardContent
                className={`flex ${flag ? "translate-x-85/100 duration-1000" : "duration-1000"
                  }`}
              >
                {products.map((item, itemIndex) => {
                  if (itemIndex > 8) {
                    return;
                  }
                  return <CardItem product={item} key={itemIndex} />;
                })}
                <Box
                  component="div"
                  className="min-w-fit h-5  text-indigo-300 mx-2"
                  style={{ transform: "translateY(130px)" }}
                >
                  <Link href={`/categories/${group.href}`}>
                    <Button className="text-lg text-slate-900">
                      نمایش بیشتر
                    </Button>
                  </Link>
                </Box>
              </CardContent>
              <Box>
                <Button
                  onClick={() => handlePrevSlide(groupIndex)}
                  className="hover:bg-inherit text-transparent absolute top-1/2"
                >
                  <GrFormNext
                    className="text-white bg-green-400 hover:bg-green-500 rounded-full"
                    style={{ fontSize: "40px" }}
                  />
                </Button>
                <Button
                  onClick={() => handleNextSlide(groupIndex)}
                  className="hover:bg-inherit text-transparent absolute top-1/2 left-3"
                >
                  <GrFormPrevious
                    className="text-white bg-green-400 hover:bg-green-500 rounded-full"
                    style={{ fontSize: "40px" }}
                  />
                </Button>
              </Box>
            </Card>
          </React.Fragment>
        );
      })}

      {/* lg */}
      {grouping.map((group, groupIndex) => {
        const flag = next[groupIndex];
        return (
          <React.Fragment key={groupIndex}>
            <Card
              className={`xl:hidden lg:block hidden mb-4 border-2 border-stone-300 relative overflow-hidden ${color[groupIndex % color.length]
                }`}
            >
              <Link href={`/categories/${group.href}`}>
                <CardHeader
                  title={group.name}
                  className="border-b-2 border-b-stone-300 text-center"
                />
              </Link>
              <CardContent
                className={`flex ${flag ? "translate-x-85/100 duration-1000" : "duration-1000"
                  }`}
              >
                {products.map((item, itemIndex) => {
                  if (itemIndex > 6) {
                    return;
                  }
                  return <CardItem product={item} key={itemIndex} />;
                })}
                <Box
                  component="div"
                  className="min-w-fit h-5  text-indigo-300 mx-2"
                  style={{ transform: "translateY(130px)" }}
                >
                  <Link href={`/categories/${group.href}`}>
                    <Button className="text-lg text-slate-900">
                      نمایش بیشتر
                    </Button>
                  </Link>
                </Box>
              </CardContent>
              <Box>
                <Button
                  onClick={() => handlePrevSlide(groupIndex)}
                  className="hover:bg-inherit text-transparent absolute top-1/2"
                >
                  <GrFormNext
                    className="text-white bg-green-400 hover:bg-green-500 rounded-full"
                    style={{ fontSize: "40px" }}
                  />
                </Button>
                <Button
                  onClick={() => handleNextSlide(groupIndex)}
                  className="hover:bg-inherit text-transparent absolute top-1/2 left-3"
                >
                  <GrFormPrevious
                    className="text-white bg-green-400 hover:bg-green-500 rounded-full"
                    style={{ fontSize: "40px" }}
                  />
                </Button>
              </Box>
            </Card>
          </React.Fragment>
        );
      })}

      {/* md */}
      {grouping.map((group, groupIndex) => {
        const flag = next[groupIndex];
        return (
          <React.Fragment key={groupIndex}>
            <Card
              className={`xl:hidden lg:hidden md:block hidden mb-4 border-2 border-stone-300 relative overflow-hidden ${color[groupIndex % color.length]
                }`}
            >
              <Link href={`/categories/${group.href}`}>
                <CardHeader
                  title={group.name}
                  className="border-b-2 border-b-stone-300 text-center"
                />
              </Link>
              <CardContent
                className={`flex ${flag ? "translate-x-85/100 duration-1000" : "duration-1000"
                  }`}
              >
                {products.map((item, itemIndex) => {
                  if (itemIndex > 4) {
                    return;
                  }
                  return <CardItem product={item} key={itemIndex} />;
                })}
                <Box
                  component="div"
                  className="min-w-fit h-5  text-indigo-300 mx-2"
                  style={{ transform: "translateY(130px)" }}
                >
                  <Link href={`/categories/${group.href}`}>
                    <Button className="text-lg text-slate-900">
                      نمایش بیشتر
                    </Button>
                  </Link>
                </Box>
              </CardContent>
              <Box>
                <Button
                  onClick={() => handlePrevSlide(groupIndex)}
                  className="hover:bg-inherit text-transparent absolute top-1/2"
                >
                  <GrFormNext
                    className="text-white bg-green-400 hover:bg-green-500 rounded-full"
                    style={{ fontSize: "40px" }}
                  />
                </Button>
                <Button
                  onClick={() => handleNextSlide(groupIndex)}
                  className="hover:bg-inherit text-transparent absolute top-1/2 left-3"
                >
                  <GrFormPrevious
                    className="text-white bg-green-400 hover:bg-green-500 rounded-full"
                    style={{ fontSize: "40px" }}
                  />
                </Button>
              </Box>
            </Card>
          </React.Fragment>
        );
      })}

      {/* sm */}
      <Grid container gap={3} justifyContent="center" className="md:hidden ">
        {grouping.map((item, index) => (
          <Grid item xs={3} lg={2} key={index}>
            <CategoryComponent
              href={item.href}
              caption={item.name}
              src={item.src}
              charachtersLengthLevel={0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
