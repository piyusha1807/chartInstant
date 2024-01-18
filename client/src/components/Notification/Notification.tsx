import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from 'react-redux';

export default function Notification({ children }: any) {
  const notification = useSelector((state: any) => state.notification);
  const [alertOpt, setAlertOpt] = useState({
    type: 'info',
    message: '',
    timeOut: 3000,
    showAlert: false,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { type, message, timeOut, showAlert } = notification;
    setAlertOpt({ type, message, timeOut, showAlert });
    setOpen(showAlert);
  }, [notification]);

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getAlertTitle = () => {
    switch (alertOpt.type) {
      case 'error':
        return 'Error';
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Info';
      default:
        return 'Info';
    }
  };

  const getAlertSeverity = () => {
    switch (alertOpt.type) {
      case 'error':
        return 'error';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={alertOpt.timeOut}
        onClose={handleClose}
      >
        <Alert
          onClose={(e: any) => handleClose(e, '')}
          severity={getAlertSeverity()}
          sx={{ width: '100%' }}
        >
          <AlertTitle>
            <strong>{getAlertTitle()}</strong>
          </AlertTitle>
          {alertOpt.message}
        </Alert>
      </Snackbar>
    </>
  );
}
