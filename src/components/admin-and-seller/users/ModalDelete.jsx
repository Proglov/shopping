"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { UsersContext } from './UsersMain';
import Api from '@/services/withAuthActivities/user';

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

export default function ModalDelete() {
    const { deleteUser } = Api
    const { isModalDeleteOpen, setIsModalDeleteOpen, selectedItem, setSelectedItem, setOperatingError } = useContext(UsersContext)
    const handleClose = () => {
        setIsModalDeleteOpen(false);
        setSelectedItem({});
    }


    const deleteItem = async () => {
        try {
            await deleteUser({ id: selectedItem?._id })
            setSelectedItem({});
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            setOperatingError(error.message)
        } finally {
            setTimeout(() => {
                setOperatingError(null)
            }, 5000);
        }
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalDeleteOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isModalDeleteOpen}>
                    <Box sx={ModalStyle} className='rounded-3xl'>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            آیا از حذف این کاربر مطمئن هستید؟
                        </Typography>

                        <div className='mt-2 flex justify-between'>
                            <Button onClick={() => { deleteItem(); handleClose() }} variant='outlined'
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