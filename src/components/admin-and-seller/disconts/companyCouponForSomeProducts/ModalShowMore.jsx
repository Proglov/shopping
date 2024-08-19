"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalShowMoreOpen } from '../../redux/reducers/discounts/companyCouponForSomeProducts';
import { GradientCircularProgress } from '@/app/loading';
import { Typography } from '@mui/material';

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

export default function ModalShowMore() {
    const dispatch = useDispatch();

    const { isShowMoreLoading, isModalShowMoreOpen, showMoreProducts: products } = useSelector((state) => state.companyCouponForSomeProducts);

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
                            محصولات منتخب این طرح:
                        </Typography>

                        <Box className='mt-5'>
                            {isShowMoreLoading ?
                                <GradientCircularProgress />
                                :
                                <>
                                    {
                                        products.map((product, index) => (
                                            <Typography key={product._id} className={`${index !== 0 && 'pt-2'}`}>
                                                {product.name}
                                            </Typography>
                                        ))
                                    }
                                </>
                            }
                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </>
    );
}