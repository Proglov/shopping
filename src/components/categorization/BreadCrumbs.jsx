"use client";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import CategoryApi from "@/services/withoutAuthActivities/categories";
import SubCategoryApi from "@/services/withoutAuthActivities/subcategories";
import ProductApi from "@/services/withoutAuthActivities/product";


export default function Breadcrumbs() {

  const [isLoading, setIsLoading] = useState(true)

  const [categoryObj, setCategoryObj] = useState({
    name: '',
    link: ''
  })
  const [subcategoryObj, setSubcategoryObj] = useState({
    name: '',
    link: ''
  })
  const [productName, setProductName] = useState('')

  const pathname = usePathname();
  const { getOneCategory } = CategoryApi;
  const { getOneSubcategory } = SubCategoryApi;
  const { getOneProduct } = ProductApi;

  const BreadcrumbsArray = pathname.split('/')
  BreadcrumbsArray.splice(0, 2)

  useEffect(() => {
    const f = async () => {
      try {
        setIsLoading(true)
        const response = await getOneCategory({ id: BreadcrumbsArray[0] });
        setCategoryObj({
          name: response?.category?.name,
          link: BreadcrumbsArray[0]
        });
        if (BreadcrumbsArray.length > 1) {
          const response2 = await getOneSubcategory({ id: BreadcrumbsArray[1] });
          setSubcategoryObj({
            name: response2.subcategory.name,
            link: BreadcrumbsArray[1]
          })
          if (BreadcrumbsArray.length > 2) {
            const response3 = await getOneProduct({ id: BreadcrumbsArray[2] });
            setProductName(response3?.product?.name)
          }
        }
      }
      catch (err) {
        console.log(err);
        return {
          name: '',
          link: ''
        }
      } finally {
        setIsLoading(false)
      }
    }
    f()
    return () => {
      setCategoryObj({
        name: '',
        link: ''
      })
      setSubcategoryObj({
        name: '',
        link: ''
      })
      setProductName('')
    }
  }, [pathname])

  return (
    <div className="my-5 mr-5">
      {
        !isLoading &&
        <MuiBreadcrumbs
          separator={
            <span className="text-red-500">/</span>
          }
          aria-label="breadcrumb"
        >
          <Link href="/" className="text-base hover:underline text-gray-400">
            خانه
          </Link>
          <Link
            href="/#categorization"
            className="text-base hover:underline text-gray-400"
          >
            دسته بندی
          </Link>
          {
            subcategoryObj.link != '' ?
              categoryObj.link &&
              <Link href={`/categories/${categoryObj.link}`} className="text-base hover:underline text-gray-400">
                {categoryObj.name}
              </Link>
              :
              categoryObj.link &&
              <Typography className="text-black text-lg">{categoryObj.name}</Typography>
          }
          {
            productName != '' ?
              subcategoryObj.link &&
              <Link href={`/categories/${categoryObj.link}/${subcategoryObj.link}`} className="text-base hover:underline text-gray-400">
                {subcategoryObj.name}
              </Link>
              :
              subcategoryObj.link &&
              <Typography className="text-black text-lg">{subcategoryObj.name}</Typography>
          }
          {
            productName != '' &&
            <Typography className="text-black text-lg">{productName}</Typography>
          }
        </MuiBreadcrumbs>
      }

    </div>
  );
}