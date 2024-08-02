import { FC, useState } from 'react'
import { Alert, Box, Button, TextField, Modal } from '@mui/material'
import { ErrorProps, User } from '@/interfaces/app'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CustomTabPanel from './CustomTabPanel'
import MultipleSelect from './MultipleSelect'

interface NewMessageProps {
  open: boolean
  onClose: () => void
  email: string
  setEmail: (email: string) => void
  handleSubmit: (option: number, list?: string[], name?: string) => void
  openError: boolean
  setOpenError: (value: boolean) => void
  errors: ErrorProps | undefined
  users: User[]
}

function a11yProps (index: number): any {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
const NewMessage: FC<NewMessageProps> = ({
  users,
  open,
  onClose,
  email,
  setEmail,
  handleSubmit,
  openError,
  setOpenError,
  errors
}) => {
  const [tabValue, setTabValue] = useState(0)
  const [roomName, setRoomName] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const handleChange: (
    event: React.SyntheticEvent,
    newValue: number
  ) => void = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  return (
    <Modal open={open} onClose={onClose} sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
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
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Direct Message' {...a11yProps(0)} />
            <Tab label='Create Room' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <Box
            sx={{
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
              onClick={() => handleSubmit(1)}
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
          <Box
            sx={{
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
            <MultipleSelect
              list={users}
              label='Users'
              selected={selected}
              setSelected={setSelected}
            />
            <Button
              variant='outlined'
              onClick={() => handleSubmit(2, selected, roomName)}
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
                {errors?.name}
              </Alert>
            )}
          </Box>
        </CustomTabPanel>
      </Box>
    </Modal>
  )
}

export default NewMessage
