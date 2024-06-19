import { Button } from '@mui/material'
import { ButtonHTMLAttributes, FC } from 'react'

const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ disabled, children, ...props }) => {
  return (
    <Button
      {...props}
      variant='contained'
      size='small'
      disableElevation
      disabled={disabled}
      style={{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
        backgroundColor: disabled ? '#374151' : '#1f2937',
        color: 'white',
        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: disabled ? '##374151' : '#1f2937'
        }
      }}
    >
      {children}
    </Button>
  )
}
export default PrimaryButton
