import { FC, useState } from 'react'
import { Alert, Box, Button, TextField, Typography, Modal } from '@mui/material'
import { ErrorProps } from '@/interfaces/app'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from './CustomTabPanel';
import MultipleSelect from './MultipleSelect';

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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const UserValidation: FC<UserValidationProps> = ({ open, onClose, email, setEmail, handleSubmit, openError, setOpenError, errors }) => {
  const [tabValue, setTabValue] = useState(0)
  const [roomName, setRoomName] = useState('')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
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
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #ccc',
        boxShadow: 24,
        py: 2
      }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Direct Message" {...a11yProps(0)} />
          <Tab label="Create Room" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0} >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
      >
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
              bgcolor: '#055ccf'
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
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
      >
      <TextField
          label='Room Name'
          variant='outlined'
          type='text'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          fullWidth
        />
        <MultipleSelect list={[{id:1, value: 'uno'}, {id:2, value: 'dos'}]} label='Users'/>
        <Button
          variant='outlined'
          onClick={handleSubmit}
          sx={{
            bgcolor: '#0049A8',
            color: '#fff',
            alignSelf: 'flex-end',
            '&:hover': {
              bgcolor: '#055ccf'
            }
          }}
        >
          Register
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
        </Box>
      </CustomTabPanel>
        
        {/* <Tabs aria-label="Basic tabs" defaultValue={0}  >
      <TabsList>
        <Tab value={0} variant="solid"
      color="primary"
      disableIndicator >Direct Message</Tab>
        <Tab value={1}>New Room</Tab>
      </TabsList>
      <TabPanel value={0}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
      >
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
        </Box>
        </TabPanel>
      <TabPanel value={1}>CreateRooms</TabPanel>
    </Tabs> */}
      </Box>
      
    
    </Modal>
  )
}

export default UserValidation
