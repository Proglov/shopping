"use client";
import { Box, Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import UserApi from "@/services/withoutAuthActivities/user";
import SellerApi from "@/services/withoutAuthActivities/seller";
import CityApi from "@/services/withoutAuthActivities/city";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";
import { isEmailValid, isPhoneValid, isWorkingPhoneValid } from "@/utils/funcs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SetLogin } from "@/store/login";
import { useDispatch } from "react-redux";

const CustomTextField = ({ localVars, inputName, label, inputRef, focusNum, isLastElement }) => {
  const { formData, submit, showPassword, setShowPassword, showRepeatPassword, setShowRepeatPassword, handleChange, setFocus, whichFocused } = localVars

  let type = 'text', inputProps = {}
  if (inputName === 'password') {
    if (!showPassword) type = 'password'

    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => { setShowPassword(prev => !prev) }}
            onMouseDown={() => { setShowPassword(prev => !prev) }}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }
  } else if (inputName === 'repeatPassword') {
    if (!showRepeatPassword) type = 'password'

    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => { setShowRepeatPassword(prev => !prev) }}
            onMouseDown={() => { setShowRepeatPassword(prev => !prev) }}
          >
            {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }
  }

  return (
    <>
      <TextField
        color={formData[(inputName + 'Error')].length > 0 ? 'error' : 'primary'}
        value={formData[inputName]}
        fullWidth
        label={label}
        name={inputName}
        onClick={() => setFocus(focusNum)}
        focused={whichFocused === focusNum}
        inputRef={inputRef}
        type={type}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setFocus(focusNum + 1)
            if (!!isLastElement) submit()
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
        InputProps={inputProps}
      />

      {!!formData[(inputName + 'Error')] && (
        <Box className='mb-2'>
          <div className="text-red-600">
            {formData[(inputName + 'Error')]}
          </div>

          {
            (inputName === 'phone' && formData.phoneError !== ' ') &&
            <div className="text-gray-400 text-sm">
              نمونه  ی شماره صحیح: 09123456789
            </div>
          }

          {
            (inputName === 'workingPhone' && formData.workingPhoneError !== ' ') &&
            <div className="text-gray-400 text-sm">
              نمونه  ی شماره صحیح: 02198765432
            </div>
          }
        </Box>
      )}
    </>
  )
};

export default function SignUpComponent({ type }) {
  const { signUp } = UserApi;
  const { sellerSignUp } = SellerApi;
  const { getAllCities } = CityApi
  const dispatch = useDispatch()

  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]


  let initialState = {
    phone: "",
    username: "",
    password: "",
    repeatPassword: "",
    phoneError: "",
    usernameError: "",
    passwordError: "",
    repeatPasswordError: ""
  }

  if (type === 'seller')
    initialState = {
      ...initialState,
      name: "",
      storeName: "",
      email: "",
      workingPhone: "",
      address: "",
      bio: "",
      nameError: "",
      storeNameError: "",
      emailError: "",
      workingPhoneError: "",
      addressError: "",
      bioError: "",
    }

  const [formData, setFormData] = useState(initialState);
  const [whichFocused, setWhichFocused] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [address, setAddress] = useState({
    province: {
      id: '',
      name: ''
    },
    city: {
      id: '',
      name: ''
    }
  })

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getAllCities()
      const allProvinces = response.cities.reduce((acc, curr) => {
        const existingProvince = acc.find(item => item.provinceId === curr.provinceId._id);

        if (existingProvince) {
          existingProvince.cities.push({
            cityId: curr._id,
            cityName: curr.name
          });
        } else {
          acc.push({
            provinceId: curr.provinceId._id,
            provinceName: curr.provinceId.name,
            cities: [{
              cityId: curr._id,
              cityName: curr.name
            }]
          });
        }

        return acc;
      }, []);
      setProvinces(allProvinces)
    }
    const func = () => {
      if (type === 'seller')
        fetchCities()
    }
    func()
  }, [type])

  const provinceAndCityHandler = (field, provinceOrCity) => {
    if (field === 'city')
      setAddress(prevProps => {
        return {
          ...prevProps,
          city: { id: provinceOrCity[field + 'Id'], name: provinceOrCity[field + 'Name'] }
        }
      })
    else setAddress(prevProps => {
      return {
        ...prevProps,
        province: { id: provinceOrCity[field + 'Id'], name: provinceOrCity[field + 'Name'] },
        city: { id: provinceOrCity.cities[0].cityId, name: provinceOrCity.cities[0].cityName }
      }
    })
  }

  // Keep track of inputs
  const setFocus = (num) => {
    if (num >= 0 && num < refs.length) {
      refs.forEach(ref => ref.current?.blur());
      refs[num].current?.focus();
    }
    setWhichFocused(num);
  };

  const handleChange = (event) => {
    const { value, name } = event.target

    if (name === "phone") {
      let input = value.replace(/\D/g, "").slice(0, 11);
      setFormData(prev => ({
        ...prev,
        phone: input,
        phoneError: ''
      }))
    } else if (name === 'workingPhone') {
      let input = value.replace(/\D/g, "").slice(0, 12);
      setFormData(prev => ({
        ...prev,
        workingPhone: input,
        workingPhoneError: ''
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        [(name + 'Error')]: ''
      }))
    }
  }

  const submit = async () => {
    setWhichFocused(-1)
    if (type === 'seller') {
      if (!formData.name) {
        setFocus(4)
        setFormData(prev => ({
          ...prev,
          nameError: 'نام و نام خانوادگی الزامی میباشد'
        }))
        return;
      } else if (!formData.storeName) {
        setFocus(5)
        setFormData(prev => ({
          ...prev,
          storeNameError: 'نام فروشگاه الزامی میباشد'
        }))
        return;
      } else if (!isEmailValid(formData.email)) {
        setFocus(6)
        setFormData(prev => ({
          ...prev,
          emailError: 'ایمیل معتبر نیست'
        }))
        return;
      } else if (!isWorkingPhoneValid(formData.workingPhone)) {
        setFocus(7)
        setFormData(prev => ({
          ...prev,
          workingPhoneError: 'تلفن فروشگاه معتبر نیست'
        }))
        return;
      } else if (formData.address.length < 10) {
        setFocus(8)
        setFormData(prev => ({
          ...prev,
          addressError: 'آدرس خود را کامل وارد کنید'
        }))
        return;
      } else if (!address.city.id) {
        toast.error("شهر و استان ضروریست", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      } else if (formData.bio.length < 10) {
        setFocus(9)
        setFormData(prev => ({
          ...prev,
          bioError: 'کمی راجع به فروشگاهتان بنویسید'
        }))
        return;
      }
    }
    if (!isPhoneValid(formData.phone)) {
      setFocus(0)
      setFormData(prev => ({
        ...prev,
        phoneError: 'شماره موبایل به درستی وارد نشده است!'
      }))
    } else if (formData.username.length < 8) {
      setFocus(1)
      setFormData(prev => ({
        ...prev,
        usernameError: 'نام کاربری حداقل شامل هشت کاراکتر است!'
      }))
    } else if (formData.password.length < 8) {
      setFocus(2)
      setFormData(prev => ({
        ...prev,
        passwordError: 'رمزعبور حداقل شامل هشت کاراکتر است!'
      }))
    } else if (formData.repeatPassword.length < 8 || formData.password !== formData.repeatPassword) {
      setFocus(3)
      setFormData(prev => ({
        ...prev,
        repeatPasswordError: 'رمزعبور با تکرار آن مطابقت ندارد!'
      }))
    } else {
      try {
        const obj = {};
        const keys = Object.keys(formData)
        keys.map(key => {
          if (!key.endsWith('Error') && key !== 'repeatPassword') {
            obj[key] = DOMPurify.sanitize(formData[key])
          }
        })
        let response;

        if (type === 'seller') {
          const augmentedObj = {
            ...obj,
            officeAddress: {
              cityId: address.city.id,
              completeAddress: obj.address
            }
          }
          delete augmentedObj.address
          response = await sellerSignUp(augmentedObj);
          dispatch(SetLogin({ status: 'seller', token: response.token }))
        } else {
          response = await signUp(obj);
          dispatch(SetLogin({ status: 'user', token: response.token }))
        }

        toast.success("ثبت نام شما موفقیت آمیز بود", {
          position: toast.POSITION.TOP_RIGHT,
        });

        window.location.replace('/')
      } catch (error) {
        dispatch(SetLogin({ status: '', token: null }))

        const setError = name => {
          setFormData(prev => ({
            ...prev,
            [(name + 'Error')]: ' '
          }))
        }

        const { message } = error.response.data;

        switch (message) {
          case "phone number is invalid!":
            setFocus(0);
            setError('phone')
            toast.error("شماره تلفن نامعتبر است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "Phone Already Exists":
          case "this phone number already exists!":
            setFocus(0);
            setError('phone')
            toast.error("این شماره قبلا ثبت نام شده است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "Phone Already Exists In Users":
            setFocus(0);
            setError('phone')
            toast.error("شماره تلفن قبلا به عنوان مشتری ثبت شده است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "username is not valid":
            setFocus(1)
            setError('username')
            toast.error("نام کاربری نامعتبر است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "username Already Exists":
          case "Username Already Exists":
            setFocus(1)
            setError('username')
            toast.error("این نام کاربری قبلا ثبت نام شده است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setFormData(prev => ({
              ...prev,
              usernameError: ' '
            }))
            break;
          case "Password Should have more than 8 characters":
            setFocus(2)
            setError('password')
            toast.error("رمز عبور باید حداقل شامل هشت کارکتر باشد", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "name is not valid":
            setFocus(4)
            setError('name')
            toast.error("نام و نام خانوادگی نامعتبر است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "storeName is not valid":
            setFocus(5)
            setError('storeName')
            toast.error("نام فروشگاه نامعتبر است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "email is not valid":
            setFocus(6)
            setError('email')
            toast.error("ایمیل نامعتبر است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "working phone number is invalid!":
            setFocus(7);
            setError('workingPhone')
            toast.error("تلفن فروشگاه نامعتبر است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "Working Phone Already Exists":
            setFocus(7);
            setError('workingPhone')
            toast.error("شماره تلفن فروشگاه قبلا ثبت شده است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "address is not valid":
            setFocus(8);
            setError('address')
            toast.error("آدرس نامعتبر است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case "bio is not valid":
            setFocus(9);
            setError('bio')
            toast.error("معرفی فروشگاه کوتاه است", {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            console.log(error);
            break;
        }
      }
    }
  };

  const passLocalVarsToGlobal = {
    formData,
    handleChange,
    setFocus,
    whichFocused,
    submit,
    showPassword,
    setShowPassword,
    showRepeatPassword,
    setShowRepeatPassword,
  }

  return (
    <Box component="div" className="grid place-items-center w-full">
      <Box
        component="div"
        className="w-full max-w-xl my-10 p-10 border border-slate-300 bg-white rounded-lg"
      >
        <Box className="mb-6 text-2xl text-center" component="div">
          فروشگاه آنلاین
        </Box>
        <Box className="mb-6 text-xl" component="div">
          ثبت نام
          {" "}
          {
            type === 'seller' ?
              "فروشندگان"
              :
              "کاربران"
          }
        </Box>
        <Box className="mb-6 text-sm sm:text-base" component="div">
          لطفا اطلاعات خواسته شده را وارد کنید
        </Box>

        <Box className="mb-4 grid grid-cols-1 gap-2.5">

          <CustomTextField
            localVars={passLocalVarsToGlobal}
            focusNum={0}
            inputName='phone'
            inputRef={refs[0]}
            label='شماره همراه'
          />

          <CustomTextField
            localVars={passLocalVarsToGlobal}
            focusNum={1}
            inputName='username'
            inputRef={refs[1]}
            label="نام کاربری"
          />

          <CustomTextField
            localVars={passLocalVarsToGlobal}
            focusNum={2}
            inputName='password'
            inputRef={refs[2]}
            label="رمز عبور"
          />

          <CustomTextField
            localVars={passLocalVarsToGlobal}
            focusNum={3}
            inputName="repeatPassword"
            inputRef={refs[3]}
            label="تکرار رمز عبور"
            isLastElement={type === 'user'}
          />


          {
            type === 'seller' &&
            <>
              <CustomTextField
                localVars={passLocalVarsToGlobal}
                focusNum={4}
                inputName='name'
                inputRef={refs[4]}
                label="نام و نام خانوادگی"
              />

              <CustomTextField
                localVars={passLocalVarsToGlobal}
                focusNum={5}
                inputName='storeName'
                inputRef={refs[5]}
                label="نام فروشگاه"
              />

              <CustomTextField
                localVars={passLocalVarsToGlobal}
                focusNum={6}
                inputName='email'
                inputRef={refs[6]}
                label="ایمیل"
              />

              <CustomTextField
                localVars={passLocalVarsToGlobal}
                focusNum={7}
                inputName='workingPhone'
                inputRef={refs[7]}
                label="تلفن فروشگاه"
              />

              <Grid container gap={.5}>

                <Grid item xs={12} sm={!!address?.province.id ? 6 : 12} className="mt-2 relative">
                  <div className='w-full text-start text-sm'>
                    <label htmlFor="underline_select_province">استان دفتر کار</label>
                  </div>

                  <select
                    id="underline_select_province"
                    className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
                    value={address.province.name}
                    onChange={(e) => {
                      const selectedProvince = provinces.find(province => province.provinceName === e.target.value);
                      provinceAndCityHandler('province', selectedProvince);
                    }}
                    name='province'
                  >
                    <option value='' disabled>استان را انتخاب کنید &#11167;</option>
                    {provinces.map(provinceObj => (
                      <option key={provinceObj.provinceId} value={provinceObj.provinceName}>
                        {provinceObj.provinceName}
                      </option>
                    ))}
                  </select>
                </Grid>

                {
                  !!address?.province.id &&
                  <Grid item xs={12} sm={5.9} className="mt-2 relative">
                    <div className='w-full text-start text-sm'>
                      <label htmlFor="underline_select_city">شهر دفتر کار</label>
                    </div>
                    <select
                      id="underline_select_city"
                      className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
                      value={address.city.name}
                      onChange={(e) => {
                        const selectedCity = provinces.find(province => province.provinceName === address.province.name)
                          ?.cities.find(city => city.cityName === e.target.value);
                        provinceAndCityHandler('city', selectedCity);
                      }}
                      name='city'
                    >
                      <option value='' disabled>شهر را انتخاب کنید &#11167;</option>
                      {provinces
                        .filter(provinceObj => provinceObj.provinceName === address.province.name)
                        .flatMap(provinceObj =>
                          provinceObj.cities.map(cityObj => (
                            <option key={cityObj.cityId} value={cityObj.cityName}>
                              {cityObj.cityName}
                            </option>
                          ))
                        )}
                    </select>
                  </Grid>
                }
              </Grid>

              <CustomTextField
                localVars={passLocalVarsToGlobal}
                focusNum={8}
                inputName='address'
                inputRef={refs[8]}
                label="آدرس کامل دفتر کار"
              />

              <CustomTextField
                localVars={passLocalVarsToGlobal}
                focusNum={9}
                inputName='bio'
                inputRef={refs[9]}
                label="معرفی فروشگاه"
                isLastElement={true}
              />
            </>
          }

        </Box>

        <Button
          variant="contained"
          className="bg-green-500 hover:bg-green-600 text-xl rounded-lg w-full mt-10"
          onClick={submit}
        >
          ثبت نام
        </Button>
        <Box component="div" className="mt-5">
          اگر قبلا ثبت نام کرده اید
          <Link href={`/${type === 'seller' ? 'Seller' : 'users'}/login`}>
            <span className="text-blue-600"> از اینجا وارد </span>
          </Link>
          شوید !
        </Box>
        <Box className="text-xs mt-5 text-center" component="div">
          ثبت نام شما به معنای پذیرش{" "}
          <Link href="">
            <span className="text-blue-600"> شرایط سایت </span>
          </Link>{" "}
          و
          <Link href="">
            <span className="text-blue-600"> قوانین حریم‌ خصوصی </span>
          </Link>
          است.
        </Box>
      </Box>
    </Box>
  );
}