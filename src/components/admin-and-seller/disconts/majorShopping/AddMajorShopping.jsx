'use client'
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromServer } from '../../redux/reducers/discounts/festivals';
import { addFestivalToServer } from '../../redux/globalAsyncThunks';
import { setError } from '../../redux/reducers/global';


export default function AddMajorShopping() {
    const dispatch = useDispatch();
    const initialData = {
        isSubmitting: false,
        formData: {
            name: '',
            productId: '',
            offPercentage: '',
            until: '',
        }
    }
    const [AddNewData, setAddNewData] = useState(initialData)
    const { products } = useSelector((state) => state.festivals);
    const { error } = useSelector((state) => state.global);

    useEffect(() => { dispatch(getProductsFromServer()) }, [dispatch])

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'offPercentage' || name === 'until') {
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
    const handleProductId = id => setAddNewData(prevProps => {
        return {
            ...prevProps,
            formData: {
                ...prevProps.formData,
                productId: id
            }
        }
    })

    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));

        if (AddNewData.formData.name === '') {
            toast.error('انتخاب محصول ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.offPercentage === '' || AddNewData.formData.offPercentage === 0) {
            toast.error('درصد تخفیف را وارد کنید')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.until === '' || AddNewData.formData.until === 0) {
            toast.error('تعداد روزها را وارد کنید')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else {
            try {
                //set day 
                const date = new Date()
                date.setHours(0)
                date.setMinutes(0)
                date.setSeconds(0)
                date.setMilliseconds(0)
                date.setDate(date.getDate() + AddNewData.formData.until)

                const obj = {
                    name: AddNewData.formData.name,
                    productId: AddNewData.formData.productId,
                    offPercentage: AddNewData.formData.offPercentage,
                    until: date.getTime()
                };

                //make a request
                dispatch(addFestivalToServer(obj))

                setTimeout(() => {
                    dispatch(setError(''))
                }, 2000);

                setAddNewData(initialData);
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

                    {
                        products.length !== 0 ?
                            <Grid item xs={12} lg={6} className="mt-2 relative">
                                <div className='w-full text-start text-sm'>
                                    <label htmlFor="underline_select_subcategory">محصولات من</label>
                                </div>
                                <select id="underline_select_subcategory" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" onChange={handleChange} name='name'>
                                    <option defaultValue={''}>محصول مورد نظر را انتخاب کنید &#11167;</option>
                                    {
                                        products.map(product => {
                                            return <option key={product._id} onClick={() => handleProductId(product._id)} value={product?.name} className='text-black'>{product?.name}</option>
                                        })
                                    }
                                </select>
                            </Grid>
                            :
                            <div>
                                لطفا صبر کنید ...
                            </div>
                    }

                    <Grid item xs={12} lg={6}>

                        <div className='text-start text-sm mb-1'>
                            درصد تخفیف
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="offPercentage"
                            value={AddNewData.formData.offPercentage}
                            placeholder={`درصد تخفیف را وارد کنید`}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12} lg={6} className='place-content-center'>
                        <div className='text-start text-sm mb-1'>
                            چند روز بعد غیر فعال شود؟
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="until"
                            value={AddNewData.formData.until}
                            placeholder={`تعداد روز را وارد کنید`}
                            onChange={handleChange}
                        />

                    </Grid>


                    <Grid item xs={12} lg={6} className='place-content-center text-red-500'>
                        {
                            error === 'You are not authorized!' ?
                                <>
                                    توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید
                                </>
                                :
                                error == "this product already exists in the festival!" ?
                                    <>
                                        این محصول در جشنواره حضور دارد!
                                    </>
                                    :
                                    error?.length > 0 &&
                                    <>
                                        مشکلی رخ داده است!
                                    </>
                        }
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