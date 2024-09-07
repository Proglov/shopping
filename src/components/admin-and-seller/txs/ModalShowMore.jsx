"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { convertToFarsiNumbers } from '@/utils/funcs';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalShowMoreOpen } from '../redux/reducers/transactions';
import Link from 'next/link';

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid red',
    boxShadow: '0px 0px 10px 1px red',
    p: 4,
};

export default function ModalShowMore() {
    const dispatch = useDispatch();
    const {
        isModalShowMoreOpen,
        selectedItem
    } = useSelector((state) => state.transactions);

    const handleClose = () => {
        dispatch(setIsModalShowMoreOpen(false));
    }
    console.log(selectedItem);
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalShowMoreOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isModalShowMoreOpen}>
                    {
                        selectedItem?.id !== '' &&
                        <Box sx={ModalStyle} className='rounded-3xl'>

                            <div>

                                <div>محصولات :</div>
                                <div className='mr-4'>
                                    {
                                        !!selectedItem?.boughtProducts &&
                                        selectedItem?.boughtProducts.map((bp, i) => (
                                            <div key={i} className='flex'>
                                                <Link href={'/products/' + bp?.productId?._id} className='flex text-purple-700 underline'>
                                                    {bp.productId.name}
                                                </Link>

                                                &nbsp;
                                                به تعداد
                                                &nbsp;
                                                <span className='flex gap-0 justify-center'>
                                                    <MdKeyboardArrowRight className='mt-1 text-red-600' />
                                                    {bp.quantity}
                                                    <MdKeyboardArrowLeft className='mt-1 text-red-600' />
                                                </span>
                                                &nbsp;
                                                عدد
                                            </div>
                                        ))
                                    }
                                </div>

                                <br />

                                <div>
                                    <div>آدرس :</div>
                                    <div className='mr-4'>{selectedItem.address}</div>
                                </div>

                                <div>
                                    <div>زمان خریداری شده :</div>
                                    <div className='mr-4'>
                                        {
                                            selectedItem?.createdAt !== '' && selectedItem?.createdAt != null &&
                                            <div className='flex gap-3'>
                                                <span>
                                                    {new Intl.DateTimeFormat('fa-IR').format(new Date(selectedItem?.createdAt).getTime())}
                                                </span>

                                                <span dir='ltr'>
                                                    ساعت &nbsp;
                                                    {convertToFarsiNumbers((new Date(selectedItem?.createdAt)).getHours())}
                                                    :{convertToFarsiNumbers(("0" + (new Date((selectedItem?.createdAt))).getMinutes())).slice(-2)}
                                                </span>

                                            </div>
                                        }

                                    </div>
                                </div>

                            </div>

                            <div className='mt-2 flex justify-end'>
                                <Button onClick={handleClose} variant='outlined'
                                    className='p-0 m-1'
                                    sx={{ color: 'red', borderColor: 'red' }}>
                                    برگشت
                                </Button>
                            </div>
                        </Box>
                    }
                </Fade>
            </Modal>
        </>
    );
}