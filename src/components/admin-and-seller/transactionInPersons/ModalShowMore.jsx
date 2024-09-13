"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { setIsModalShowMoreOpen } from '../redux/reducers/transactionInPersons';
import { convertToFarsiNumbers } from '@/utils/funcs';

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: '0px 0px 10px 1px blue',
    p: 4,
};

export default function ModalShowMore({ which }) {
    const dispatch = useDispatch();

    const { isModalShowMoreOpen, selectedItem } = useSelector((state) => state.transactionInPersons);

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
                    <Box sx={ModalStyle} className='rounded-3xl text-center'>

                        <Typography className='text-start'>
                            محصولات خریداری شده:
                        </Typography>

                        <Box className='mt-5'>
                            {
                                selectedItem?.boughtProducts?.map((bp, index) => (
                                    <Typography key={bp._id} className={`${index !== 0 && 'pt-2'} flex justify-evenly`}>
                                        <Link className='text-purple-600 underline' href={(which === 'Seller' ? '/Seller' : '/ADMIN') + '/products/' + bp?.productId._id}>
                                            {bp.productId.name}
                                        </Link>

                                        <div>
                                            {convertToFarsiNumbers(bp.quantity)}
                                            {' '}
                                            عدد
                                        </div>

                                        <div>
                                            تخفیف:
                                            {' '}
                                            {convertToFarsiNumbers(bp.off)}
                                            {' '}
                                            درصد
                                        </div>
                                    </Typography>
                                ))
                            }
                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </>
    );
}