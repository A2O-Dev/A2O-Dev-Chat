import { Button, ButtonProps } from '@mui/material'
import { FC } from 'react'

const DangerButton: FC<ButtonProps> = ({ disabled, children, ...props }) => (
  <Button
    {...props}
    disabled={disabled}
    sx={{
      backgroundColor: '#f44336',
      color: 'white',
      '&:hover': {
        backgroundColor: '#e53935'
      },
      '&:active': {
        backgroundColor: '#d32f2f'
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(244, 67, 54, 0.5)'
      },
      ...(disabled && {
        opacity: 0.5
      })
    }}
  >
    {children}
  </Button>
)

export default DangerButton
