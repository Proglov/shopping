"use client"
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css';
import CustomQuill from '../../CustomQuil';
import { ModalEditContext } from './ProductsTable';
import { price2Farsi } from '@/utils/funcs';
import { categories } from '@/lib/categories';
import { giveMeToken } from '@/utils/Auth';
import { MultiFileDropzone } from '../../multi-image-dropzone';
import Api from '@/services/withAuthActivities/product';


const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: 800,
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid purple',
    boxShadow: '0px 0px 10px 1px purple',
    p: 4,
};

export default function ModalEdit() {
    const { updateProduct } = Api
    const { isModalEditOpen, setIsModalEditOpen, selectedItem, setSelectedItem, setOperatingID, setItems, setOperatingError } = useContext(ModalEditContext)

    const [fileStates, setFileStates] = useState([]);
    const [uploadRes, setUploadRes] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'telegram') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                telegram: event.target.checked,
            }));
        } else if (name === 'title') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                title: value,
            }));
        } else if (name === 'quillValue') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                description: value,
            }));
        }
    };

    const handleClose = () => {
        setIsModalEditOpen(false);
        setSelectedItem({
            id: '',
            name: '',
            price: '',
            category: '',
            offPercentage: '',
            imagesUrl: []
        })
    };

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

    const Token = giveMeToken()

    const editItem = async (obj) => {
        setOperatingID(obj.id);
        setIsModalEditOpen(false);

        //confirm the new pics in edgestore
        const imagesURL = [];
        for (const obj of uploadRes) {
            const url = obj.url
            imagesURL.push(url)
            // await edgestore.myPublicImages.confirmUpload({
            //     url
            // })
        }

        //add new pics to mongodb
        const augmentedObj = {
            ...obj,
            imagesUrl: [...obj.imagesUrl, ...imagesURL]
        }


        //delete the imagesToDelete
        for (const url of imagesToDelete) {
            // await edgestore.myPublicImages.delete({ url });
        }

        try {
            const res = await updateProduct(augmentedObj, Token)
            setAddNewData(prevProps => ({
                ...prevProps,
                formData: {
                    name: '',
                    price: '',
                    offPercentage: '',
                    category: '',
                    desc: '',
                    subcategory: 'سوپرمارکت',
                    imagesUrl: []
                },
                isSubmitting: false
            }));
            setOperatingID('');
            if (res === 'You are not authorized!')
                throw ("توکن شما منقضی شده. لطفا خارج، و دوباره وارد شوید")
            setFileStates([]);
            setUploadRes([]);
        } catch (err) {
            setOperatingError(err);
            setFileStates([]);
            setImagesToDelete([]);
            setUploadRes([]);
        }
    };

    return (
        <Modal
            className='overflow-y-scroll'
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalEditOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}>
            <Fade in={isModalEditOpen}>
                <Box sx={ModalStyle} className='rounded-3xl'>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        ویرایش محصول
                    </Typography>

                    <div className="mt-5">
                        <FormControl className="w-full">
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <div>
                                        <label className="block text-gray-800 mb-1 pr-4" htmlFor="inline-full-name">
                                            عنوان محصول
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name"
                                            type="text"
                                            name="title"
                                            value={selectedItem.name}
                                            placeholder="عنوان خبر را وارد کنید"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className='text-start text-sm mb-1'>
                                        قیمت (تومان)
                                    </div>
                                    <input
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        id="inline-full-name"
                                        type="text"
                                        name="price"
                                        value={selectedItem.price}
                                        placeholder={`قیمت محصول را وارد کنید`}
                                        onChange={handleChange}
                                    />
                                    {
                                        selectedItem.price !== '' &&
                                        <div className='text-sm text-start text-gray-600'>
                                            {price2Farsi(selectedItem.price)} تومان
                                        </div>
                                    }

                                </Grid>

                                <Grid item xs={12}>
                                    <div className='text-start text-sm mb-1 lg:mt-3'>
                                        تخفیف (درصد)
                                    </div>
                                    <input
                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        id="inline-full-name"
                                        type="text"
                                        name="offPercentage"
                                        value={selectedItem.offPercentage}
                                        placeholder={`تخفیف محصول را وارد کنید`}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} className="mt-2 relative">
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

                                <Grid item xs={12}>
                                    {
                                        selectedItem?.imagesUrl?.length === 0 ?
                                            <div className='mt-2'>
                                                تصویری ارسال نشده
                                            </div>
                                            :
                                            <div className='mt-2'>
                                                تصاویر ارسال شده:
                                                <div>
                                                    {
                                                        selectedItem?.imagesUrl?.map((url, i) => {
                                                            return (
                                                                <div className='bg-blue-50 mt-2' style={{ width: '300px' }}
                                                                    key={i}>
                                                                    <Image
                                                                        src={url}
                                                                        alt='عکس ارسال شده'
                                                                        width={300}
                                                                        height={200} />

                                                                    <Button variant='outlined' color='error' className='mt-1 mb-4 w-full'
                                                                        onClick={() => {
                                                                            setImagesToDelete(prev => [
                                                                                ...prev,
                                                                                url
                                                                            ]);
                                                                            setSelectedItem(prev => ({
                                                                                ...prev,
                                                                                imagesUrl: prev?.imagesUrl?.filter(theUrl => theUrl !== url)
                                                                            }))
                                                                        }}
                                                                    >
                                                                        حذف عکس بالا
                                                                    </Button>

                                                                    <br />
                                                                </div>
                                                            )
                                                        })

                                                    }
                                                </div>
                                            </div>
                                    }


                                    <br />
                                    <label
                                        className="block mt-2 mb-1  text-gray-800" htmlFor="inline-image-upload">
                                        افزودن تصویر:
                                    </label>
                                    <div className='bg-slate-300 overflow-hidden0 rounded'>

                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <label
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
                                                        // const res = await edgestore.myPublicImages.upload({
                                                        //     file: addedFileState.file,
                                                        //     options: {
                                                        //         temporary: true
                                                        //     },
                                                        //     onProgressChange: async (progress) => {
                                                        //         updateFileProgress(addedFileState.key, progress);
                                                        //         if (progress === 100) {
                                                        //             // wait 1 second to set it to complete
                                                        //             // so that the user can see the progress bar at 100%
                                                        //             await new Promise((resolve) => setTimeout(resolve, 1000));
                                                        //             updateFileProgress(addedFileState.key, 'COMPLETE');
                                                        //         }
                                                        //     },
                                                        // });
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
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <CustomQuill
                                        onChange={(value) => handleChange({ target: { name: 'quillValue', value } })}
                                        value={selectedItem.description}
                                    />
                                </Grid>

                            </Grid>
                        </FormControl>
                    </div>


                    <div className='mt-2 flex justify-between'>
                        <Button
                            onClick={() => { editItem(selectedItem) }}
                            variant='outlined'
                            className='p-0 m-1'
                            sx={{ color: 'green', borderColor: 'green' }}>
                            تایید
                        </Button>
                        <Button onClick={handleClose} variant='outlined'
                            className='p-0 m-1'
                            sx={{ color: 'red', borderColor: 'red' }}>
                            لغو
                        </Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}