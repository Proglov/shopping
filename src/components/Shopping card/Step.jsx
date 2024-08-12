import { farsiNumCharacter } from "@/utils/funcs";
import { Box } from "@mui/material";

export default function Step({ active }) {

  const stepper = [1, 2, 3];
  const detail = ["اطلاعات ارسال", "نحوه پرداخت", "اطلاعات نهایی"];

  const makeBall = (active, index) => <div className={`mt-[-3px] w-3 h-3 rounded-full bg-${active == index || active == index - 1 ? 'green-500' : 'gray-300'}`} />

  return (
    <Box className="mb-20 mt-14 flex justify-around w-[320px] sm:w-[360px] mx-auto">

      {
        stepper.map((item, index) =>
          <div
            key={index}
            className={
              active == index
                ? "relative bg-green-500 h-1 w-28 sm:w-32"
                : "relative bg-gray-300 h-1 w-28 sm:w-32"
            }
          >
            {makeBall(active, index)}
            <div
              className={`rounded-full text-center text-2xl shadow-2xl absolute ${active == index ? ' bg-green-500 text-white' : ' bg-gray-300 text-gray-500'}`}
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
            <br />
            <div className={`text-center sm:text-base text-sm mr-3 mt-2 ${active == index ? 'text-green-500' : "text-gray-500"}`}>
              {detail[index]}
            </div>
          </div>
        )
      }

      {makeBall(active, 3)}
    </Box>
  );
}