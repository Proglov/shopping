'use client'
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Chip, Grid, MenuItem, Select, Stack } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromServer } from '../../redux/reducers/discounts/companyCouponForSomeProducts';
import { addCompanyCouponForSomeProductsToServer } from '../../redux/globalAsyncThunks';
import { setError } from '../../redux/reducers/global';
import { GradientCircularProgress } from '@/app/loading';
import { price2Farsi } from '@/utils/funcs';

const initialData = {
    names: [],
    productsIds: [],
    offPercentage: '',
    min: '',
    max: '',
    count: '',
};

const addOrRemoveFromArray = (arr, val) => {
    const newArray = [...arr]
    const index = newArray.findIndex(current => current === val)
    if (index < 0) newArray.push(val)
    else newArray.splice(index, 1)
    return newArray
}

export default function AddCompanyCouponForSomeProducts({ which }) {
    const dispatch = useDispatch();
    const [AddNewData, setAddNewData] = useState(initialData);
    const { products } = useSelector((state) => state.companyCouponForSomeProducts);
    const { error, addDataLoading } = useSelector((state) => state.global);

    useEffect(() => { dispatch(getProductsFromServer(which)) }, [dispatch]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'names') {
            setAddNewData(prevProps => ({
                ...prevProps,
                names: typeof value === 'string' ? value.split(',') : value, // Manage array
            }));
        } else {
            const newValue = parseInt(value) || 0;
            setAddNewData(prevProps => ({
                ...prevProps,
                [name]: newValue,
            }));
        }
    };

    const errorObj = {
        'You are not authorized!': 'توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید',
        "this product already exists in the companyCouponForSomeProducts!": 'این محصول در جشنواره حضور دارد'
    };

    useEffect(() => {
        if (error?.length > 0) {
            toast.error(errorObj[error] || 'مشکلی رخ داده است');
            dispatch(setError(''));
        }
    }, [error]);

    const handleProductId = id => setAddNewData(prevProps => {
        return {
            ...prevProps,
            productsIds: addOrRemoveFromArray(prevProps.productsIds, id)
        }
    })

    const onSubmitForm = async () => {
        const { names, offPercentage, count, max } = AddNewData;

        if (names.length === 0) {
            toast.error('انتخاب حداقل یک محصول ضروری میباشد');
        } else if (offPercentage === '' || offPercentage === 0 || offPercentage > 100) {
            toast.error('درصد تخفیف را وارد کنید');
        } else if (count === '' || count === 0) {
            toast.error('تعداد نفرات را وارد کنید');
        } else if (max === '' || max === 0) {
            toast.error('سقف تخفیف را وارد کنید');
        } else {
            try {
                const obj = {
                    productsIds: AddNewData.productsIds,
                    offPercentage: offPercentage,
                    remainingCount: count,
                    maxOffPrice: max,
                    minBuy: AddNewData.min || 0
                };
                dispatch(addCompanyCouponForSomeProductsToServer(obj));
                setAddNewData(initialData);
            } catch (err) {
                toast.error(err);
            }
        }
    };

    return (
        <div className="mt-5">
            {
                products.length === 0 ?
                    (<GradientCircularProgress />)
                    :
                    <FormControl className="w-full">
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <div className='text-start text-sm mb-1'>
                                    محصولات خود را انتخاب کنید
                                </div>
                                <Select
                                    fullWidth
                                    multiple
                                    value={AddNewData.names}
                                    onChange={handleChange}
                                    name='names'
                                    renderValue={(selected) => (
                                        <Stack gap={1} direction="row" flexWrap="wrap">
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Stack>
                                    )}
                                >
                                    {
                                        products.map(product => (
                                            <MenuItem key={product._id} value={product.name} onClick={() => handleProductId(product._id)}>{product.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <div className='text-start text-sm mb-1'>
                                    درصد تخفیف
                                </div>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    name="offPercentage"
                                    value={AddNewData.offPercentage}
                                    placeholder={`درصد تخفیف را وارد کنید`}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <div className='text-start text-sm mb-1'>
                                    حداقل خرید (تومان)
                                </div>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    name="min"
                                    value={AddNewData.min}
                                    placeholder={`حداقل خرید میتواند صفر باشد`}
                                    onChange={handleChange}
                                />
                                {AddNewData.min && (
                                    <div className='text-sm text-start text-gray-600'>
                                        {price2Farsi(AddNewData.min)} تومان
                                    </div>
                                )}
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <div className='text-start text-sm mb-1'>
                                    سقف تخفیف (تومان)
                                </div>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    name="max"
                                    value={AddNewData.max}
                                    placeholder={`سقف تخفیف را وارد کنید`}
                                    onChange={handleChange}
                                />
                                {AddNewData.max && (
                                    <div className='text-sm text-start text-gray-600'>
                                        {price2Farsi(AddNewData.max)} تومان
                                    </div>
                                )}
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <div className='text-start text-sm mb-1'>
                                    تعداد نفرات
                                </div>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    name="count"
                                    value={AddNewData.count}
                                    placeholder={`تعداد نفرات مجاز برای استفاده از تخفیف را وارد کنید`}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} lg={6} className='place-content-center text-red-500'>
                                {addDataLoading && <GradientCircularProgress />}
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant='contained'
                                    className='mt-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded'
                                    type="submit"
                                    disabled={addDataLoading}
                                    onClick={onSubmitForm}
                                >
                                    ارسال
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
            }

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