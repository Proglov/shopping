"use client";

import { createContext, useContext, useState } from "react";

export const GroupingContext = createContext();
export const SetGroupingContext = createContext();

export function useGrouping() {
  return useContext(GroupingContext);
}

export function useSetGrouping() {
  return useContext(SetGroupingContext);
}

export const GroupingProvider = ({ children }) => {
  const [grouping, setGrouping] = useState([
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
  ]);
  return (
    <GroupingContext.Provider value={grouping}>
      <SetGroupingContext.Provider value={setGrouping}>
        {children}
      </SetGroupingContext.Provider>
    </GroupingContext.Provider>
  );
};
