"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalDeleteOpen, setSelectedId, setOperatingError, deleteConfirmedCommentFromServer } from '../redux/reducers/comments';
import { deleteCommentFromServer } from '../redux/globalAsyncThunks';

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
    const dispatch = useDispatch();
    const {
        isModalDeleteOpen,
        selectedId,
        isConfirmedTableOperating
    } = useSelector((state) => state.comments);

    const handleClose = () => {
        dispatch(setIsModalDeleteOpen(false));
        dispatch(setSelectedId(''));
    }


    const deleteItem = async () => {
        try {
            if (!isConfirmedTableOperating) {
                dispatch(deleteCommentFromServer(selectedId))
            }
            else {
                dispatch(deleteConfirmedCommentFromServer(selectedId))
            }
            dispatch(setSelectedId(''));
        } catch (error) {
            dispatch(setOperatingError(error.message))
        } finally {
            setTimeout(() => {
                dispatch(setOperatingError(''))
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
                            آیا از حذف این کامنت مطمئن هستید؟
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