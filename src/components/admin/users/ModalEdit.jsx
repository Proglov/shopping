"use client"
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext, useRef } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css';
import CustomQuill from '../../CustomQuil';
import { ModalEditContext } from './UsersTable';
import { categories } from '@/lib/categories';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(tagOptions, tags, theme) {
    return {
        fontWeight: tags.indexOf(tagOptions) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}
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
    // const { isModalEditOpen, setIsModalEditOpen, selectedItem, setSelectedItem } = useContext(ModalEditContext)


    // const theme = useTheme();
    // const checkBoxRef = useRef();

    // const handleChange = (event) => {
    //     const { name, value } = event.target;

    //     if (name === 'telegram') {
    //         setSelectedItem(prevSelectedItem => ({
    //             ...prevSelectedItem,
    //             telegram: event.target.checked,
    //         }));
    //     } else if (name === 'title') {
    //         setSelectedItem(prevSelectedItem => ({
    //             ...prevSelectedItem,
    //             title: value,
    //         }));
    //     } else if (name === 'quillValue') {
    //         setSelectedItem(prevSelectedItem => ({
    //             ...prevSelectedItem,
    //             description: value,
    //         }));
    //     }
    // };

    // const handleClose = () => {
    //     setIsModalEditOpen(false);
    // };


    return (
        // <Modal
        //     className='overflow-y-scroll'
        //     aria-labelledby="transition-modal-title"
        //     aria-describedby="transition-modal-description"
        //     open={isModalEditOpen}
        //     onClose={handleClose}
        //     closeAfterTransition
        //     slots={{ backdrop: Backdrop }}
        //     slotProps={{
        //         backdrop: {
        //             timeout: 500,
        //         },
        //     }}>
        //     <Fade in={isModalEditOpen}>
        //         <Box sx={ModalStyle} className='rounded-3xl'>
        //             <Typography id="transition-modal-title" variant="h6" component="h2">
        //                 ویرایش محصول
        //             </Typography>

        //             <div className="mt-5">
        //                 <FormControl className="w-full">
        //                     <Grid container spacing={2}>

        //                         <Grid item xs={12}>
        //                             <div>
        //                                 <label className="block text-gray-800 mb-1 pr-4" htmlFor="inline-full-name">
        //                                     عنوان محصول
        //                                 </label>
        //                             </div>
        //                             <div>
        //                                 <input
        //                                     className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        //                                     id="inline-full-name"
        //                                     type="text"
        //                                     name="title"
        //                                     value={selectedItem.name}
        //                                     placeholder="عنوان خبر را وارد کنید"
        //                                     onChange={handleChange}
        //                                 />
        //                             </div>
        //                         </Grid>

        //                         <Grid item xs={12}>
        //                             <div className='text-start text-sm mb-1'>
        //                                 قیمت (تومان)
        //                             </div>
        //                             <input
        //                                 className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        //                                 id="inline-full-name"
        //                                 type="text"
        //                                 name="price"
        //                                 value={selectedItem.price}
        //                                 placeholder={`قیمت محصول را وارد کنید`}
        //                                 onChange={handleChange}
        //                             />
        //                             {
        //                                 selectedItem.price !== '' &&
        //                                 <div className='text-sm text-start text-gray-600'>
        //                                     {price2Farsi(selectedItem.price)} تومان
        //                                 </div>
        //                             }

        //                         </Grid>

        //                         <Grid item xs={12}>
        //                             <div className='text-start text-sm mb-1 lg:mt-3'>
        //                                 تخفیف (درصد)
        //                             </div>
        //                             <input
        //                                 className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        //                                 id="inline-full-name"
        //                                 type="text"
        //                                 name="offPercentage"
        //                                 value={selectedItem.offPercentage}
        //                                 placeholder={`تخفیف محصول را وارد کنید`}
        //                                 onChange={handleChange}
        //                             />
        //                         </Grid>

        //                         <Grid item xs={12} className="mt-2 relative">
        //                             <div className='w-full text-start text-sm'>
        //                                 <label htmlFor="underline_select">دسته بندی</label>
        //                             </div>
        //                             <select id="underline_select" className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent my-2 rounded-md border-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200" onChange={handleChange} name='category'>
        //                                 <option defaultValue={''}>دسته بندی را انتخاب کنید &#11167;</option>
        //                                 {
        //                                     categories.map((category, index) => <option key={index} value={category} className='text-black'>{category}</option>)
        //                                 }
        //                             </select>
        //                         </Grid>

        //                         <Grid item xs={12}>
        //                             <div className='mt-2'>
        //                                 تصاویر ارسال شده:
        //                                 <div>
        //                                     {
        //                                         selectedItem.imagesURL.map((url, i) => {
        //                                             return (
        //                                                 <div className='bg-blue-50 mt-2' style={{ width: '300px' }}
        //                                                     key={i}>
        //                                                     <Image
        //                                                         src={url}
        //                                                         alt='عکس ارسال شده'
        //                                                         width={300}
        //                                                         height={200} />

        //                                                     <Button variant='outlined' color='error' className='mt-1 mb-4 w-full'
        //                                                         onClick={() => {
        //                                                             setImagesToDelete(prev => [
        //                                                                 ...prev,
        //                                                                 url
        //                                                             ]);
        //                                                             setSelectedItem(prev => ({
        //                                                                 ...prev,
        //                                                                 imagesURL: prev.imagesURL.filter(theUrl => theUrl !== url)
        //                                                             }))
        //                                                         }}
        //                                                     >
        //                                                         حذف عکس بالا
        //                                                     </Button>

        //                                                     <br />
        //                                                 </div>
        //                                             )
        //                                         })

        //                                     }
        //                                 </div>
        //                             </div>
        //                             <br />
        //                             <label
        //                                 className="block mt-2 mb-1  text-gray-800" htmlFor="inline-image-upload">
        //                                 افزودن تصویر:
        //                             </label>
        //                             <div className='bg-slate-300 overflow-hidden0 rounded'>

        //                             </div>
        //                         </Grid>

        //                         <Grid item xs={12}>
        //                             <CustomQuill
        //                                 onChange={(value) => handleChange({ target: { name: 'quillValue', value } })}
        //                                 value={selectedItem.description}
        //                             />
        //                         </Grid>

        //                     </Grid>
        //                 </FormControl>
        //             </div>



        //             <div className='mt-2 flex justify-between'>
        //                 <Button
        //                     onClick={() => { editItem(selectedItem) }}
        //                     variant='outlined'
        //                     className='p-0 m-1'
        //                     sx={{ color: 'green', borderColor: 'green' }}>
        //                     تایید
        //                 </Button>
        //                 <Button onClick={handleClose} variant='outlined'
        //                     className='p-0 m-1'
        //                     sx={{ color: 'red', borderColor: 'red' }}>
        //                     لغو
        //                 </Button>
        //             </div>
        //         </Box>
        //     </Fade>
        // </Modal>
        <div>
        </div>
    );
}
