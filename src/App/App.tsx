import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useToast } from 'hooks/useToast';

import BaseRouter from './Router';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const toast = useToast();
  React.useEffect(() => {
    // 全体のエラーハンドラー
    window.addEventListener('unhandledrejection', (event) => {
      const { status, data } = event?.reason?.response;
      const errors = data?.errors || [
        {
          message: '',
        },
      ];

      console.log('event', event);
      event.preventDefault();
      console.warn(`UNHANDLED PROMISE REJECTION: ${event?.reason}`);

      if (status === 401) {
        // 例：セッション切れなどの特別な処理はここで制御
        return;
      }
      toast.show(event?.reason, 'error');
    });
  }, [toast]);

  return (
    <Box className={`app`}>
      <Router>
        <BaseRouter />
      </Router>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={toast.open}
        autoHideDuration={3000}
        onClose={toast.hide}
        action={
          <IconButton size="small" color="inherit" onClick={toast.hide}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={toast.hide} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
