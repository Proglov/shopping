import { Box } from "@mui/material";
import CardItem from "./CardItem";
import CardItemSM from "./CardItemSM";

export default function Products() {
  const products = [
    {
      code: 159,
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 189,
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 859,
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 899,
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 39,
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 1595,
      name: "هویج",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 1059,
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 1659,
      name: "خرما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 8759,
      name: "خرما",
      price: "5456245",
      off: 0,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 123,
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 200,
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 3459,
      name: "خرما",
      price: "5456245",
      off: 50,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 15989,
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 15978655,
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 18654,
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 159462,
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 1594568,
      name: "خر1ما",
      price: "5456245",
      off: 0,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 15947985,
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
    {
      code: 159146,
      name: "خر1ما",
      price: "5456245",
      off: 40,
      src: "/img/home/category-labaniat.jpg",
    },
  ];
  return (
    <>
      <Box className="mt-6">
        <Box className="hidden sm:flex sm:flex-wrap sm:justify-around">
          {products.map((item, itemIndex) => {
            return <CardItem product={item} key={itemIndex} />;
          })}
        </Box>
        <Box className="sm:hidden">
          {products.map((item, itemIndex) => {
            return <CardItemSM product={item} key={itemIndex} />;
          })}
        </Box>
      </Box>
    </>
  );
}
