import { FC } from 'react'
import { Alert, Box, Button, TextField, Typography, Modal } from '@mui/material'
import { ErrorProps } from '@/interfaces/app'

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

const UserValidation: FC<UserValidationProps> = ({ open, onClose, email, setEmail, handleSubmit, openError, setOpenError, errors }) => {
  return (
    <Modal open={open} onClose={onClose}>
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
    </Modal>
  )
}

export default UserValidation
