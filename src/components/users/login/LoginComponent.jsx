"use client";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";
import AuthenticationComponent from "./AuthenticationComponent";
import UserApi from "@/services/withoutAuthActivities/user";
import SellerApi from "@/services/withoutAuthActivities/seller";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { isEmailValid, isPhoneValid } from "@/utils/funcs";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginComponent({ isUsernameParam, type }) { // isUsernameParam === true -> user wants to login with username or email
  const { signInWithPhone, signInWithEmailOrUsername } = UserApi;
  const { sellerSignInWithPhone, sellerSignInWithEmailOrUsername } = SellerApi;
  const router = useRouter();
  const secondInputRef = useRef();

  const [formData, setFormData] = useState({
    firstCredential: '',
    secondCredential: '',
    firstCredentialError: '',
    secondCredentialError: ''
  })
  const [whichFocused, setWhichFocused] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [nextStep, setNextStep] = useState(false); //next step is code entrance


  const handleChange = (event) => {
    const { value, name } = event.target

    if (name === "firstCredential") {
      let input = value;
      if (!isUsernameParam) {
        input = input.replace(/\D/g, "");
        input = input.slice(0, 11)
      }
      setFormData(prev => ({
        ...prev,
        firstCredential: input,
        firstCredentialError: ''
      }))
    } else if (name === "secondCredential") {
      setFormData(prev => ({
        ...prev,
        secondCredential: value,
        secondCredentialError: ''
      }))
    }
  }

  const submit = async () => {
    setWhichFocused(-1)
    if (!isUsernameParam && !isPhoneValid(formData.firstCredential)) {
      setFormData(prev => ({
        ...prev,
        firstCredentialError: 'شماره موبایل به درستی وارد نشده است!'
      }))
    } else if (isUsernameParam && !isEmailValid(formData.firstCredential) && formData.firstCredential.length < 8) {
      setFormData(prev => ({
        ...prev,
        firstCredentialError: 'نام کاربری یا ایمیل درست وارد نشده است!'
      }))
    } else if (formData.secondCredential.length < 8) {
      setFormData(prev => ({
        ...prev,
        secondCredentialError: 'رمزعبور حداقل شامل هشت کاراکتر است!'
      }))
    } else {
      try {
        const firstData = DOMPurify.sanitize(formData.firstCredential);
        const cleanPassword = DOMPurify.sanitize(formData.secondCredential);

        let response;
        if (type === 'seller') {
          if (isUsernameParam) response = await sellerSignInWithEmailOrUsername({ emailOrUsername: firstData, password: cleanPassword });
          else response = await sellerSignInWithPhone({ phone: firstData, password: cleanPassword });

          localStorage.setItem("SellerLogin", "true");
        } else {
          if (isUsernameParam) response = await signInWithEmailOrUsername({ emailOrUsername: firstData, password: cleanPassword });
          else response = await signInWithPhone({ phone: firstData, password: cleanPassword });

          localStorage.setItem("UserLogin", "true");
        }


        localStorage.setItem("token", response.token);
        toast.success("ورود شما موفقیت آمیز بود", {
          position: toast.POSITION.TOP_RIGHT,
        });

        router.push("/");
        // setNextStep(true);
      } catch (error) {
        const mes = error?.response?.data?.message;
        if (mes === "no user found" || mes === "no seller found") {
          toast.error("شماره تلفن شما ثبت نشده است", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (mes === "Invalid Credentials") {
          toast.error("شماره یا رمز عبور صحیح نیست!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (mes === "no seller found") {
          toast.error("شما قبلا ثبت نام نکرده اید", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  return (
    <>
      {nextStep ? (
        <AuthenticationComponent />
      ) : (
        <Box component="div" className="grid place-items-center h-fit w-full">
          <Box
            component="div"
            className="w-full max-w-lg my-10 p-10 border border-slate-300 bg-white rounded-lg"
          >
            <Box className="mb-6 text-2xl text-center" component="div">
              فروشگاه آنلاین
            </Box>
            <Box className="mb-6 text-xl" component="div">
              ورود
              {" "}
              {
                type === 'seller' ?
                  'فروشندگان'
                  :
                  'کاربران'
              }
            </Box>
            <Box className="text-base mb-6 font-thin" component="div">
              سلام!
              <br />
              {
                isUsernameParam ?
                  <span> لطفا ایمیل یا نام کاربری و رمز عبور خود را وارد کنید</span>
                  :
                  <span>لطفا شماره موبایل خود را وارد کنید</span>
              }

            </Box>
            <Box>
              <TextField
                onClick={() => setWhichFocused(0)}
                focused={whichFocused === 0}
                value={formData.firstCredential}
                fullWidth
                name="firstCredential"
                label={`${isUsernameParam ? "نام کاربری یا ایمیل" : "شماره موبایل"}`}
                onChange={handleChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setWhichFocused(1)
                    secondInputRef.current.focus();
                  }
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

              {!!formData.firstCredentialError && (
                <Box className='mt-2'>
                  <div className="text-red-600">
                    {formData.firstCredentialError}
                  </div>

                  {
                    !isUsernameParam &&
                    <div className="text-gray-400 text-sm">
                      نمونه  ی شماره صحیح: 09123456789
                    </div>
                  }
                </Box>
              )}

              <TextField
                onClick={() => setWhichFocused(1)}
                focused={whichFocused === 1}
                inputRef={secondInputRef}
                className="mt-2"
                value={formData.secondCredential}
                name="secondCredential"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="رمز عبور"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    submit();
                  }
                }}
                onChange={handleChange}
                sx={{
                  " & .MuiInputLabel-root": {
                    left: "inherit !important",
                    right: "1.75rem !important",
                    transformOrigin: "right !important",
                  },
                  "& legend": { textAlign: "right" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(prev => !prev)}
                        onMouseDown={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {!!formData.secondCredentialError && (
                <Box className='mt-4 text-red-600'>
                  {formData.secondCredentialError}
                </Box>
              )}
            </Box>

            <Button
              variant="contained"
              className="bg-green-500 hover:bg-green-600 text-xl rounded-lg w-full mt-10"
              onClick={submit}
            >
              وارد شدن
            </Button>

            <Box component="div" className="mt-4">
              برای وارد شدن با
              {" "}
              <span>
                {
                  isUsernameParam ?
                    <span>
                      شماره همراه
                    </span>
                    :
                    <span>
                      نام کاربری و رمز عبور
                    </span>
                }
              </span>
              {" "}
              روی
              {" "}
              <Link
                href={`/${type === 'seller' ? 'Seller' : 'users'}/login?username=${isUsernameParam ? 'false' : 'true'}`}
                className="text-blue-600 cursor-pointer"
              >
                این لینک
              </Link>
              {" "}
              کلیک کنید
            </Box>
            <Box component="div" className="mt-5">
              اگر هنوز ثبت نام نکرده اید همین حالا
              <Link href={`/${type === 'seller' ? 'Seller' : 'users'}/signup`}>
                <span className="text-blue-600"> ثبت نام </span>
              </Link>
              کنید
            </Box>
            <Box component="div" className="mt-4">
              اگر &nbsp;
              <span className="text-red-400 text-lg">
                {
                  type === 'seller' ?
                    'مشتری'
                    :
                    'فروشنده'
                }
              </span>
              &nbsp; هستید از
              &nbsp;
              <Link href={`/${type !== 'seller' ? 'Seller' : 'users'}/login`} className="text-blue-600">
                این قسمت
              </Link>
              &nbsp;
              وارد شوید
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}