"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Api from '@/services/withAuthActivities/tx';

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

export default function ModalCancel({ selectedItem, isModalCancelOpen, setIsModalCancelOpen, onCancelSuccess }) {
    const { TXCancelByUser } = Api
    const [reason, setReason] = useState('')

    const handleChange = (event) => {
        const { value } = event.target
        setReason(value)
    }

    const handleClose = () => {
        setReason('')
        setIsModalCancelOpen(false);
    }

    const submit = async () => {
        if (reason.length < 3) {
            toast.error('علت کنسلی خود را کامل بنویسید')
            return
        }

        try {
            const res = await TXCancelByUser({ id: selectedItem._id, reason })
            if (res?.transaction?.canceled?.canceledBy === 'user') {
                toast.success('سفارش شما لغو شده و دلیل آن بررسی خواهد شد');

                onCancelSuccess(selectedItem._id, reason);
            } else throw new Error('مشکلی رخ داده است')
        } catch (error) {
            toast.error('مشکلی رخ داده است')
        }

        handleClose()
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalCancelOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isModalCancelOpen}>
                {
                    selectedItem?.id !== '' &&
                    <Box sx={ModalStyle} className='rounded-3xl'>

                        <div className='mb-4'>
                            <span className='text-red-600'> * </span>
                            علت کنسلی خود را بنویسید
                            <span className='text-red-600'> * </span>
                        </div>

                        <TextField
                            value={reason}
                            fullWidth
                            name="reason"
                            label={''}
                            onChange={handleChange}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    submit()
                                }
                            }}
                            sx={{
                                " & .MuiInputLabel-root": {
                                    left: "inherit !important",
                                    right: "1.75rem !important",
                                    transformOrigin: "right !important",
                                },
                                "& legend": { textAlign: "right" },
                            }}
                        />

                        <div className='mt-5 flex justify-end gap-2'>
                            <Button onClick={submit} variant='outlined'
                                className='p-0 m-1'
                                sx={{ color: 'red', borderColor: 'red' }}>
                                کنسل کردن
                            </Button>
                            <Button onClick={handleClose} variant='outlined'
                                className='p-0 m-1'
                                sx={{ color: 'InfoText', borderColor: 'InfoText' }}>
                                برگشت
                            </Button>
                        </div>
                    </Box>
                }
            </Fade>
        </Modal>
    );
}