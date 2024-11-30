"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Api from '@/services/withAuthActivities/tx';
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid green',
    boxShadow: '0px 0px 10px 1px green',
    p: 4,
};

export default function ModalOpinion({ selectedItem, isModalOpinionOpen, setIsModalOpinionOpen, onOpinionSuccess }) {
    const { OpinionTX } = Api
    const [comment, setComment] = useState('')
    const [rate, setRate] = useState(0)

    const handleChange = (event) => {
        const { value } = event.target
        setComment(value)
    }

    const handleClose = () => {
        setComment('')
        setRate(0)
        setIsModalOpinionOpen(false);
    }

    const submit = async () => {
        if (comment.length < 1) {
            toast.error('نظر خود را کامل بنویسید')
            return
        }

        if (rate > 5 || rate < 1) {
            toast.error('از یک تا پنج ستاره بدهید')
            return
        }

        try {
            const res = await OpinionTX({ id: selectedItem._id, comment, rate })
            if (res?.transaction?.opinion?.rate === rate) {
                toast.success('سپاس از نظر دهی شما');
                onOpinionSuccess(selectedItem._id, rate)
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
            open={isModalOpinionOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isModalOpinionOpen}>
                {
                    selectedItem?.id !== '' &&
                    <Box sx={ModalStyle} className='rounded-3xl'>

                        <div className='mb-4'>
                            <span className='text-red-600'> * </span>
                            نظر خود را بنویسید
                            <span className='text-red-600'> * </span>
                        </div>

                        <TextField
                            value={comment}
                            fullWidth
                            name="comment"
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

                        <Box className='flex mt-3 gap-2 justify-center'>
                            {
                                [1, 2, 3, 4, 5].map(i => {
                                    if (i <= rate)
                                        return <FaStar key={i} onClick={() => setRate(i)} className='text-red-500' style={{ width: '30px', height: '30px' }} />
                                    else return <CiStar key={i} onClick={() => setRate(i)} color='#eab308' style={{ width: '30px', height: '30px' }} />
                                })
                            }
                        </Box>

                        <div className='mt-5 flex justify-end gap-2'>
                            <Button onClick={submit} variant='outlined'
                                className='p-1 m-1'
                                sx={{ color: 'green', borderColor: 'green' }}>
                                ارسال نظر
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