"use client";
import { Grid, Skeleton, Typography } from "@mui/material";
import CategoryComponent from "./CategoryComponent";
import { TbCategory } from "react-icons/tb";
import { useEffect, useState } from "react";
import Api from "@/services/withoutAuthActivities/categories";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllCategories } = Api;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const getCategories = await getAllCategories()
        setCategories(getCategories?.categories)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, [getAllCategories]);

  return (
    <div className="m-4" id="categorization">
      <Typography
        className="border border-gray-300 top-3 relative"
        style={{
          transform: "translateY(15px)",
          borderTopWidth: "2px",
          borderTopRightRadius: "50%",
          borderTopLeftRadius: "50%",
        }}
      />

      <div>
        <Typography
          sx={{
            zIndex: "100",
            position: "relative",
            width: {
              sm: "20%",
              md: "22%",
              lg: "20%",
              xl: "15%",
            },
            fontSize: {
              xs: "20px",
              sm: "16px",
              md: "20px",
              lg: "24px",
              xl: "30px",
            },
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          className="bg-slate-100 m-2 flex justify-center mx-auto"
        >
          <TbCategory className="mt-1 text-cyan-500" />
          <span className="mx-2">دسته بندی</span>
        </Typography>
      </div>

      <Grid container gap={isLoading ? 0 : 2} justifyContent="center">
        {
          isLoading ?
            Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item" key={index}>
                <Skeleton variant="rectangular" width="95%" height={200} className="my-3" />
              </Grid>
            ))
            :
            categories.map((item, index) => (
              <Grid item xs={3} lg={2} key={index}>
                <CategoryComponent
                  src={item.imageUrl}
                  caption={item.name}
                  href={item._id}
                  charachtersLengthLevel={item.name.length < 11 ? 0 : item.name.length < 14 ? 1 : 2}
                />
              </Grid>
            ))
        }
      </Grid>
    </div>
  );
}
