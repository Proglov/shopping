"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalConfirmOpen, setSelectedId, setOperatingError } from '../redux/reducers/comments';
import { validateCommentToServer } from '../redux/globalAsyncThunks';
import { addComment } from '../redux/reducers/comments';

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

export default function ModalConfirm() {
    const dispatch = useDispatch();
    const {
        isModalConfirmOpen,
        selectedId
    } = useSelector((state) => state.comments);

    const handleClose = () => {
        dispatch(setIsModalConfirmOpen(false));
        dispatch(setSelectedId(''));
    }


    const ConfirmItem = async () => {
        try {
            const res = dispatch(validateCommentToServer(selectedId))
            res.then(result => dispatch(addComment(result.payload?.comment)))
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
                open={isModalConfirmOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isModalConfirmOpen}>
                    <Box sx={ModalStyle} className='rounded-3xl'>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            آیا از تایید این کامنت مطمئن هستید؟
                        </Typography>

                        <div className='mt-2 flex justify-between'>
                            <Button onClick={() => { ConfirmItem(); handleClose() }} variant='outlined'
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