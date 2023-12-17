import { farsiNumCharacter } from "@/utils/funcs";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";

export default function ShoppingCard() {
  const product = [
    {
      number: 5,
      name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
      src: "/img/home/category-labaniat.jpg",
    },
    {
      number: 7,
      name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
      src: "/img/home/tanagholat.jpg",
    },
    {
      number: 1,
      name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
      src: "/img/home/category-labaniat.jpg",
    },
    {
      number: 2,
      name: "شامپو پرژک مدل سیر حجم 450 میلی لیتر",
      src: "/img/home/tanagholat.jpg",
    },
  ];

  return (
    <>
      <Box className="p-5 mb-1" component="div">
        <Card className="border-gray-300">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              className="font-bold mb-4"
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "16px",
                  md: "20px",
                  lg: "24px",
                  xl: "28px",
                },
              }}
            >
              سبد خرید
              <Button
                variant="outlined"
                className="bg-gray-100 border-gray-100 hover:border-gray-300 text-gray-900 font-medium float-left"
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "10px",
                    md: "14px",
                    lg: "18px",
                    xl: "18px",
                  },
                }}
              >
                ویرایش سبد خرید
              </Button>
            </Typography>
            <div className="flex flex-row flex-wrap">
              {product.map((item, index) => {
                return (
                  <div
                    className="m-4 bg-gray-100 h-52 w-40"
                    key={index}
                  >
                    <Badge
                      color="info"
                      badgeContent={
                        item.number === 1 ? 0 : farsiNumCharacter(item.number)
                      }
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <div className="p-1">
                        <img src={item.src} alt="Product"/>
                      </div>
                    </Badge>
                    <div className="p-2 text-gray-900">
                      <span>{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
