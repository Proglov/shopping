import { Box } from "@mui/material";
import CardItem from "./CardItem";

export default function Products() {
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
      off: 0,
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
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },{
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },{
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },{
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },{
      name: "خر1ما",
      price: "5456245",
      off: 0,
      src: "/img/home/category-labaniat.jpg",
    },{
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },{
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
  ];
  return (
    <>
      <Box className="flex mt-6 flex-wrap justify-around">
        {products.map((item, itemIndex) => {
          return <CardItem product={item} key={itemIndex} />;
        })}
      </Box>
    </>
  );
}
