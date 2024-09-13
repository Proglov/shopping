'use client'
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { addTransactionInPersonToServer } from '../redux/globalAsyncThunks';
import { getProductsFromServer, getUserInPersonsFromServer } from '../redux/reducers/transactionInPersons';


export default function AddTransactionInPerson({ which }) {
    const dispatch = useDispatch();
    const {
        products,
        userInPersons
    } = useSelector((state) => state.transactionInPersons);

    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        formData: {
            userInPersonName: '',
            products: []
        }
    });

    const [userId, setUserId] = useState('')

    useEffect(() => {
        dispatch(getProductsFromServer(which));
        dispatch(getUserInPersonsFromServer(which));
    }, [dispatch, which]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddNewData(prevProps => ({
            ...prevProps,
            formData: {
                ...prevProps.formData,
                [name]: DOMPurify.sanitize(value),
            }
        }));
    };

    const handleChangeProducts = (event, productId, field) => {
        const { value } = event.target;
        const newValue = parseInt(value) || 0
        if (field === 'off' && newValue > 100) return
        setAddNewData(prev => {
            if (newValue == value) {
                const updatedProducts = prev.formData.products.map(product =>
                    product.productId === productId
                        ? { ...product, [field]: DOMPurify.sanitize(newValue) }
                        : product
                );
                return {
                    ...prev,
                    formData: {
                        ...prev.formData,
                        products: updatedProducts,
                    }
                };
            }
            return {
                ...prev
            }
        })
    };

    const addProductHandler = product => {
        const productExists = AddNewData.formData.products.some(p => p.productId === product._id);
        if (productExists) {
            toast.error(`${product.name} قبلاً اضافه شده است`);
            return;
        }

        const newProduct = {
            productId: product._id,
            name: product.name,
            quantity: '',
            off: 0
        };

        setAddNewData(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                products: [...prev.formData.products, newProduct]
            }
        }));
    };

    const handleDeleteProduct = (productId) => {
        setAddNewData(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                products: prev.formData.products.filter(product => product.productId !== productId)
            }
        }));
    };

    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));

        if (AddNewData.formData.userInPersonName === '') {
            toast.error('نام مشتری ضروری میباشد');
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }));
            return;
        } else if (AddNewData.formData.products.length === 0) {
            toast.error('انتخاب محصول ضروری میباشد');
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }));
            return;
        }

        for (const product of AddNewData.formData.products) {
            if (product.quantity === '' || product.quantity === 0) {
                toast.error('تعداد هر محصول ضروری میباشد');
                setAddNewData(prevProps => ({
                    ...prevProps,
                    isSubmitting: false
                }));
                return;
            }
        }

        try {
            const obj = {
                userId,
                boughtProducts: AddNewData.formData.products,
            };

            const res = await dispatch(addTransactionInPersonToServer(obj)).unwrap();
            setAddNewData({
                isSubmitting: false,
                formData: {
                    userInPersonName: '',
                    products: []
                }
            });
            setUserId('')
            if (res?.message === 'You are not authorized!') {
                throw new Error("توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید");
            }
            toast.success('با موفقیت ارسال شد!');
        } catch (err) {
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }));
            toast.error(err.message || err);
        }
    };

    return (
        <div className="mt-5">
            <FormControl className="w-full">
                <Grid container spacing={2}>
                    {
                        userInPersons?.length > 0 ?
                            <Grid item xs={12} lg={6} className="mt-2 relative">
                                <label htmlFor="underline_select">
                                    مشتری (از بخش &lsquo;مشتریان حضوری&lsquo; اقدام به ثبت مشتریان خود کنید)
                                </label>
                                <select id="underline_select"
                                    className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
                                    onChange={handleChange}
                                    name='userInPersonName'
                                    value={AddNewData.formData.userInPersonName}>
                                    <option value='' disabled>مشتری را انتخاب کنید &#11167;</option>
                                    {
                                        userInPersons.map((user, index) =>
                                            <option key={index} value={user?.name} onClick={() => setUserId(user._id)} className='text-black'>{user?.name}</option>)
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
                                <label htmlFor="product_select">افزودن کالا</label>
                                <select id="product_select"
                                    className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
                                    defaultValue={''} value={'کالا را انتخاب کنید'}>
                                    <option defaultValue>کالا را انتخاب کنید &#11167;</option>
                                    {
                                        products.map((product, index) =>
                                            <option key={index}
                                                value={product?.name}
                                                onClick={() => addProductHandler(product)}
                                                className='text-black'>{product?.name}</option>)
                                    }
                                </select>
                            </Grid>
                            :
                            <div className='text-center w-full'>
                                کمی منتظر بمانید ...
                            </div>
                    }

                    <Grid container gap={1} className='mt-4'>
                        {
                            AddNewData.formData.products.map((product) => (
                                <React.Fragment key={product.productId}>
                                    <Grid item xs={12} sm={2} className='pt-2 flex sm:flex-col justify-center items-center'>
                                        {product?.name}
                                        <Button color='error' onClick={() => handleDeleteProduct(product.productId)}>حذف</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={4.5}>
                                        <div className='text-start text-sm mb-1'>تعداد</div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            name={`quantity${product.productId}`}
                                            value={product?.quantity}
                                            placeholder={`تعداد ${product.name} را وارد کنید`}
                                            onChange={(e) => handleChangeProducts(e, product.productId, 'quantity')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4.5}>
                                        <div className='text-start text-sm mb-1'>تخفیف</div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            name={`off${product.productId}`}
                                            value={product?.off}
                                            placeholder={`0`}
                                            onChange={(e) => handleChangeProducts(e, product.productId, 'off')}
                                        />
                                    </Grid>
                                </React.Fragment>
                            ))
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