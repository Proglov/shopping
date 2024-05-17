import { createSlice } from "@reduxjs/toolkit";

const initialState = [
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

export const GroupingSlice = createSlice({
  name: "Grouping",
  initialState,
  reducers: {},
});

export default GroupingSlice.reducer;
