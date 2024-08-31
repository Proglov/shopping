"use client";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentsApi from "@/services/withoutAuthActivities/comment";
import Api from "@/services/withAuthActivities/comment";
import UserApi from "@/services/withAuthActivities/user";
import DOMPurify from "dompurify";
import { convertToFarsiNumbers } from "@/utils/funcs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function CommentItem({ productID }) {
  const { getCommentsOfAProduct } = CommentsApi;
  const { createComment, toggleLikeComment, toggleDisLikeComment } = Api;
  const { getMe } = UserApi;
  const login = useSelector((state) => state.Login) === 'user';

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReplay, setNewReplay] = useState("");
  const [userId, setUserId] = useState("");
  const [replyId, setReplyId] = useState("");

  // -1 -> 1, 0 -> 1 , 1 -> 0
  const likeStatusArr = [1, 0, 1]
  // -1 -> 0, 0 -> -1 , 1 -> -1
  const disLikeStatusArr = [-1, -1, 0]

  const createOwnerType = () => {
    return login ? "User" : "Seller";
  }

  const toggleLikeAndDisLike = async (isLike, comment, commentIndex, parentCommentIndex) => {
    try {
      let res, newStatus
      if (isLike) {
        res = await toggleLikeComment({
          id: comment._id,
          ownerType: createOwnerType()
        });
        newStatus = likeStatusArr.at(comment?.status)
      } else {
        res = await toggleDisLikeComment({
          id: comment._id,
          ownerType: createOwnerType()
        });
        newStatus = disLikeStatusArr.at(comment?.status)
      }

      const newComment = {
        ...comment,
        likes: res?.comment?.likes,
        disLikes: res?.comment?.disLikes,
        status: newStatus,
      }

      if (parentCommentIndex === -1) {
        setComments(prev => {
          let newArr = [...prev]
          newArr[commentIndex] = newComment
          return newArr
        })
      } else {
        setComments(prev => {
          let newArr = [...prev]
          newArr[parentCommentIndex].childrenComments[commentIndex] = newComment
          return newArr
        })
      }


    } catch (error) {
      toast.error("ابتدا وارد شوید", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSubmit = async () => {
    if (newComment === "") {
      toast.warning("! متن نظر الزامیست", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      const body = DOMPurify.sanitize(newComment);
      await createComment({
        body: body,
        parentCommentId: null,
        productId: productID,
        ownerType: createOwnerType(),
        id: userId,
      });
      setNewComment("");
      toast.success("نظر شما برای بررسی ثبت شد", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("ابتدا وارد شوید", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const answer = async (id) => {
    if (newReplay === "") {
      toast.warning("! متن پاسخ الزامیست", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      const body = DOMPurify.sanitize(newReplay);
      await createComment({
        body: body,
        parentCommentId: id,
        productId: productID,
        ownerType: createOwnerType(),
        id: userId,
      });
      setNewReplay("");
      toast.success("پاسخ شما برای بررسی ثبت شد", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("ابتدا وارد شوید", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    const GetUser = async () => {
      try {
        const user = await getMe();
        setUserId(user.user._id);
        return user.user._id
      } catch (error) {
        return ""
      }
    };
    const GetComments = async () => {
      try {
        const userID = await GetUser();
        const response = await getCommentsOfAProduct({ id: productID });

        if (response?.comments?.length > 0) {
          const arr = response?.comments.reduce((accumulator, currentComment) => {
            const res = [...accumulator];
            let status = 0;
            let userIndex = currentComment.likes.findIndex(item => item.id === userID)
            // user liked the comment
            if (userIndex > -1)
              status = 1
            else {
              userIndex = currentComment.disLikes.findIndex(item => item.id === userID)
              // user disliked the comment
              if (userIndex > -1)
                status = -1
            }

            if (currentComment.parentCommentId == null) {
              const thisCommentIndex = res.findIndex(obj => obj._id === currentComment._id)

              if (thisCommentIndex > -1)
                res[thisCommentIndex] = {
                  ...res[thisCommentIndex],
                  body: currentComment.body,
                  likes: currentComment.likes,
                  disLikes: currentComment.disLikes,
                  ownerId: currentComment.ownerId,
                  status
                }
              else
                res.push({
                  _id: currentComment._id,
                  body: currentComment.body,
                  likes: currentComment.likes,
                  disLikes: currentComment.disLikes,
                  ownerId: currentComment.ownerId,
                  childrenComments: [],
                  status
                })


            } else {
              const parentCommentIndex = res.findIndex(obj => obj._id === currentComment.parentCommentId)
              if (parentCommentIndex > -1)
                res[parentCommentIndex] = {
                  ...res[parentCommentIndex],
                  childrenComments: [
                    ...res[parentCommentIndex].childrenComments,
                    {
                      _id: currentComment._id,
                      body: currentComment.body,
                      likes: currentComment.likes,
                      disLikes: currentComment.disLikes,
                      ownerId: currentComment.ownerId,
                      status
                    }
                  ]
                }
              else
                res.push({
                  _id: currentComment.parentCommentId,
                  childrenComments: [
                    {
                      _id: currentComment._id,
                      body: currentComment.body,
                      likes: currentComment.likes,
                      disLikes: currentComment.disLikes,
                      ownerId: currentComment.ownerId,
                      status
                    }
                  ]
                })

            }

            return res

          }, [])

          setComments(arr)
        } else {
          setComments([])
        }

      } catch (error) {
        toast.error("اشکال در دریافت کامنت ها", {
          position: toast.POSITION.TOP_RIGHT,
        });
        toast.error(error.toString(), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    GetComments();

  }, [
    getCommentsOfAProduct,
    productID,
    getMe,
    setUserId,
  ]);


  return (
    <Box className="p-5 m-5 border-2 rounded-lg mx-auto max-w-3xl">
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
                label="نظر شما"
                placeholder="نظر خود را وارد کنید ..."
                variant="outlined"
                color="info"
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
                className="bg-green-500 hover:bg-green-600 text-base"
                onClick={handleSubmit}
              >
                ثبت نظر
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="text-center" component="div">
          برای ثبت نظر و پاسخ باید ابتدا وارد شوید.
        </Box>
      )}
      <Box component="div">
        {comments.length !== 0 ? (
          comments.map((item, index) => {
            const show = replyId === item._id;
            return (
              <Box
                key={index}
                className="border-2 shadow-lg rounded-lg p-5 m-3 grid grid-rows-2"
              >
                <Box className="row-span-2">
                  <Box className="sm:text-lg text-sm bold">
                    {!item?.userId?.username
                      ? "کاربر بدون نام"
                      : item?.ownerId?.name
                    }
                    {" "}
                    :
                  </Box>

                  <Box className="sm:text-base text-xs p-5">{item?.body}</Box>

                  <Box className="mt-3 grid grid-cols-2">
                    <Box className="p-3">
                      <Checkbox
                        icon={<ThumbDownAltOutlinedIcon />}
                        checkedIcon={<ThumbDownAltIcon />}
                        color="warning"
                        checked={item.status === -1}
                        onChange={() => toggleLikeAndDisLike(false, item, index, -1)}
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
                        color="success"
                        checked={item.status === 1}
                        onChange={() => toggleLikeAndDisLike(true, item, index, -1)}
                      />
                      <span>
                        {convertToFarsiNumbers(item?.likes?.length?.toString())}
                      </span>
                    </Box>
                  </Box>

                  <Box className="p-3 border-t-2">

                    {
                      show && (
                        <>
                          <Box className="p-5">
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
                                borderBottom: "1px solid gray",
                                borderBottomLeftRadius: '4px',
                                borderBottomRightRadius: '4px'
                              }}
                            />
                          </Box>

                          <Box className="md:flex justify-around hidden">
                            <Box>
                              <Button
                                variant="outlined"
                                size="large"
                                color="success"
                                onClick={() => {
                                  answer(item._id);
                                  setReplyId("");
                                }}
                              >
                                ثبت پاسخ
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                variant="outlined"
                                size="large"
                                color="error"
                                onClick={() => {
                                  setReplyId("");
                                  setNewReplay("")
                                }}
                              >
                                انصراف
                              </Button>
                            </Box>
                          </Box>

                          <Box className="md:hidden flex justify-around">
                            <Box>
                              <Button
                                variant="outlined"
                                size="small"
                                color="success"
                                onClick={() => {
                                  answer(item._id);
                                  setReplyId("");
                                }}
                              >
                                ثبت پاسخ
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={() => {
                                  setReplyId("");
                                  setNewReplay("")
                                }}
                              >
                                انصراف
                              </Button>
                            </Box>
                          </Box>

                        </>
                      )
                    }

                    {
                      !show && login && (
                        <>
                          <Box className="md:block hidden">
                            <Button
                              variant="outlined"
                              size="large"
                              color="info"
                              onClick={() => { setReplyId(item._id) }}
                              className="w-48"
                            >
                              پاسخ به این کامنت
                            </Button>
                          </Box>
                          <Box className="mt-5 md:hidden block">
                            <Button
                              variant="outlined"
                              color="info"
                              size="small"
                              fullWidth
                              onClick={() => { setReplyId(item._id) }}
                            >
                              پاسخ به این کامنت
                            </Button>
                          </Box>
                        </>
                      )
                    }

                  </Box>
                  {item.childrenComments.map((comment, childrenIndex) => {
                    return (
                      <Box
                        key={childrenIndex}
                        className="border-2 shadow-lg rounded-lg md:mr-28 p-5 mt-5 grid"
                        component="div"
                      >
                        <Box>
                          <Box className="sm:text-lg text-sm bold">
                            {!comment?.userId?.username
                              ? "کاربر بدون نام"
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
                                color="warning"
                                checked={comment.status === -1}
                                onChange={() => toggleLikeAndDisLike(false, comment, childrenIndex, index)}
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
                                color="success"
                                checked={comment.status === 1}
                                onChange={() => toggleLikeAndDisLike(true, comment, childrenIndex, index)}
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