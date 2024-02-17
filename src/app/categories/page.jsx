"use client";

import CategoryComponent from "@/components/home/CategoryComponent";
import { GroupingContext, useGrouping } from "@/context/GroupingContext";
import { useContext } from "react";
import { Grid } from "@mui/material";
import React from "react";

export default function Categories() {
  //const grouping = useGrouping(); ?
  const grouping = useContext(GroupingContext);
  return (
    <>
      <Grid container gap={3} justifyContent="center">
        {grouping.map((item) => (
          <Grid item xs={3} lg={2}>
            <CategoryComponent
              href={item.href}
              caption={item.name}
              src={item.src}
              charachtersLengthLevel={0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
