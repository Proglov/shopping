"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import { ModalShowMoreContext } from './TXTable';
import React from 'react';
import { convertToFarsiNumbers } from '@/utils/funcs';

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
    const { isModalShowMoreOpen, setIsModalShowMoreOpen, selectedItem } = useContext(ModalShowMoreContext)
    const handleClose = () => setIsModalShowMoreOpen(false);

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
                                        selectedItem?.boughtProducts !== undefined &&
                                        selectedItem?.boughtProducts.map((bp, i) => (
                                            <div key={i}>
                                                {bp.product.name}
                                                &nbsp;
                                                به تعداد
                                                &nbsp;
                                                {bp.quantity}
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

                                {/* <div>
                                    <div>زمان خریداری شده :</div>
                                    <div className='mr-4'>
                                        {
                                            selectedItem?.boughtAt !== '' &&
                                            <>
                                                {new Intl.DateTimeFormat('fa-IR').format(parseInt(selectedItem?.boughtAt))}
                                                <br />
                                                {convertToFarsiNumbers((new Date(parseInt(selectedItem?.boughtAt)).getHours()))}
                                                :{convertToFarsiNumbers(("0" + (new Date((parseInt(selectedItem?.boughtAt))).getMinutes())).slice(-2))}
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