import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Box, styled } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  position: 'absolute',
  top: '0 !important',
  left: '0 !important',
  alignItems: 'start',
  width: '100%',
  height: '60px',

  '& .MuiPaper-root': {
    borderRadius: '8px',
    padding: '16px',
    color: 'black',
    fontWeight: 'bold',
    boxShadow: theme.shadows[5],
    backgroundColor: '#fff',
    fontSize: '16px',
    lineHeight: '20px',
  },

  '& .MuiAlert-icon': {
    display: 'none',
  },
}));

interface CustomSnackbarProps {
  open: boolean;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
}) => {
  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => onClose()}
    >
      <Alert onClose={onClose} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'start', columnGap: '12px' }}>
          <Box>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.8656 2.99996L22.3916 19.5C22.4794 19.652 22.5256 19.8244 22.5256 20C22.5256 20.1755 22.4794 20.3479 22.3916 20.4999C22.3038 20.652 22.1776 20.7782 22.0256 20.866C21.8736 20.9537 21.7011 21 21.5256 21H2.47361C2.29807 21 2.12563 20.9537 1.97362 20.866C1.8216 20.7782 1.69537 20.652 1.6076 20.4999C1.51984 20.3479 1.47363 20.1755 1.47363 20C1.47363 19.8244 1.51984 19.652 1.60761 19.5L11.1336 2.99996C11.2214 2.84795 11.3476 2.72172 11.4996 2.63396C11.6516 2.5462 11.8241 2.5 11.9996 2.5C12.1751 2.5 12.3476 2.5462 12.4996 2.63396C12.6516 2.72172 12.7778 2.84795 12.8656 2.99996ZM10.9996 16V18H12.9996V16H10.9996ZM10.9996 8.99996V14H12.9996V8.99996H10.9996Z'
                fill='#F13C59'
              />
            </svg>
          </Box>
          <Box>Внимание! Лоси! <span style={{ fontSize: '14px', fontWeight: 500, color: '#55575E' }}>(Возможно олени)</span></Box>
        </Box>
      </Alert>
    </StyledSnackbar>
  );
};

export default CustomSnackbar;
