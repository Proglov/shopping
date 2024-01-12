"use client";

import Step from "@/components/Shopping card/Step";
import FooterMenu from "@/components/home/FooterMenu";
import NavBar from "@/components/home/NavBar";
import AddressCard from "@/components/Shopping card/AddressCard";
import ShoppingCard from "@/components/Shopping card/ShoppingCard";
import ShippingTime from "@/components/Shopping card/ShippingTime";
import { useState } from "react";

export default function Card() {
  const [Time, setTime] = useState({
    day: 0, // today = 0 , tomorrow = 1
    time: [0, 0], // [start,end]
    price: "0",
    select: false,
  });

  return (
    <>
      <NavBar />
      <Step active={0} />
      <AddressCard />
      <ShippingTime setTime={setTime} Time={Time} />
      <ShoppingCard Time={Time} />
      <FooterMenu active={2} />
    </>
  );
}
