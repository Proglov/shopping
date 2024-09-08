import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    dialog: {
        position: 'absolute',
        left: '50%',
        top: '15%',
        transform: 'translateX(-56%)',
        width: '90%'
    }
});

export default function CustomDialog({ onClose, open, title, desc, warning }) {
    const classes = useStyles();


    return (
        <Dialog onClose={onClose} open={open}
            classes={{
                paper: classes.dialog
            }}>
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
