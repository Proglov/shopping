import CategoryComponent from "@/components/home/CategoryComponent";
import { Grid } from "@mui/material";
import React from "react";

const categories = [
  {
    name: "لبنیات",
    src: "/img/home/category-labaniat.jpg",
    href: "labaniat",
  },
  {
    name: "تنقلات",
    src: "/img/home/category-labaniat.jpg",
    href: "tanagholat",
  },
  {
    name: "حبوبات",
    src: "/img/home/category-labaniat.jpg",
    href: "hobobat",
  },
  {
    name: "نوشیدنی",
    src: "/img/home/category-labaniat.jpg",
    href: "noshidani",
  },
  {
    name: "کیک و بیسکوویت",
    src: "/img/home/category-labaniat.jpg",
    href: "cake",
  },
  {
    name: "کیک و بیسکوویت",
    src: "/img/home/category-labaniat.jpg",
    href: "cake",
  },
  {
    name: "کیک و بیسکوویت",
    src: "/img/home/category-labaniat.jpg",
    href: "cake",
  },
  {
    name: "کیک و بیسکوویت",
    src: "/img/home/category-labaniat.jpg",
    href: "cake",
  },
  {
    name: "کیک و بیسکوویت",
    src: "/img/home/category-labaniat.jpg",
    href: "cake",
  },
  {
    name: "کیک و بیسکوویت",
    src: "/img/home/category-labaniat.jpg",
    href: "cake",
  },
];

export default function Categories() {
  return (
    <>
      <Grid container gap={3} justifyContent="center">
        {categories.map((item) => (
          <Grid item xs={3} lg={2}>
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
