'use client'
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from '@/services/withAuthActivities/seller';
import { GiCancel } from 'react-icons/gi';
import { BiSolidEditAlt } from 'react-icons/bi';
import { isPhoneValid, isWorkingPhoneValid, isEmailValid } from '@/utils/funcs';

const arraysHaveSameElements = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedArr1 = arr1.sort();
    const sortedArr2 = arr2.sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }

        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
            if (!arraysHaveSameElements(obj1[key], obj2[key])) {
                return false;
            }
        } else if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}


export default function ChangeProfile() {
    const { getMeSeller, sellerUpdate } = Api
    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        disabled: true,
        formData: {
            name: '',
            storeName: '',
            email: '',
            username: '',
            address: [''],
            newAddresses: [],
            workingPhone: '',
            phone: '',
            bio: '',
        },
        prevFormData: {}
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const seller = await getMeSeller();
                setAddNewData(prevProps => ({
                    ...prevProps,
                    formData: { ...prevProps.formData, ...seller?.seller },
                    prevFormData: { ...seller?.seller },
                }));
                setLoading(false)
            } catch (error) {
                toast.error(error)
            }
        }
        fetchMe()
    }, [getMeSeller])

    const handleChange = (event) => {
        if (AddNewData.disabled) return
        const { name, value } = event.target;
        setAddNewData(prevProps => {
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    [name]: DOMPurify.sanitize(value),
                }
            }
        })
    };

    const deleteAddress = (i) => {
        if (AddNewData.disabled) return
        setAddNewData(prevProps => {
            const newAddresses = prevProps.formData.address.filter((_v, index) => i !== index)
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    address: newAddresses
                }
            }
        });
    }

    const editDisabler = (truthy) => {
        if (truthy) {
            setAddNewData(prevProps => ({
                ...prevProps,
                disabled: truthy,
                formData: { ...prevProps.prevFormData, newAddresses: [] }
            }));
        } else {
            setAddNewData(prevProps => ({
                ...prevProps,
                disabled: truthy
            }));
        }

    }

    const addNewAddressEnabler = () => {
        setAddNewData(prevProps => {
            let adds = prevProps.formData.newAddresses || []
            adds.push('')
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    newAddresses: [...adds]
                }
            }
        });
    }

    const handleChangeNewAddress = (event, i) => {
        const { value } = event.target;
        setAddNewData(prevProps => {
            let newAddresses = prevProps.formData.newAddresses || []
            newAddresses[i] = DOMPurify.sanitize(value)
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    newAddresses
                }
            }
        })
    };

    const handleChangeAddresses = (event, i) => {
        if (AddNewData.disabled) return
        const { value } = event.target;
        setAddNewData(prevProps => {
            let address = [...prevProps.formData.address] || []
            address[i] = DOMPurify.sanitize(value)
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    address
                }
            }
        })
    };

    const deleteNewAddress = (i) => {
        setAddNewData(prevProps => {
            const newAdd = prevProps.formData.newAddresses.filter((_v, index) => i !== index)
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    newAddresses: newAdd
                }
            }
        });
    };

    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));

        if (!isWorkingPhoneValid(AddNewData.formData.workingPhone)) {
            toast.error('شماره محل کار صحیح نیست.نمونه صحیح 02101234567')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!isPhoneValid(AddNewData.formData.phone)) {
            toast.error('شماره همراه صحیح نیست. نمونه صحیح 09123456789')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.username?.length < 8) {
            toast.error('نام کاربری باید بیش از 8 کاراکتر باشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.address?.length + AddNewData.formData.newAddresses?.length === 0) {
            toast.error('آدرس ضروریست')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!AddNewData.formData.bio || AddNewData.formData.bio?.length < 8) {
            toast.error('توضیحات بیشتری راجع به فروشگاهتان بنویسید (حداقل 8 کاراکتر(')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!AddNewData.formData.storeName) {
            toast.error('نام فروشگاه ضروریست')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!AddNewData.formData.name) {
            toast.error('نام مدیریت ضروریست')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!isEmailValid(AddNewData.formData.email)) {
            toast.error('ایمیل وارد شده معتبر نیست')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else {
            try {
                const obj1 = {
                    address: [...AddNewData.formData.address, ...AddNewData.formData.newAddresses],
                    bio: AddNewData.formData.bio,
                    email: AddNewData.formData.email,
                    name: AddNewData.formData.name,
                    phone: AddNewData.formData.phone,
                    storeName: AddNewData.formData.storeName,
                    username: AddNewData.formData.username,
                    workingPhone: AddNewData.formData.workingPhone
                }
                const obj2 = {
                    address: [...AddNewData.prevFormData.address],
                    bio: AddNewData.prevFormData.bio,
                    email: AddNewData.prevFormData.email,
                    name: AddNewData.prevFormData.name,
                    phone: AddNewData.prevFormData.phone,
                    storeName: AddNewData.prevFormData.storeName,
                    username: AddNewData.prevFormData.username,
                    workingPhone: AddNewData.prevFormData.workingPhone
                }

                const compared = compareObjects(obj1, obj2)
                if (compared) {
                    toast.warn("هیچ تغییری در پروفایل یافت نشد")
                } else {
                    obj1.id = AddNewData.formData._id
                    const res = await sellerUpdate(obj1)
                    if (res?.message === 'You are not authorized!')
                        throw ("توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید")
                    toast.success('با موفقیت ارسال شد!')
                }
            } catch (error) {
                const { message } = error.response.data;

                switch (message) {
                    case "working phone Already Exists":
                        toast.error("تلفن محل کار قبلا ثبت شده")
                        break;
                    case "Phone Already Exists":
                    case "Phone Already Exists In Users":
                        toast.error("شماره همراه قبلا ثبت شده")
                        break;
                    case "Email Already Exists":
                    case "Email Already Exists In Users":
                        toast.error("ایمیل قبلا ثبت شده")
                        break;
                    case "username Already Exists":
                        toast.error("نام کاربری قبلا ثبت شده")
                        break;
                    default:
                        console.log("مشکلی رخ داد!");
                        break;
                }
            } finally {
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                setAddNewData(prevProps => ({
                    ...prevProps,
                    isSubmitting: false,
                    disabled: true
                }));
            }
        }
    };

    if (loading) return (
        <div>
            کمی صبر کنید ...
        </div>
    )
    return (
        <div>
            {
                AddNewData.disabled ?
                    <Button className='float-left m-2' onClick={() => editDisabler(false)}>
                        <span className='text-red-500'>ویرایش پروفایل</span>
                        <BiSolidEditAlt className='float-left mt-1 mr-1 text-red-400' />
                    </Button> :
                    <div className='float-left m-2 text-sm text-purple-500'>
                        تغییرات خود را اعمال کنید
                    </div>
            }

            <FormControl className="w-full">
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            نام و نام خانوادگی مدیر
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="name"
                            disabled={AddNewData.disabled}
                            value={AddNewData.formData.name}
                            placeholder={`نام و نام خانوادگی مدیریت فروشگاه را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            نام فروشگاه
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-store-name"
                            type="text"
                            disabled={AddNewData.disabled}
                            name="storeName"
                            value={AddNewData.formData.storeName}
                            placeholder={`نام فروشگاه را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            ایمیل
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-email"
                            type="email"
                            name="email"
                            disabled={AddNewData.disabled}
                            value={AddNewData.formData.email}
                            placeholder={`ایمیل را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            نام کاربری
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-username"
                            type="text"
                            name="username"
                            value={AddNewData.formData.username}
                            disabled={AddNewData.disabled}
                            placeholder={`نام کاربری را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            تلفن فروشگاه
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-workingPhone"
                            type="text"
                            name="workingPhone"
                            value={AddNewData.formData.workingPhone}
                            disabled={AddNewData.disabled}
                            placeholder={`تلفن فروشگاه را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            تلفن همراه
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-phone"
                            type="text"
                            name="phone"
                            value={AddNewData.formData.phone}
                            disabled={AddNewData.disabled}
                            placeholder={`تلفن همراه را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} className='mt-2'>
                        <div className='text-start text-sm'>
                            آدرس (های) فروشگاه
                        </div>

                        <ul>
                            {
                                AddNewData?.formData?.address.map((ad, i) => {
                                    return (
                                        <li key={i} className='flex'>
                                            <input
                                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none m-2 focus:bg-white focus:border-purple-500"
                                                id={`inline-address${i}`}
                                                type="text"
                                                name={`address`}
                                                value={ad}
                                                disabled={AddNewData.disabled}
                                                placeholder={`آدرس جدید را وارد کنید`}
                                                onChange={e => handleChangeAddresses(e, i)}
                                            />
                                            <GiCancel className={`${!AddNewData.disabled ? 'text-red-500' : 'text-gray-500'} mt-5 hover:cursor-pointer`} onClick={() => deleteAddress(i)} />
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        <div>
                            {
                                AddNewData?.formData?.address.length + AddNewData?.formData?.newAddresses.length === 0 &&
                                <>
                                    آدرسی وارد نشده
                                </>
                            }
                        </div>

                        {
                            !!AddNewData.formData.newAddresses &&
                            <div>
                                {
                                    AddNewData.formData.newAddresses.map((_v, i) => {
                                        return (
                                            <div key={i} className='flex'>
                                                <input
                                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none m-2 focus:bg-white focus:border-purple-500"
                                                    id={`inline-address${i}`}
                                                    type="text"
                                                    name={`address${i}`}
                                                    value={AddNewData.formData.newAddresses[i]}
                                                    placeholder={`آدرس جدید را وارد کنید`}
                                                    onChange={e => handleChangeNewAddress(e, i)}
                                                    disabled={AddNewData.disabled}
                                                />
                                                <GiCancel className={`${!AddNewData.disabled ? 'text-red-500' : 'text-gray-500'} mt-5 hover:cursor-pointer`} onClick={() => deleteNewAddress(i)} />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        }
                        {
                            !AddNewData.disabled &&
                            <Button
                                variant='contained'
                                className='mt-2 mr-2 bg-green-500 hover:bg-green-500 text-white py-2 px-4 rounded'
                                type="button"
                                onClick={addNewAddressEnabler}
                            >
                                افزودن آدرس جدید
                            </Button>
                        }


                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            معرفی فروشگاه
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-bio"
                            type="text"
                            name="bio"
                            value={AddNewData.formData.bio}
                            disabled={AddNewData.disabled}
                            placeholder={`بیوگرافی خود را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>
                    {
                        !AddNewData.disabled &&
                        <Grid item xs={12}>
                            <Button
                                variant='outlined'
                                color='primary'
                                className='mt-2 rounded'
                                type="submit"
                                disabled={AddNewData.isSubmitting}
                                onClick={onSubmitForm}
                            >
                                ارسال
                            </Button>
                            <Button
                                variant='outlined'
                                color='error'
                                className='mt-2 mr-2 rounded'
                                type="button"
                                onClick={() => editDisabler(true)}
                            >
                                لغو
                            </Button>
                        </Grid>
                    }

                </Grid>

            </FormControl>
            <div className='w-full text-center'>
                {AddNewData.isSubmitting && <div className='text-green-700 bg-slate-200 mt-3 rounded-xl text-center'>
                    در حال ارسال ...
                </div>}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
