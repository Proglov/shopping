'use client'
import { Box } from "@mui/material";
import CardItem from "./CardItem";
import CardItemSM from "./CardItemSM";
import { usePathname } from "next/navigation";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { GradientCircularProgress } from "@/app/loading";

export default function Products() {
  const { getAllProductsOfASubcategory } = ProductApi;
  const { ref, inView } = useInView();
  const cartProducts = useSelector((state) => state.CartProducts);
  const router = usePathname();
  const id = router.split("/")[2];
  const subId = router.split("/")[3];
  const perPage = 30;

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await getAllProductsOfASubcategory({ id: subId, page, perPage });
      setProducts((prev) => [...prev, ...response?.products]);
      if (!response?.products?.length) setIsFinished(true);
      setCurrentPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted)
      fetchProducts(1);

    return () => {
      isMounted = false
    }
  }, []);

  useEffect(() => {
    if (inView && !isFinished) {
      fetchProducts(currentPage);
    }
  }, [inView, currentPage, isFinished]);

  return (
    <Box className="mt-6">
      <Box className="hidden sm:flex sm:flex-wrap sm:justify-evenly">
        {products?.map((item) => (
          <CardItem product={item} key={item._id} subID={subId} id={id} cartProducts={cartProducts} />
        ))}
      </Box>

      <Box className="sm:hidden">
        {products?.map((item) => (
          <CardItemSM product={item} key={item._id} subID={subId} id={id} cartProducts={cartProducts} />
        ))}
      </Box>

      <Box className='w-full text-center mt-3' ref={ref}>
        {!isFinished && <GradientCircularProgress />}
      </Box>
    </Box>
  );
}
