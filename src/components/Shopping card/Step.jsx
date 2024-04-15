import { farsiNumCharacter } from "@/utils/funcs";
import { Box, Grid } from "@mui/material";

export default function Step({ active }) {
  const enable =
    "rounded-full bg-green-500 text-center text-white text-2xl shadow-2xl absolute";
  const disable =
    "rounded-full bg-white text-center text-gray-500 text-2xl shadow-2xl absolute";
  const textEnable = "text-green-500 ";
  const textDisable = "text-gray-500 ";

  const stepper = [1, 2, 3];
  const detail = ["اطلاعات ارسال", "پرداخت آنلاین", "فاکتور نهایی"];

  return (
    <>
      <Box className="mt-10 mb-10">
        <Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            className="mb-12"
          >
            {stepper.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    active == index
                      ? "relative bg-green-500 h-1 w-28"
                      : "relative bg-white h-1 w-28"
                  }
                >
                  <div
                    className={active == index ? `${enable}` : `${disable}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      lineHeight: "50px",
                      top: "-22px",
                      right: "27%",
                    }}
                  >
                    {farsiNumCharacter(item.toString())}
                  </div>
                </div>
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            {detail.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    active == index ? `${textEnable}` : `${textDisable}`
                  }
                >
                  {item}
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
