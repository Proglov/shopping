'use client'
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromServer } from '../../redux/reducers/discounts/majorShopping';
import { addMajorShoppingToServer } from '../../redux/globalAsyncThunks';
import { setError } from '../../redux/reducers/global';
import { GradientCircularProgress } from '@/app/loading';


export default function AddMajorShopping({ which }) {
    const dispatch = useDispatch();
    const initialData = {
        name: '',
        productId: '',
        offPercentage: '',
        quantity: '',
    }
    const [AddNewData, setAddNewData] = useState(initialData)
    const { products } = useSelector((state) => state.majorShoppings);
    const { error, addDataLoading } = useSelector((state) => state.global);

    useEffect(() => { dispatch(getProductsFromServer(which)) }, [dispatch])

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'offPercentage' || name === 'quantity') {
            const newValue = parseInt(value) || 0
            setAddNewData(prevProps => {
                if (newValue == value)
                    return {
                        ...prevProps,
                        [name]: newValue,
                    }
                return {
                    ...prevProps
                }
            })
        } else {
            setAddNewData(prevProps => {
                return {
                    ...prevProps,
                    [name]: DOMPurify.sanitize(value),
                }
            })
        }
    };
    const handleProductId = id => setAddNewData(prevProps => {
        return {
            ...prevProps,
            productId: id
        }
    })

    const errorObj = {
        'You are not authorized!': 'توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید',
        'this product already exists in the majorShopping!': 'این محصول در طرح محصولات عمده حضور دارد'
    }

    useEffect(() => {
        if (error?.length > 0) {
            toast.error(errorObj[error] || 'مشکلی رخ داده است')
            dispatch(setError(''))
        }
    }, [error])

    const onSubmitForm = async () => {

        if (AddNewData.name === '')
            toast.error('انتخاب محصول ضروری میباشد')
        else if (AddNewData.offPercentage === '' || AddNewData.offPercentage === 0)
            toast.error('درصد تخفیف را وارد کنید')
        else if (AddNewData.quantity === '' || AddNewData.quantity === 0)
            toast.error('تعداد را وارد کنید')
        else {
            try {

                const obj = {
                    name: AddNewData.name,
                    productId: AddNewData.productId,
                    offPercentage: AddNewData.offPercentage,
                    quantity: AddNewData.quantity
                };

                //make a request
                dispatch(addMajorShoppingToServer(obj))

                setAddNewData(initialData);
            } catch (err) { toast.error(err) }
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
                                <select id="underline_select_subcategory" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" value={AddNewData.name} onChange={handleChange} name='name'>
                                    <option value='' disabled>محصول مورد نظر را انتخاب کنید &#11167;</option>
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

                    <Grid item xs={12} lg={6} className='place-content-center'>
                        <div className='text-start text-sm mb-1'>
                            تعداد هر خرید عمده را وارد کنید
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="quantity"
                            value={AddNewData.quantity}
                            placeholder={`تعداد را وارد کنید`}
                            onChange={handleChange}
                        />

                    </Grid>


                    <Grid item xs={12} lg={6}>

                        <div className='text-start text-sm mb-1'>
                            درصد تخفیف
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="offPercentage"
                            value={AddNewData.offPercentage}
                            placeholder={`درصد تخفیف را وارد کنید`}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12} lg={6} className='place-content-center text-red-500'>
                        {
                            addDataLoading &&
                            <GradientCircularProgress />
                        }
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