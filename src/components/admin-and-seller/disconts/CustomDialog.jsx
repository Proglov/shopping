import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import React from 'react'

export default function CustomDialog({ onClose, open, title, desc, warning }) {


    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {desc}
                    {
                        !!warning &&
                        <Box>
                            <Typography color='red'>
                                هشدار !
                            </Typography>
                            <Typography className='text-yellow-600'>
                                {warning}
                            </Typography>
                        </Box>

                    }
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
