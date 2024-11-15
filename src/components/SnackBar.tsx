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
  },

  '& .MuiAlert-icon': {
    display: 'none'
  }
}));

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  onClose,
}) => {
  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => onClose()}
    >
      <Alert onClose={onClose} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '6px'}}>
          <Box>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.9955 2.92496L12.9955 2.92494C12.8945 2.75016 12.7494 2.60499 12.5746 2.50406C12.3998 2.40313 12.2014 2.35 11.9996 2.35C11.7978 2.35 11.5994 2.40313 11.4246 2.50406C11.2498 2.60499 11.1047 2.75015 11.0037 2.92494L11.0037 2.92496L1.47771 19.425L1.47771 19.425H1.47771C1.37677 19.5998 1.32363 19.7981 1.32363 20C1.32363 20.2018 1.37678 20.4001 1.4777 20.5749H1.4777C1.57865 20.7498 1.72381 20.8949 1.8986 20.9959L1.89866 20.9959C2.07341 21.0967 2.27169 21.15 2.47361 21.15H21.5256C21.7275 21.15 21.9258 21.0967 22.1006 20.9959L22.1006 20.9959C22.2754 20.8949 22.4205 20.7498 22.5215 20.5749C22.6225 20.4001 22.6756 20.2018 22.6756 20C22.6756 19.7981 22.6225 19.5998 22.5215 19.425C22.5215 19.425 22.5215 19.425 22.5215 19.425L12.9955 2.92496ZM12.8496 17.85H11.1496V16.15H12.8496V17.85ZM12.8496 13.85H11.1496V9.14996H12.8496V13.85Z'
                fill='white'
                stroke='#D70000'
                stroke-width='1'
              />
              <rect x='11' y='9' width='2' height='5' fill='black' />
              <path d='M11 16H13V18H11V16Z' fill='black' />
            </svg>
          </Box>
          <Box>{message}</Box>
        </Box>
      </Alert>
    </StyledSnackbar>
  );
};

export default CustomSnackbar;
