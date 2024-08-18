'use client'
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import CustomQuill from '@/components/CustomQuil';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { price2Farsi } from '@/utils/funcs';
import Api2 from '@/services/withAuthActivities/image';
import { getCategoriesFromServer } from '../redux/reducers/products';
import { useDispatch, useSelector } from 'react-redux';
import { MultiFileDropzone } from '../../multi-image-dropzone';
import { addProductToServer } from '../redux/globalAsyncThunks';


export default function AddProduct() {
    const dispatch = useDispatch();
    const { uploadImage } = Api2
    const [fileStates, setFileStates] = useState([]);
    const {
        categories
    } = useSelector((state) => state.products);
    const [uploadRes, setUploadRes] = useState([]);

    // you should use addDataLoading instead of isSubmitting!
    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        formData: {
            name: '',
            price: 0,
            category: '',
            desc: '',
            subcategory: '',
            imagesUrl: []
        }
    })

    useEffect(() => {
        dispatch(getCategoriesFromServer())
    }, [dispatch])

    function updateFileProgress(key, progress) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'price') {
            const newValue = parseInt(value) || 0
            setAddNewData(prevProps => {
                if (newValue == value)
                    return {
                        ...prevProps,
                        formData: {
                            ...prevProps.formData,
                            price: newValue,
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
        } else if (AddNewData.formData.category === '') {
            toast.error('دسته بندی محصول ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (AddNewData.formData.subcategory === '') {
            toast.error('زیر دسته بندی محصول ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else {
            try {
                // set the subcategoryId
                let subcategoryId = '';
                let bool = true;
                let i = 0;
                while (bool) {
                    for (let j = 0; j < categories[i].subcategories.length; j++) {
                        if (categories[i].subcategories[j]?.subcategoryName === AddNewData?.formData.subcategory) {
                            subcategoryId = categories[i].subcategories[j]?.subcategoryId
                            bool = false;
                            break
                        }
                    }
                    i++;
                }

                // build up the object
                const obj = {
                    name: AddNewData.formData.name,
                    price: AddNewData.formData.price,
                    desc: AddNewData.formData.desc,
                    subcategoryId,
                    imagesUrl: uploadRes
                };

                //make a request
                const res = dispatch(addProductToServer(obj))

                setAddNewData(prevProps => ({
                    ...prevProps,
                    formData: {
                        name: '',
                        price: '',
                        category: '',
                        desc: '',
                        subcategory: '',
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
                            عنوان
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="name"
                            value={AddNewData.formData.name}
                            placeholder={`عنوان محصول را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1'>
                            قیمت (تومان)
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="price"
                            value={AddNewData.formData.price}
                            placeholder={`قیمت محصول را وارد کنید`}
                            onChange={handleChange}
                        />
                        {
                            AddNewData.formData.price !== '' &&
                            <div className='text-sm text-start text-gray-600'>
                                {price2Farsi(AddNewData.formData.price)} تومان
                            </div>
                        }

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                        <div className='w-full text-start text-sm'>
                            <label htmlFor="underline_select_category">دسته بندی</label>
                        </div>
                        <select id="underline_select_category" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" value={AddNewData.formData.category} onChange={handleChange} name='category'>
                            <option value='' disabled>دسته بندی را انتخاب کنید &#11167;</option>
                            {
                                categories.map((categoryObj, index) => <option key={index} value={categoryObj?.categoryName} className='text-black'>{categoryObj?.categoryName}</option>)
                            }
                        </select>
                    </Grid>

                    {
                        !!AddNewData?.formData?.category &&
                        <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                            <div className='w-full text-start text-sm'>
                                <label htmlFor="underline_select_subcategory">زیر دسته بندی</label>
                            </div>
                            <select id="underline_select_subcategory" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" onChange={handleChange} value={AddNewData.formData.subcategory} name='subcategory'>
                                <option value='' disabled>زیر دسته بندی را انتخاب کنید &#11167;</option>
                                {
                                    categories.map(categoryObj => {
                                        if (categoryObj?.categoryName === AddNewData?.formData?.category) {
                                            return categoryObj?.subcategories.map((sub, i) => <option key={i} value={sub?.subcategoryName} className='text-black'>{sub?.subcategoryName}</option>)
                                        } else return <></>
                                    })
                                }
                            </select>
                        </Grid>
                    }

                    <Grid item xs={12}>
                        <label
                            className="block mt-2 mb-1 text-right" htmlFor="inline-image-upload">
                            آپلود تصاویر
                        </label>

                        <MultiFileDropzone
                            value={fileStates}
                            onChange={(files) => {
                                setFileStates(files);
                            }}
                            onFilesAdded={async (addedFiles) => {
                                setFileStates(prev => [...prev, ...addedFiles]);
                                await Promise.all(
                                    addedFiles.map(async (addedFileState) => {
                                        try {

                                            //Add an animation
                                            let temp = 0;
                                            const interval = setInterval(() => {
                                                updateFileProgress(addedFileState.key, temp);
                                                if (++temp === 50) clearInterval(interval)
                                            }, 10);
                                            const res = await uploadImage(addedFileState.file);
                                            if (interval) clearInterval(interval)
                                            updateFileProgress(addedFileState.key, 'COMPLETE');
                                            setUploadRes((uploadRes) => [
                                                ...uploadRes,
                                                res?.name,
                                            ]);
                                        } catch (err) {
                                            updateFileProgress(addedFileState.key, 'ERROR');
                                        }
                                    }),
                                );
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} className='mt-2'>
                        <div className='text-start text-sm'>
                            توضیحات محصول
                        </div>
                        <CustomQuill
                            onChange={(value) => handleChange({ target: { name: 'desc', value } })}
                            value={AddNewData.formData.desc}
                        />
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
