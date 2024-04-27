"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function CommentItem({ comments }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [commentsList, setCommentsList] = useState(comments);
  const [newComment, setNewComment] = useState("");

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
        {commentsList.map((item, index) => (
          <Box
            key={index}
            className="border-2 shadow-lg rounded-lg p-5 m-3 grid grid-cols-12"
          >
            <Box className="m-auto sm:block hidden">
              <AccountCircle sx={{ fontSize: 40 }} color="inherit" />
            </Box>
            <Box className="col-span-11">
              <Box className="sm:text-lg text-sm bold">{item.name} :</Box>
              <Box className="sm:text-base text-xs p-5">{item.message}</Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
