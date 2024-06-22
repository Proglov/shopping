"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { convertToFarsiNumbers } from '@/utils/funcs';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalShowMoreOpen } from '../redux/reducers/transactions';

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
                        selectedItem.id !== '' &&
                        <Box sx={ModalStyle} className='rounded-3xl'>

                            <div>

                                <div>محصولات :</div>
                                <div className='mr-4'>
                                    {
                                        !!selectedItem?.boughtProducts &&
                                        selectedItem?.boughtProducts.map((bp, i) => (
                                            <div key={i} className='flex'>
                                                <span className='flex'>
                                                    <MdKeyboardDoubleArrowRight className='mt-1 text-red-600' />
                                                    {bp.productId.name}
                                                    <MdKeyboardDoubleArrowLeft className='mt-1 text-red-600' />
                                                </span>

                                                &nbsp;
                                                به تعداد
                                                &nbsp;
                                                <span className='flex'>
                                                    <MdKeyboardDoubleArrowRight className='mt-1 text-red-600' />
                                                    {bp.quantity}
                                                    <MdKeyboardDoubleArrowLeft className='mt-1 text-red-600' />
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

                                {/* the field below doesn't work properly, even though the createdAt property is correct*/}
                                {/* <div>
                                    <div>زمان خریداری شده :</div>
                                    <div className='mr-4'>
                                        {
                                            selectedItem?.createdAt !== '' && selectedItem?.createdAt != null &&
                                            <>
                                                {new Intl.DateTimeFormat('fa-IR').format(parseInt(selectedItem?.createdAt))}
                                                <br />
                                                {convertToFarsiNumbers((new Date(parseInt(selectedItem?.createdAt)).getHours()))}
                                                :{convertToFarsiNumbers(("0" + (new Date((parseInt(selectedItem?.createdAt))).getMinutes())).slice(-2))}
                                            </>
                                        }

                                    </div>
                                </div> */}

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