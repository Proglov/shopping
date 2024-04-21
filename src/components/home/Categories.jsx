"use client";

import { Grid, Typography } from "@mui/material";
import CategoryComponent from "./CategoryComponent";
import { TbCategory } from "react-icons/tb";
import { GroupingContext, useGrouping } from "@/context/GroupingContext";
import { useContext } from "react";

export default function Categories() {
  //const grouping = useGrouping(); ?
  const grouping = useContext(GroupingContext);
  return (
    <div className="m-4" id="categorization">
      <div
        className="border border-gray-300 top-3 relative"
        style={{
          transform: "translateY(15px)",
          borderTopWidth: "2px",
          borderTopRightRadius: "50%",
          borderTopLeftRadius: "50%",
        }}
      ></div>

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
          }}
          className="bg-white m-2 flex justify-center mx-auto"
        >
          <TbCategory className="mt-1 text-cyan-500" />
          <span className="mx-2">دسته بندی</span>
        </Typography>
      </div>

      <Grid container gap={2} justifyContent="center">
        {grouping.map((item, index) => (
          <Grid item xs={3} lg={2} key={index}>
            <CategoryComponent
              href={item.href}
              caption={item.name}
              src={item.src}
              charachtersLengthLevel={0}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
