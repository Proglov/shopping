'use client'
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { addCityToServer } from '../redux/globalAsyncThunks';


export default function AddCity() {
    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        formData: {
            name: '',
            province: ''
        }
    })
    const {
        provinces,
    } = useSelector((state) => state.cities);
    const dispatch = useDispatch();

    const handleChange = (event) => {
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


    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));
        if (!AddNewData.formData.name) {
            toast.error('نام شهر ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!AddNewData.formData.province || AddNewData.formData.province === "استان را انتخاب کنید ⮟") {
            toast.error('استان محصول ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else {
            try {
                const obj = {
                    name: '',
                    provinceId: ''
                };
                obj.name = AddNewData.formData.name
                let catId = '';
                for (const cat of provinces) {
                    if (cat.name === AddNewData.formData.province) {
                        catId = cat._id;
                        break
                    }
                }
                obj.provinceId = catId
                const res = dispatch(addCityToServer(obj))
                if (res?.message === 'You are not authorized!')
                    throw ("توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید")
                toast.success('با موفقیت ارسال شد!')
            } catch (err) {
                toast.error(err)
            } finally {
                setAddNewData(prevProps => ({
                    ...prevProps,
                    isSubmitting: false,
                    formData: {
                        name: '',
                        province: ''
                    }
                }));
            }
        }

    };

    return (
        <div className="mt-5">
            <FormControl className="w-full">
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            نام
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="name"
                            value={AddNewData.formData.name}
                            placeholder={`نام شهر را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                        <div className='w-full text-start text-sm'>
                            <label htmlFor="underline_select">استان</label>
                        </div>
                        <select id="underline_select" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" onChange={handleChange} name='province' defaultValue={''}>
                            <option defaultValue>استان را انتخاب کنید &#11167;</option>
                            {
                                provinces.map((province, index) => <option key={index} value={province?.name} className='text-black'>{province?.name}</option>)
                            }
                        </select>
                    </Grid>

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
