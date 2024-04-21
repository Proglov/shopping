"use client";

import { Box, Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

export default function FilterProducts() {
  const [active, setActive] = useState([false, false, false]);
  return (
    <>
      <Box
        component="div"
        className="sm:hidden h-auto p-2 flex justify-between items-center bg-red-50 border-2 border-red-200 rounded my-5"
      >
        <Box className="text-center">فیلتر ها</Box>
        <Box
          sx={{ height: 40, width: 2 }}
          className="bg-red-200"
          component="div"
        ></Box>
        <Button
          className={`${active[0] ? "font-bold" : ""}`}
          onClick={() => setActive([true, false, false])}
        >
          ارزان ترین
        </Button>
        <Button
          className={`${active[1] ? "font-bold" : ""}`}
          onClick={() => setActive([false, true, false])}
        >
          گران ترین
        </Button>
        <Button
          className={`${active[2] ? "font-bold" : ""}`}
          onClick={() => setActive([false, false, true])}
        >
          پر فروش ترین
        </Button>
      </Box>
      <Box
        component="div"
        className="hidden sm:flex w-96 h-auto p-2 justify-between items-center bg-red-50 border-2 border-red-200 rounded my-5"
      >
        <Box className="text-center">فیلتر ها</Box>
        <Box
          sx={{ height: 40, width: 2 }}
          className="bg-red-200"
          component="div"
        ></Box>
        <Button
          className={`${active[0] ? "font-bold" : ""}`}
          onClick={() => setActive([true, false, false])}
        >
          ارزان ترین
        </Button>
        <Button
          className={`${active[1] ? "font-bold" : ""}`}
          onClick={() => setActive([false, true, false])}
        >
          گران ترین
        </Button>
        <Button
          className={`${active[2] ? "font-bold" : ""}`}
          onClick={() => setActive([false, false, true])}
        >
          پر فروش ترین
        </Button>
      </Box>
    </>
  );
}
