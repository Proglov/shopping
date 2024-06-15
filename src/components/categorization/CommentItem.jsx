"use client";

import { Box, Button, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentsApi from "@/services/withoutAuthActivities/comment";
import Api from "@/services/withAuthActivities/comment";
import UserApi from "@/services/withAuthActivities/user";
import { usePathname } from "next/navigation";
import DOMPurify from "dompurify";
import { convertToFarsiNumbers } from "@/utils/funcs";

export default function CommentItem() {
  const router = usePathname();
  const productID = router.split("/")[3];
  const [commentsList, setCommentsList] = useState([]);
  const [replay, setReply] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReplay, setNewReplay] = useState("");
  const { getCommentsOfAProduct } = CommentsApi;
  const { createComment, toggleLikeComment, toggleDisLikeComment } = Api;
  const { getMe } = UserApi;
  const [login, setLogin] = useState(true);
  const [userId, setUserId] = useState("");
  const [SHOW, setSHOW] = useState({});
  const [likes, setLikes] = useState({});
  const [disLikes, setDisLikes] = useState({});

  const liked = async (id) => {
    try {
      if (localStorage.getItem("UserLogin") == "true") {
        const ownerType = "User";
        const response = await toggleLikeComment({
          id: id,
          ownerType: ownerType,
        });
        const comments = await getCommentsOfAProduct({ id: productID });
        const r = comments.comments.filter(
          (item) => item.parentCommentId !== null
        );
        setReply(r);
        setCommentsList(
          comments.comments.filter((item) => item.parentCommentId === null)
        );
      } else {
        const ownerType = "Seller";
        const response = await toggleLikeComment({
          id: id,
          ownerType: ownerType,
        });
        const comments = await getCommentsOfAProduct({ id: productID });
        const r = comments.comments.filter(
          (item) => item.parentCommentId !== null
        );
        setReply(r);
        setCommentsList(
          comments.comments.filter((item) => item.parentCommentId === null)
        );
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const disLiked = async (id) => {
    try {
      if (localStorage.getItem("UserLogin") == "true") {
        const ownerType = "User";
        const response = await toggleDisLikeComment({
          id: id,
          ownerType: ownerType,
        });
        const comments = await getCommentsOfAProduct({ id: productID });
        const r = comments.comments.filter(
          (item) => item.parentCommentId !== null
        );
        setReply(r);
        setCommentsList(
          comments.comments.filter((item) => item.parentCommentId === null)
        );
      } else {
        const ownerType = "Seller";
        const response = await toggleDisLikeComment({
          id: id,
          ownerType: ownerType,
        });
        const comments = await getCommentsOfAProduct({ id: productID });
        const r = comments.comments.filter(
          (item) => item.parentCommentId !== null
        );
        setReply(r);
        setCommentsList(
          comments.comments.filter((item) => item.parentCommentId === null)
        );
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const body = DOMPurify.sanitize(newComment);
      if (localStorage.getItem("UserLogin") == "true") {
        const ownerType = "User";
        const response = await createComment({
          body: body,
          parentCommentId: null,
          productId: productID,
          ownerType: ownerType,
          id: userId,
        });
        setNewComment("");
        alert("نظر شما برای بررسی ثبت شد.");
      } else {
        const ownerType = "Seller";
        const response = await createComment({
          body: body,
          parentCommentId: null,
          productId: productID,
          ownerType: ownerType,
          id: userId,
        });
        setNewComment("");
        alert("نظر شما برای بررسی ثبت شد.");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const answer = async (id) => {
    if (newReplay === "") {
      alert("متنی وارد نکرده اید دوباره تلاش کنید");
      return;
    }
    try {
      if (localStorage.getItem("UserLogin") == "true") {
        const ownerType = "User";
        const body = DOMPurify.sanitize(newReplay);
        const response = await createComment({
          body: body,
          parentCommentId: id,
          productId: productID,
          ownerType: ownerType,
          id: userId,
        });
        setNewReplay("");
        alert("پاسخ شما برای بررسی ثبت شد.");
      } else {
        const ownerType = "Seller";
        const body = DOMPurify.sanitize(newReplay);
        const response = await createComment({
          body: body,
          parentCommentId: id,
          productId: productID,
          ownerType: ownerType,
          id: userId,
        });
        setNewReplay("");
        alert("پاسخ شما برای بررسی ثبت شد.");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("UserLogin") === "true") {
      setLogin(true);
    } else {
      setLogin(false);
    }
    const GetComments = async () => {
      try {
        const comments = await getCommentsOfAProduct({ id: productID });
        const r = comments.comments.filter(
          (item) => item.parentCommentId !== null
        );
        setReply(r);
        setCommentsList(
          comments.comments.filter((item) => item.parentCommentId === null)
        );
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    GetComments();
    const GetUser = async () => {
      if (!login) {
        return;
      }
      try {
        const user = await getMe();
        setUserId(user.user._id);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    GetUser();

    // commentsList.map((item) => {
    //   item.likes.map((likeId) => {
    //     if (likeId === userId) {
    //       setLikes({ ...likes, [item._id]: true });
    //     }
    //   });
    //   item.disLikes.map((disLikeId) => {
    //     if (disLikeId === userId) {
    //       setDisLikes({ ...disLikes, [item._id]: true });
    //     }
    //   });
    // });

    // replay.map((item) => {
    //   item.likes.map((likeId) => {
    //     if (likeId === userId) {
    //       setLikes({ ...likes, [item._id]: true });
    //     }
    //   });
    //   item.disLikes.map((disLikeId) => {
    //     if (disLikeId === userId) {
    //       setDisLikes({ ...disLikes, [item._id]: true });
    //     }
    //   });
    // });
  }, [
    getCommentsOfAProduct,
    // productID,
    setReply,
    setCommentsList,
    getMe,
    setUserId,
    // setLikes,
    // setDisLikes,
    // disLikes,
    // likes,
    // commentsList,
    // replay,
    // login,
  ]);

  return (
    <Box className="p-5 m-5 border-2 rounded-lg">
      <Box
        component="div"
        className="mb-5 h-12 border-b-2 text-center text-gray-950 text-bold text-lg"
      >
        نظرات
      </Box>
      {login ? (
        <Box component="form">
          <Box className="grid">
            <Box className="p-5">
              <TextField
                rows={3}
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
      ) : (
        <Box className="text-center" component="div">
          برای ثبت نظر باید ابتدا وارد شوید.
        </Box>
      )}
      <Box component="div">
        {commentsList.length !== 0 ? (
          commentsList.map((item, index) => {
            const show = SHOW[index];
            const commentLike = likes[item._id] || false;
            const commentDisLike = disLikes[item._id] || false;
            return (
              <Box
                key={index}
                className="border-2 shadow-lg rounded-lg p-5 m-3 grid grid-rows-2"
              >
                <Box className="row-span-2">
                  <Box className="sm:text-lg text-sm bold">
                    {item?.userId?.username == ""
                      ? "فاقد نام"
                      : item?.ownerId?.name}{" "}
                    :
                  </Box>
                  <Box className="sm:text-base text-xs p-5">{item?.body}</Box>
                  <Box className="mt-3 grid grid-cols-2">
                    <Box className="p-3">
                      <Checkbox
                        icon={<ThumbDownAltOutlinedIcon />}
                        checkedIcon={<ThumbDownAltIcon />}
                        color="error"
                        checked={commentDisLike}
                        onChange={() => disLiked(item._id)}
                      />
                      <span>
                        {convertToFarsiNumbers(
                          item?.disLikes?.length?.toString()
                        )}
                      </span>
                    </Box>
                    <Box className="p-3">
                      <Checkbox
                        icon={<ThumbUpAltOutlinedIcon />}
                        checkedIcon={<ThumbUpAltIcon />}
                        color="error"
                        checked={commentLike}
                        onChange={() => liked(item._id)}
                      />
                      <span>
                        {convertToFarsiNumbers(item?.likes?.length?.toString())}
                      </span>
                    </Box>
                  </Box>
                  <Box className="md:grid p-3 border-t-2 md:grid-cols-6">
                    {show ? (
                      <Box className="p-5 md:col-span-6">
                        <TextField
                          rows={3}
                          fullWidth
                          multiline
                          label="پاسخ"
                          placeholder="پاسخ خود را وارد کنید."
                          variant="outlined"
                          color="primary"
                          value={newReplay}
                          onChange={(e) => setNewReplay(e.target.value)}
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
                    ) : (
                      ""
                    )}
                    <Box className="md:col-span-5">
                      {replay.length === 0 ? "" : "پاسخ ها :"}
                    </Box>
                    {!show ? (
                      <>
                        <Box className="md:block hidden justify-self-end">
                          <Button
                            variant="outlined"
                            size="large"
                            color="info"
                            onClick={() => {
                              setSHOW({ ...SHOW, [index]: true });
                            }}
                          >
                            پاسخ دادن
                          </Button>
                        </Box>
                        <Box className="mt-5 md:hidden block">
                          <Button
                            variant="outlined"
                            color="info"
                            fullWidth
                            onClick={() => {
                              setSHOW({ ...SHOW, [index]: true });
                            }}
                          >
                            پاسخ دادن
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box className="md:block hidden justify-self-end">
                          <Button
                            variant="outlined"
                            size="large"
                            color="success"
                            onClick={() => {
                              answer(item._id);
                              setSHOW({ ...SHOW, [index]: false });
                            }}
                          >
                            ثبت پاسخ
                          </Button>
                        </Box>
                        <Box className="mt-5 md:hidden block">
                          <Button
                            variant="outlined"
                            color="success"
                            fullWidth
                            onClick={() => {
                              answer(item._id);
                              setSHOW({ ...SHOW, [index]: false });
                            }}
                          >
                            ثبت پاسخ
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>
                  {replay.map((comment, id) => {
                    if (comment.parentCommentId === item._id) {
                      const replayLike = likes[comment._id] || false;
                      const replayDisLike = disLikes[comment._id] || false;
                      return (
                        <Box
                          key={id}
                          className="border-2 shadow-lg rounded-lg md:mr-28 p-5 mt-5 grid"
                          component="div"
                        >
                          <Box>
                            <Box className="sm:text-lg text-sm bold">
                              {comment?.userId?.username == ""
                                ? "فاقد نام"
                                : comment?.ownerId?.name}{" "}
                              :
                            </Box>
                            <Box className="sm:text-base text-xs p-5">
                              {comment.body}
                            </Box>
                            <Box className="mt-3 grid grid-cols-2">
                              <Box className="p-3">
                                <Checkbox
                                  icon={<ThumbDownAltOutlinedIcon />}
                                  checkedIcon={<ThumbDownAltIcon />}
                                  color="error"
                                  checked={replayDisLike}
                                  onChange={() => disLiked(comment._id)}
                                />
                                <span>
                                  {convertToFarsiNumbers(
                                    comment?.disLikes?.length?.toString()
                                  )}
                                </span>
                              </Box>
                              <Box className="p-3">
                                <Checkbox
                                  icon={<ThumbUpAltOutlinedIcon />}
                                  checkedIcon={<ThumbUpAltIcon />}
                                  color="error"
                                  checked={replayLike}
                                  onChange={() => liked(comment._id)}
                                />
                                <span>
                                  {convertToFarsiNumbers(
                                    comment?.likes?.length?.toString()
                                  )}
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>
              </Box>
            );
          })
        ) : (
          <Box component="div" className="text-center m-5">
            نظری تا کنون ثبت نشده است ! اولین نفری باشد که نظر می دهید .
          </Box>
        )}
      </Box>
    </Box>
  );
}
