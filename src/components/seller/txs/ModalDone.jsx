"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { ModalDoneContext } from './TXTable';
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
        setOperatingID,
        setOperatingError,
        isModalDoneOpen,
        setIsModalDoneOpen,
        selectedItem
    } = useContext(ModalDoneContext)
    const handleClose = () => setIsModalDoneOpen(false);

    const doneItem = async () => {
        try {
            handleClose()
            setOperatingID(selectedItem?._id);
            await TXDone({ id: selectedItem?._id })

        } catch (error) {
            setOperatingError(error.message)
        } finally {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            setTimeout(() => {
                setOperatingError(null)
                setOperatingID(null)
            }, 5000);
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
                            <Button onClick={() => { doneItem() }} variant='outlined'
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