
import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../redux/Store';
import {setError} from '../redux/ErrorSlice';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default () => {
    const [open, setOpen] = useState(false);
    const error = useSelector((state: StoreType) => state.ErrorMessage.errorMessage);
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setError(''))
        setOpen(false);
    };

    return (
        <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        onClose={handleClose} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning at the top
    >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
        </Alert>
    </Snackbar>
    );
};

