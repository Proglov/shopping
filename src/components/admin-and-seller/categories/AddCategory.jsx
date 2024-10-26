'use client'
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api2 from '@/services/withAuthActivities/image';
import { SingleImageDropzone } from '../../single-image-dropzone';
import { useDispatch } from 'react-redux';
import { addCategoryToServer } from '../redux/globalAsyncThunks';


export default function AddCategory() {
    const dispatch = useDispatch();
    const { uploadImage } = Api2
    const [fileState, setFileState] = useState();
    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        formData: {
            name: ''
        }
    })

    const handleChange = (event) => {
        const { value } = event.target;
        setAddNewData(prevProps => {
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    name: value,
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
            toast.error('عنوان دسته بندی ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else if (!fileState) {
            toast.error('تصویر دسته بندی ضروری میباشد')
            setAddNewData(prevProps => ({
                ...prevProps,
                isSubmitting: false
            }))
        } else {
            try {
                // upload the image
                const resUpload = await uploadImage(fileState);
                const obj = AddNewData.formData;
                obj.name = DOMPurify.sanitize(AddNewData.formData.name)
                obj.imageUrl = resUpload?.name;
                const res = dispatch(addCategoryToServer(obj))
                if (res?.message === 'You are not authorized!')
                    throw ("توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید")
                toast.success('با موفقیت ارسال شد!')
            } catch (err) {
                toast.error(err)
            } finally {
                setFileState()
                setAddNewData(prevProps => ({
                    ...prevProps,
                    isSubmitting: false,
                    formData: {
                        name: ''
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
                            عنوان
                        </div>
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            name="name"
                            value={AddNewData.formData.name}
                            placeholder={`عنوان دسته بندی را وارد کنید`}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <label
                            className="block mt-2 mb-1 text-right" htmlFor="inline-image-upload">
                            آپلود تصویر
                        </label>

                        <SingleImageDropzone
                            value={fileState}
                            onChange={(file) => {
                                setFileState(file);
                            }}
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
