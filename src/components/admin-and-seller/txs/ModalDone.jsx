"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { ItemsContext } from './TXMain';
import Api from '@/services/withAuthActivities/tx';

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid purple',
    boxShadow: '0px 0px 10px 1px purple',
    p: 4,
};

export default function ModalDone() {
    const { TXDone } = Api
    const {
        setOperatingError,
        isModalDoneOpen,
        setIsModalDoneOpen,
        selectedItem,
        setSelectedItem
    } = useContext(ItemsContext)
    const handleClose = () => {
        setIsModalDoneOpen(false);
        setSelectedItem({});
    }

    const doneItem = async () => {
        try {

            await TXDone({ id: selectedItem?._id })
            setTimeout(() => {
                setOperatingError(null)
                setSelectedItem({})
            }, 5000);
        } catch (error) {
            setOperatingError(error.message)
        } finally {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalDoneOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isModalDoneOpen}>
                    <Box sx={ModalStyle} className='rounded-3xl'>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            آیا از اتمام این تراکنش مطمئن هستید؟
                        </Typography>

                        <div className='mt-2 flex justify-between'>
                            <Button onClick={() => { doneItem(); handleClose() }} variant='outlined'
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
        </>
    );
}