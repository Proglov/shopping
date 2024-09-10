'use client'
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { addUserInPersonToServer } from '../redux/globalAsyncThunks';
import { isPhoneValid } from '@/utils/funcs';
import { getProductsFromServer, getUserInPersonsFromServer } from '../redux/reducers/transactionInPersons';


export default function AddTransactionInPerson({ which }) {
    const dispatch = useDispatch();
    const {
        products,
        userInPersons
    } = useSelector((state) => state.transactionInPersons);

    // you should use addDataLoading instead of isSubmitting!
    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        formData: {
            userInPersonId: '',
            products: []
        }
    })

    useEffect(() => {
        dispatch(getProductsFromServer(which))
        dispatch(getUserInPersonsFromServer(which))
    }, [])

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

    const addProductHandler = id => {
        setAddNewData(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                products: [
                    ...prev.formData.products,

                ]
            }
        }))
    }

    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));

        if (AddNewData.formData.name === '') {
            toast.error('نام مشتری ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!isPhoneValid(AddNewData.formData.phone)) {
            toast.error('شماره همراه صحیح نمیباشد. نمونه شماره صحیح: 09123456789')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else {
            try {

                // build up the object
                const obj = {
                    name: AddNewData.formData.name,
                    phone: AddNewData.formData.phone
                };

                //make a request
                const res = dispatch(addUserInPersonToServer(obj))

                setAddNewData(prevProps => ({
                    ...prevProps,
                    formData: {
                        name: '',
                        phone: ''
                    },
                    isSubmitting: false
                }));
                if (res?.message === 'You are not authorized!')
                    throw ("توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید")
                toast.success('با موفقیت ارسال شد!')
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
                        userInPersons?.length > 0 ?
                            <Grid item xs={12} lg={6} className="mt-2 relative">
                                <div className='w-full text-start text-sm'>
                                    <label htmlFor="underline_select">
                                        مشتری
                                        (از بخش &lsquo;مشتریان حضوری&lsquo; اقدام به ثبت مشتریان خود کنید)
                                    </label>
                                </div>
                                <select id="underline_select" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" onChange={handleChange} name='userInPersonId' defaultValue={''}>
                                    <option defaultValue>مشتری را انتخاب کنید &#11167;</option>
                                    {
                                        userInPersons.map((user, index) => <option key={index} value={user?.name} className='text-black'>{user?.name}</option>)
                                    }
                                </select>
                            </Grid>
                            :
                            <div className='text-center w-full'>
                                کمی منتظر بمانید ...
                            </div>
                    }

                    {
                        products?.length > 0 ?
                            <Grid item xs={12} lg={6} className="mt-2 relative">
                                <div className='w-full text-start text-sm'>
                                    <label htmlFor="underline_select">
                                        کالا
                                    </label>
                                </div>
                                <select id="underline_select" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" defaultValue={''}>
                                    <option defaultValue>کالا را انتخاب کنید &#11167;</option>
                                    {
                                        products.map((product, index) => <option key={index} value={product?.name} onClick={() => { }} className='text-black'>{product?.name}</option>)
                                    }
                                </select>
                            </Grid>
                            :
                            <div className='text-center w-full'>
                                کمی منتظر بمانید ...
                            </div>
                    }

                    {
                        AddNewData.formData.products.map((product) => (
                            <Grid key={product?._id} item xs={12} md={4}>
                                {product?.name}
                            </Grid>
                        ))
                    }

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
