import { FC } from 'react'
import { Alert, Box, Button, TextField, Typography, Modal } from '@mui/material'
import { ErrorProps } from '@/interfaces/app'
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

interface UserValidationProps {
  open: boolean
  onClose: () => void
  email: string
  setEmail: (email: string) => void
  handleSubmit: () => void
  openError: boolean
  setOpenError: (value: boolean) => void
  errors: ErrorProps | undefined
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;

  `,
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const UserValidation: FC<UserValidationProps> = ({ open, onClose, email, setEmail, handleSubmit, openError, setOpenError, errors }) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ overflow: 'hidden'}}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #ccc',
        boxShadow: 24,
        p: 4
      }}
      >
        <Tabs defaultValue={0}>
      <TabsList>
        <Tab value={0}>Direct Message</Tab>
        <Tab value={1}>New Room</Tab>
      </TabsList>
      <TabPanel value={0}>
        <Typography sx={{ fontWeight: 'fontWeightBold', textAlign: 'center' }}>
          NEW MESSAGE
        </Typography>
        <TextField
          label='Email'
          variant='outlined'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button
          variant='outlined'
          onClick={handleSubmit}
          sx={{
            bgcolor: '#0049A8',
            color: '#fff',
            alignSelf: 'flex-end',
            '&:hover': {
              bgcolor: '#055ccf',
              color: '#fff'
            }
          }}
        >
          Validate Email
        </Button>
        {openError && (
          <Alert
            onClose={() => setOpenError(false)}
            severity='error'
            variant='filled'
            sx={{ width: '100%' }}
          >
            {errors?.email}
          </Alert>
        )}
        </TabPanel>
      <TabPanel value={1}>CreateRooms</TabPanel>
    </Tabs>
      </Box>
      
    
    </Modal>
  )
}

export default UserValidation
