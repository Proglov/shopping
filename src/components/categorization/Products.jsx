'use client'
import { Box } from "@mui/material";
import CardItem from "./CardItem";
import CardItemSM from "./CardItemSM";
import { usePathname } from "next/navigation";
import ProductApi from "@/services/withoutAuthActivities/product";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { GradientCircularProgress } from "@/app/loading";

export default function Products({ which, str }) {
  const { getAllProductsOfASubcategory, searchForProducts } = ProductApi;
  const { ref, inView } = useInView();
  const router = usePathname();
  const id = router.split("/")[2];
  const subId = router.split("/")[3];
  const perPage = 30;

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (page) => {
    const theFunction = () => {
      if (which === 'categorization')
        return getAllProductsOfASubcategory({ id: subId, page, perPage })
      else
        return searchForProducts({ str, page, perPage })
    }

    //if you want to uncomment this, then set the initial value of loading to false
    // if (loading) return; 
    setLoading(true);

    try {
      const response = await theFunction();
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
      {
        !loading && products?.length === 0 ?
          <div>محصولی یافت نشد!</div>
          :
          <>
            <Box className="hidden sm:flex sm:flex-wrap sm:justify-evenly">
              {products?.map((item) => (
                <CardItem product={item} key={item._id} subID={subId} id={id} />
              ))}
            </Box>

            <Box className="sm:hidden">
              {products?.map((item) => (
                <CardItemSM product={item} key={item._id} subID={subId} id={id} />
              ))}
            </Box>

            <Box className='w-full text-center mt-3' ref={ref}>
              {!isFinished && <GradientCircularProgress />}
            </Box>
          </>
      }
    </Box>
  );
}
