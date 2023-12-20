import { farsiNumCharacter } from "@/utils/funcs";
import { Box, Grid } from "@mui/material";

export default function Step({ active }) {
  const enable =
    "rounded-full bg-green-500 text-center text-white text-2xl shadow-2xl absolute";
  const disable =
    "rounded-full bg-white text-center text-gray-500 text-2xl shadow-2xl absolute";
  const textEnable = "text-green-500 ";
  const textDisable = "text-gray-500 ";

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
            <div
              className={
                active == 0
                  ? "relative bg-green-500 h-1 w-28"
                  : "relative bg-white h-1 w-28"
              }
            >
              <div
                className={active == 0 ? `${enable}` : `${disable}`}
                style={{
                  width: "50px",
                  height: "50px",
                  lineHeight: "50px",
                  top: "-22px",
                  right: "27%",
                }}
              >
                {farsiNumCharacter("1")}
              </div>
            </div>
            <div
              className={
                active == 1
                  ? "relative bg-green-500 h-1 w-28"
                  : "relative bg-white h-1 w-28"
              }
            >
              <div
                className={active == 1 ? `${enable}` : `${disable}`}
                style={{
                  width: "50px",
                  height: "50px",
                  lineHeight: "50px",
                  top: "-22px",
                  right: "27%",
                }}
              >
                {farsiNumCharacter("2")}
              </div>
            </div>
            <div
              className={
                active == 2
                  ? "relative bg-green-500 h-1 w-28"
                  : "relative bg-white h-1 w-28"
              }
            >
              <div
                className={active == 2 ? `${enable}` : `${disable}`}
                style={{
                  width: "50px",
                  height: "50px",
                  lineHeight: "50px",
                  top: "-22px",
                  right: "27%",
                }}
              >
                {farsiNumCharacter("3")}
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <div className={active == 0 ? `${textEnable}` : `${textDisable}`}>
              اطلاعات ارسال
            </div>
            <div className={active == 1 ? `${textEnable}` : `${textDisable} ml-7 mr-7`}>
              پرداخت
            </div>
            <div className={active == 2 ? `${textEnable}` : `${textDisable}`}>
              ثبت سفارش
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
