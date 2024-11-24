'use client'
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { addWarehouseToServer } from '../redux/globalAsyncThunks';
import { getProvincesFromServer } from '../redux/reducers/warehouses';
import { MdExpandMore } from 'react-icons/md';


export default function AddWarehouse() {
    const dispatch = useDispatch();
    const { provinces } = useSelector((state) => state.warehouses);

    // you should use addDataLoading instead of isSubmitting!
    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        formData: {
            name: '',
            province: {
                id: '',
                name: ''
            },
            city: {
                id: '',
                name: ''
            },
            completeAddress: '',
            citiesCovered: []
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

    const handleCheckboxChange = (cityId, cityName) => {
        setAddNewData(prevProps => {
            const isCurrentlyCovered = prevProps.formData.citiesCovered.some(city => city.id === cityId);

            // Add or remove city based on current state
            const updatedCitiesCovered = isCurrentlyCovered
                ? prevProps.formData.citiesCovered.filter(city => city.id !== cityId)
                : [...prevProps.formData.citiesCovered, { id: cityId, name: cityName }];

            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    citiesCovered: updatedCitiesCovered,
                }
            };
        });
    };

    const handleAllCitiesCheckboxChange = (provinceObj) => {
        const allCitiesCovered = provinceObj.cities.every(city =>
            AddNewData.formData.citiesCovered.some(coveredCity => coveredCity.id === city.cityId)
        );
        const updatedCitiesCovered = allCitiesCovered
            ? AddNewData.formData.citiesCovered.filter(city =>
                !provinceObj.cities.some(provCity => provCity.cityId === city.id)
            )
            : [...AddNewData.formData.citiesCovered, ...provinceObj.cities.map(city => ({ id: city.cityId, name: city.cityName }))];

        setAddNewData(prevProps => ({
            ...prevProps,
            formData: {
                ...prevProps.formData,
                citiesCovered: updatedCitiesCovered
            }
        }));
    };

    const provinceAndCityHandler = (field, provinceOrCity) => {
        if (field === 'city')
            setAddNewData(prevProps => {
                return {
                    ...prevProps,
                    formData: {
                        ...prevProps.formData,
                        city: { id: provinceOrCity[field + 'Id'], name: provinceOrCity[field + 'Name'] }
                    }
                }
            })
        else setAddNewData(prevProps => {
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    province: { id: provinceOrCity[field + 'Id'], name: provinceOrCity[field + 'Name'] },
                    city: { id: provinceOrCity.cities[0].cityId, name: provinceOrCity.cities[0].cityName }
                }
            }
        })
    }

    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));

        if (AddNewData.formData.name === '') {
            toast.error('عنوان انبار ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!AddNewData.formData.city.id) {
            toast.error('شهر و استان ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!AddNewData.formData.completeAddress || AddNewData.formData.completeAddress.length < 6) {
            toast.error('ادرس کامل انبار ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.citiesCovered.length < 1) {
            toast.error('شهرهای پوشش داده شده ی انبار ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else {
            try {

                // build up the object
                const obj = {
                    name: AddNewData.formData.name,
                    cityId: AddNewData.formData.city.id,
                    completeAddress: AddNewData.formData.completeAddress,
                    citiesCovered: AddNewData.formData.citiesCovered.map(city => city.id)
                };

                //make a request
                const res = dispatch(addWarehouseToServer(obj))

                setAddNewData(prevProps => ({
                    ...prevProps,
                    formData: {
                        name: '',
                        province: {
                            id: '',
                            name: ''
                        },
                        city: {
                            id: '',
                            name: ''
                        },
                        completeAddress: '',
                        citiesCovered: []
                    },
                    isSubmitting: false
                }));
                if (res?.message === 'You are not authorized!')
                    throw ("توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید")
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
                        <select id="underline_select_province" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" value={AddNewData.formData.province.name} onChange={handleChange} name='province'>
                            <option value='' disabled>استان را انتخاب کنید &#11167;</option>
                            {
                                provinces.map(provinceObj => <option key={provinceObj.provinceId} value={provinceObj?.provinceName} onClick={() => provinceAndCityHandler('province', provinceObj)} className='text-black'>{provinceObj?.provinceName}</option>)
                            }
                        </select>
                    </Grid>

                    {
                        !!AddNewData?.formData?.province.id &&
                        <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                            <div className='w-full text-start text-sm'>
                                <label htmlFor="underline_select_city">شهر</label>
                            </div>
                            <select id="underline_select_city" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" onChange={handleChange} value={AddNewData.formData.city.name} name='city'>
                                <option value='' disabled>شهر را انتخاب کنید &#11167;</option>
                                {
                                    provinces.map(provinceObj => {
                                        if (provinceObj?.provinceName === AddNewData?.formData?.province.name) {
                                            return provinceObj?.cities.map(cityObj => <option key={cityObj.cityId} value={cityObj?.cityName} onClick={() => provinceAndCityHandler('city', cityObj)} className='text-black'>{cityObj?.cityName}</option>)
                                        } else return null
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

                    <Grid item xs={12} sm={12} md={12} lg={6} className='text-start'>
                        <br />
                        <span className='text-indigo-500'>
                            شهرهایی که از این انبار میتوانید محصول ارسال کنید را انتخاب کنید:
                        </span>

                        {
                            provinces.map(((provinceObj, i) => (
                                <Accordion key={i * 223 + 5}>
                                    <AccordionSummary
                                        expandIcon={<MdExpandMore />}
                                        aria-controls="panel1-content"
                                        id={"panel-header" + i}
                                    >
                                        <Typography>{provinceObj.provinceName}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className='flex justify-center'>
                                            <FormControlLabel
                                                dir='ltr'
                                                control={
                                                    <Checkbox
                                                        color='info'
                                                        checked={provinceObj.cities.every(city =>
                                                            AddNewData.formData.citiesCovered.some(coveredCity => coveredCity.id === city.cityId)
                                                        )}
                                                        onChange={() => handleAllCitiesCheckboxChange(provinceObj)}
                                                    />
                                                }
                                                label={`همه‌ی ${provinceObj.provinceName}`}
                                            />
                                        </Typography>

                                        <Typography className='flex flex-col items-center'>
                                            {provinceObj.cities.map((cityObj, i) => (
                                                <div key={cityObj.cityId + i} className='flex justify-between items-center'>
                                                    <span>{cityObj.cityName}</span>
                                                    <Checkbox
                                                        checked={AddNewData.formData.citiesCovered.some(city => city.id === cityObj.cityId)}
                                                        onChange={() => handleCheckboxChange(cityObj.cityId, cityObj.cityName)}
                                                    />
                                                </div>
                                            ))}

                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )))
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
