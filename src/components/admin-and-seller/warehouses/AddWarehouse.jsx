'use client'
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { addWarehouseToServer } from '../redux/globalAsyncThunks';
import { getProvincesFromServer } from '../redux/reducers/warehouses';


export default function AddWarehouse() {
    const dispatch = useDispatch();
    const {
        provinces
    } = useSelector((state) => state.warehouses);
    const [uploadRes, setUploadRes] = useState([]);

    // you should use addDataLoading instead of isSubmitting!
    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        formData: {
            name: '',
            province: '',
            city: '',
            completeAddress: '',
            coveredCities: [],
        }
    })

    useEffect(() => {
        dispatch(getProvincesFromServer())
    }, [dispatch])

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'price' || name === 'count') {
            const newValue = parseInt(value) || 0
            setAddNewData(prevProps => {
                if (newValue == value)
                    return {
                        ...prevProps,
                        formData: {
                            ...prevProps.formData,
                            [name]: newValue,
                        }
                    }
                return {
                    ...prevProps
                }
            })
        } else {
            setAddNewData(prevProps => {
                return {
                    ...prevProps,
                    formData: {
                        ...prevProps.formData,
                        [name]: DOMPurify.sanitize(value),
                    }
                }
            })
        }
    };

    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));

        if (AddNewData.formData.name === '') {
            toast.error('عنوان محصول ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.price == 0 || AddNewData.formData.price == '') {
            toast.error('قیمت محصول ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.count == 0 || AddNewData.formData.count == '') {
            toast.error('تعداد محصولات ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.province === '') {
            toast.error('استان محصول ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.city === '') {
            toast.error('شهر محصول ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else {
            try {
                // set the cityId
                let cityId = '';
                let flag = true;
                let i = 0;
                while (flag) {
                    provinces[i].cities.find(city => {
                        if (city.cityName === AddNewData?.formData.city) {
                            cityId = city.cityId
                            flag = false;
                            return true
                        }
                        return false
                    })
                    i++;
                }

                // build up the object
                const obj = {
                    name: AddNewData.formData.name,
                    price: AddNewData.formData.price,
                    desc: AddNewData.formData.desc,
                    count: AddNewData.formData.count,
                    cityId,
                    imagesUrl: uploadRes
                };

                //make a request
                const res = dispatch(addWarehouseToServer(obj))

                setAddNewData(prevProps => ({
                    ...prevProps,
                    formData: {
                        name: '',
                        price: '',
                        count: '',
                        province: '',
                        desc: '',
                        city: '',
                        imagesUrl: []
                    },
                    isSubmitting: false
                }));
                if (res?.message === 'You are not authorized!')
                    throw ("توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید")
                toast.success('با موفقیت ارسال شد!')
                setFileStates([]);
                setUploadRes([]);
            } catch (err) {
                setAddNewData(prevProps => ({
                    ...prevProps,
                    isSubmitting: false
                }));
                toast.error(err)
            }
        }

    };

    return (
        <div className="mt-5">
            <FormControl className="w-full">
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            نام انبار
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="name"
                            value={AddNewData.formData.name}
                            placeholder={'برای انبار یک نام انتخاب کنید'}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                        <div className='w-full text-start text-sm'>
                            <label htmlFor="underline_select_province">استان</label>
                        </div>
                        <select id="underline_select_province" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" value={AddNewData.formData.province} onChange={handleChange} name='province'>
                            <option value='' disabled>استان را انتخاب کنید &#11167;</option>
                            {
                                provinces.map((provinceObj, index) => <option key={index} value={provinceObj?.provinceName} className='text-black'>{provinceObj?.provinceName}</option>)
                            }
                        </select>
                    </Grid>

                    {
                        !!AddNewData?.formData?.province &&
                        <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                            <div className='w-full text-start text-sm'>
                                <label htmlFor="underline_select_city">شهر</label>
                            </div>
                            <select id="underline_select_city" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" onChange={handleChange} value={AddNewData.formData.city} name='city'>
                                <option value='' disabled>شهر را انتخاب کنید &#11167;</option>
                                {
                                    provinces.map(provinceObj => {
                                        if (provinceObj?.provinceName === AddNewData?.formData?.province) {
                                            return provinceObj?.cities.map((sub, i) => <option key={i} value={sub?.cityName} className='text-black'>{sub?.cityName}</option>)
                                        } else return <></>
                                    })
                                }
                            </select>
                        </Grid>
                    }

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            آدرس کامل
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-completeAddress"
                            type="text"
                            name="completeAddress"
                            value={AddNewData.formData.completeAddress}
                            placeholder={'آدرس کامل را وارد کنید'}
                            onChange={handleChange}
                        />
                    </Grid>

                    شهرهایی که از این انبار میتوانید محصول ارسال کنید
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            className='mt-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded'
                            type="submit"
                            disabled={AddNewData.isSubmitting}
                            onClick={onSubmitForm}
                        >
                            ارسال
                        </Button>
                    </Grid>
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
