import { Typography } from '@mui/material'
import { FC, HTMLAttributes } from 'react'

const InputError: FC<HTMLAttributes<HTMLParagraphElement> & { message?: string }> = ({ message, ...props }) => {
  return message
    ? (
      <Typography
        {...props}
        sx={{
          fontSize: '0.875rem',
          color: '#dc2626'
        }}
      >
        {message}
      </Typography>
      )
    : null
}
export default InputError
