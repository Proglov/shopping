"use client";

import { Box, Button, Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

export default function CommentItem({ comments }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [commentsList, setCommentsList] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [like, setLike] = useState({});
  const com = [
    { message: "salam", name: "amir", id: 1 },
    { message: "khoda", name: "ali", id: 5 },
    { message: "hi", name: "amir", id: 8 },
    { message: "fghj", name: "ali", id: 9 },
    { message: "kjhgv", name: "amir", id: 78 },
    { message: "ertyuio", name: "ali", id: 786 },
    { message: "jjj", name: "amir", id: 744 },
    { message: "khoda", name: "ali", id: 855 },
  ];

  const handleSubmit = () => {
    setCommentsList([...commentsList, { message: newComment, name: name }]);
    setNewComment("");
    setName("");
    setPhoneNumber("");
  };

  return (
    <Box className="p-5 m-5 border-2 rounded-lg">
      <Box
        component="div"
        className="mb-5 h-12 border-b-2 text-center text-gray-950 text-bold text-lg"
      >
        نظرات
      </Box>
      <Box component="form">
        <Box className="grid sm:grid-cols-2 grid-cols-1">
          <Box className="p-5">
            <TextField
              rows={8}
              fullWidth
              multiline
              label="نظر"
              placeholder="نظر خود را وارد کنید."
              variant="outlined"
              color="primary"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{
                " & .MuiInputLabel-root": {
                  left: "inherit !important",
                  right: "1.75rem !important",
                  transformOrigin: "right !important",
                },
                "& legend": { textAlign: "right" },
              }}
            />
          </Box>
          <Box className="grid grid-cols-1 p-5 my-auto space-y-5">
            <TextField
              value={name}
              label="نام و نام خانوادگی"
              variant="outlined"
              color="primary"
              onChange={(event) => {
                const input = event.target.value;
                const filteredInput = input.replace(/[^آ-یa-zA-Z]+/g, "");
                setName(filteredInput);
              }}
              sx={{
                " & .MuiInputLabel-root": {
                  left: "inherit !important",
                  right: "1.75rem !important",
                  transformOrigin: "right !important",
                },
                "& legend": { textAlign: "right" },
              }}
            />
            <TextField
              value={phoneNumber}
              label="شماره موبایل"
              variant="outlined"
              color="primary"
              onChange={(event) => {
                const input = event.target.value;
                const filteredInput = input.replace(/\D/g, "");
                setPhoneNumber(filteredInput);
              }}
              sx={{
                " & .MuiInputLabel-root": {
                  left: "inherit !important",
                  right: "1.75rem !important",
                  transformOrigin: "right !important",
                },
                "& legend": { textAlign: "right" },
              }}
            />
            <Button
              variant="contained"
              className="bg-green-600 hover:bg-green-700 text-base"
              onClick={handleSubmit}
            >
              ثبت نظر
            </Button>
          </Box>
        </Box>
      </Box>
      <Box component="div">
        {commentsList.map((item, index) => {
          const Liked = like[item.id];
          return (
            <Box
              key={index}
              className="border-2 shadow-lg rounded-lg p-5 m-3 grid grid-cols-12 grid-rows-2"
            >
              <Box className="m-3 sm:block hidden row-span-2">
                <AccountCircle sx={{ fontSize: 40 }} color="inherit" />
              </Box>
              <Box className="col-span-11 row-span-2">
                <Box className="sm:text-lg text-sm bold">{item.name} :</Box>
                <Box className="sm:text-base text-xs p-5">{item.message}</Box>
                <Box className="mt-3 grid grid-cols-2">
                  <Box className="p-3">
                    <Checkbox
                      icon={<ThumbDownAltOutlinedIcon />}
                      checkedIcon={<ThumbDownAltIcon />}
                      color="error"
                      checked={Liked === "disLike"}
                      value="disLike"
                      onChange={(event) =>
                        setLike({ ...like, [item.id]: event.target.value })
                      }
                    />
                    <span>+500</span>
                  </Box>
                  <Box className="p-3">
                    <Checkbox
                      icon={<ThumbUpAltOutlinedIcon />}
                      checkedIcon={<ThumbUpAltIcon />}
                      color="error"
                      checked={Liked === "like"}
                      value="like"
                      onChange={(event) =>
                        setLike({ ...like, [item.id]: event.target.value })
                      }
                    />
                    <span>126</span>
                  </Box>
                </Box>
                <Box className="md:grid p-3 border-t-2 md:grid-cols-6">
                  <Box className="md:col-span-5">پاسخ ها :</Box>
                  <Box className="md:block hidden justify-self-end">
                    <Button variant="outlined" size="large" color="info">
                      پاسخ دادن
                    </Button>
                  </Box>
                  <Box className="mt-5 md:hidden block">
                    <Button variant="outlined" color="info" fullWidth>
                      پاسخ دادن
                    </Button>
                  </Box>
                </Box>
                {com.map((com, id) => {
                  const LikedCom = like[com.id];
                  return (
                    <Box
                      key={id}
                      className="border-2 shadow-lg rounded-lg md:mr-28 p-5 mt-5 grid grid-cols-12"
                      component="div"
                    >
                      <Box className="m-auto sm:block hidden row-span-2">
                        <AccountCircle sx={{ fontSize: 40 }} color="inherit" />
                      </Box>
                      <Box className="col-span-11">
                        <Box className="sm:text-lg text-sm bold">
                          {com.name} :
                        </Box>
                        <Box className="sm:text-base text-xs p-5">
                          {com.message}
                        </Box>
                        <Box className="mt-3 grid grid-cols-2">
                          <Box className="p-3">
                            <Checkbox
                              icon={<ThumbDownAltOutlinedIcon />}
                              checkedIcon={<ThumbDownAltIcon />}
                              color="error"
                              checked={LikedCom === "disLike"}
                              value="disLike"
                              onChange={(event) =>
                                setLike({
                                  ...like,
                                  [com.id]: event.target.value,
                                })
                              }
                            />
                            <span>+500</span>
                          </Box>
                          <Box className="p-3">
                            <Checkbox
                              icon={<ThumbUpAltOutlinedIcon />}
                              checkedIcon={<ThumbUpAltIcon />}
                              color="error"
                              checked={LikedCom === "like"}
                              value="like"
                              onChange={(event) =>
                                setLike({
                                  ...like,
                                  [com.id]: event.target.value,
                                })
                              }
                            />
                            <span>126</span>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
