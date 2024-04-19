'use client'
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import CustomQuill from '@/components/CustomQuil';
import DOMPurify from 'dompurify';
import { categories } from '@/lib/categories';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { price2Farsi } from '@/utils/funcs';
import { createProduct } from '@/services/adminActivities/product';
import ImageUpload from '@/components/ImageUpload';
import { giveMeToken } from '@/utils/Auth';


export default function AddProduct() {

    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        formData: {
            name: '',
            price: '',
            offPercentage: '',
            category: '',
            desc: '',
            subcategory: 'سوپرمارکت'
        }
    })

    const Token = giveMeToken()


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'price' || name === 'offPercentage') {
            const newValue = parseInt(value) || 0
            setAddNewData(prevProps => {
                if (newValue == value && ((name === 'offPercentage' && newValue < 100) || name === 'price'))
                    return {
                        ...prevProps,
                        formData: {
                            ...prevProps.formData,
                            [name]: newValue,
                        },
                        error: ''
                    }
                return {
                    ...prevProps,
                    error: ''
                }
            })
        } else {
            setAddNewData(prevProps => {
                return {
                    ...prevProps,
                    formData: {
                        ...prevProps.formData,
                        [name]: value,
                    },
                    error: ''
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
        } else {
            try {
                const obj = AddNewData.formData;
                obj.desc = DOMPurify.sanitize(AddNewData.formData.desc)
                console.log(obj)
                console.log(obj.desc)
                await createProduct(obj, Token)
                setAddNewData(prevProps => ({
                    ...prevProps,
                    formData: {
                        name: '',
                        price: '',
                        offPercentage: '',
                        category: '',
                        desc: '',
                        subcategory: 'سوپرمارکت'
                    },
                    isSubmitting: false
                }));
                toast.success('با موفقیت ارسال شد!')
            } catch {

            }
            // const imagesURL = [];
            // for (const obj of uploadRes) {
            //     const url = obj.url
            //     imagesURL.push(url)
            //     await edgestore.myPublicImages.confirmUpload({
            //         url
            //     })
            // }
            // let newBody = {};
            // if (type === "events") {
            //     const day = eventAt[0] < 10 ? '0' + eventAt[0] : eventAt[0];
            //     const month = eventAt[1] < 10 ? '0' + eventAt[1] : eventAt[1];
            //     newBody.eventAt = eventAt[2] + '-' + month + '-' + day
            // }
            // newBody = {
            //     ...newBody,
            //     "title": AddNewData.formData.title,
            //     "description": DOMPurify.sanitize(AddNewData.formData.quillValue),
            //     "imagesURL": imagesURL,
            //     "tags": AddNewData.formData.tags,
            //     "createdBy": "ADMIN",
            //     "telegram": AddNewData.formData.telegram
            // }
            // fetch(`/api/${type}`, {
            //     headers: { 'Content-Type': 'application/json' },
            //     method: 'POST',
            //     body: JSON.stringify(newBody)
            // })
            //     .then((response) => {
            //         if (!response.ok) {
            //             throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
            //         }
            //         return response.json();
            //     })
            //     .then((data) => {
            //         if (data?.error?.name === "PrismaClientKnownRequestError") {
            //             setAddNewData(prevProps => ({
            //                 ...prevProps,
            //                 isSubmitting: false,
            //                 error: data?.message + ' ; ' + data?.error?.meta?.message
            //             }));
            //         } else {
            //             setAddNewData(prevProps => ({
            //                 ...prevProps,
            //                 success: `${itemType} با موفقیت اضافه شد!`,
            //                 formData: {
            //                     tags: [],
            //                     title: '',
            //                     telegram: false,
            //                     quillValue: '',
            //                 },
            //                 isSubmitting: false
            //             }));
            //             setFileStates([]);
            //             setUploadRes([]);

            //             //show success for five seconds
            //             setTimeout(() => setAddNewData(prevProps => ({
            //                 ...prevProps,
            //                 success: ''
            //             })), 5000);

            //             // Add new negative status in statics
            //             if (type === 'news') {
            //                 setStaticProps(prevProps => ({
            //                     ...prevProps, newsCount: prevProps.newsCount + 1,
            //                     negativeStatusNewsCount: prevProps.negativeStatusNewsCount + 1
            //                 }));

            //                 if (currentInfoPage === 1 && controlPanelsPage === 0) {
            //                     setInfoItems(prevItems => {
            //                         return [{
            //                             id: data?.id,
            //                             title: AddNewData.formData.title,
            //                             description: DOMPurify.sanitize(AddNewData.formData.quillValue),
            //                             imagesURL,
            //                             tags: AddNewData.formData.tags,
            //                             createdBy: "ADMIN",
            //                             views: 0,
            //                             telegram: AddNewData.formData.telegram,
            //                             createdAt: new Date()
            //                         },
            //                         ...prevItems]
            //                     })
            //                 }

            //             } else if (type === 'events') {
            //                 setStaticProps(prevProps => ({
            //                     ...prevProps, eventsCount: prevProps.eventsCount + 1,
            //                     negativeStatusEventsCount: prevProps.negativeStatusEventsCount + 1
            //                 }));

            //                 if (currentInfoPage === 1 && controlPanelsPage === 2) {
            //                     setInfoItems(prevItems => {
            //                         return [{
            //                             id: data?.id,
            //                             title: AddNewData.formData.title,
            //                             description: DOMPurify.sanitize(AddNewData.formData.quillValue),
            //                             imagesURL,
            //                             tags: AddNewData.formData.tags,
            //                             createdBy: "ADMIN",
            //                             views: 0,
            //                             telegram: AddNewData.formData.telegram,
            //                             createdAt: new Date()
            //                         },
            //                         ...prevItems]
            //                     })
            //                 }
            //             } else {
            //                 setStaticProps(prevProps => ({
            //                     ...prevProps, announcementsCount: prevProps.announcementsCount + 1,
            //                     negativeStatusAnnouncementsCount: prevProps.negativeStatusAnnouncementsCount + 1,
            //                 }));

            //                 if (currentInfoPage === 1 && controlPanelsPage === 1) {
            //                     setInfoItems(prevItems => {
            //                         return [{
            //                             id: data?.id,
            //                             title: AddNewData.formData.title,
            //                             description: DOMPurify.sanitize(AddNewData.formData.quillValue),
            //                             imagesURL,
            //                             tags: AddNewData.formData.tags,
            //                             createdBy: "ADMIN",
            //                             views: 0,
            //                             telegram: AddNewData.formData.telegram,
            //                             createdAt: new Date()
            //                         },
            //                         ...prevItems]
            //                     })
            //                 }
            //             }
            //         }
            //     })
            //     .catch((err) => {
            //         setAddNewData(prevProps => ({
            //             ...prevProps,
            //             error: err,
            //             isSubmitting: false
            //         }));
            //     });

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

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div className='text-start text-sm mb-1 lg:mt-3'>
                            تخفیف (درصد)
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="offPercentage"
                            value={AddNewData.formData.offPercentage}
                            placeholder={`تخفیف محصول را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                        <div className='w-full text-start text-sm'>
                            <label htmlFor="underline_select">دسته بندی</label>
                        </div>
                        <select id="underline_select" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" onChange={handleChange} name='category'>
                            <option defaultValue={''}>دسته بندی را انتخاب کنید &#11167;</option>
                            {
                                categories.map((category, index) => <option key={index} value={category} className='text-black'>{category}</option>)
                            }
                        </select>
                    </Grid>

                    <div className='mt-4 w-full'>
                        <ImageUpload />
                    </div>

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
                        {/* <label
                            className="block mt-2 mb-1 text-slate-50" htmlFor="inline-image-upload">
                            آپلود تصویر
                        </label>

                        <MultiFileDropzone
                            value={fileStates}
                            onChange={(files) => {
                                setFileStates(files);
                            }}
                            onFilesAdded={async (addedFiles) => {
                                setFileStates([...fileStates, ...addedFiles]);
                                await Promise.all(
                                    addedFiles.map(async (addedFileState) => {
                                        try {
                                            const res = await edgestore.myPublicImages.upload({
                                                file: addedFileState.file,
                                                options: {
                                                    temporary: true
                                                },
                                                onProgressChange: async (progress) => {
                                                    updateFileProgress(addedFileState.key, progress);
                                                    if (progress === 100) {
                                                        // wait 1 second to set it to complete
                                                        // so that the user can see the progress bar at 100%
                                                        await new Promise((resolve) => setTimeout(resolve, 1000));
                                                        updateFileProgress(addedFileState.key, 'COMPLETE');
                                                    }
                                                },
                                            });
                                            setUploadRes((uploadRes) => [
                                                ...uploadRes,
                                                {
                                                    url: res.url,
                                                    filename: addedFileState.file.name,
                                                },
                                            ]);
                                        } catch (err) {
                                            updateFileProgress(addedFileState.key, 'ERROR');
                                        }
                                    }),
                                );
                            }}
                        /> */}
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
