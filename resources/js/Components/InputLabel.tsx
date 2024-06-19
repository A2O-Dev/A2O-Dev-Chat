import { Typography } from '@mui/material'
import { FC, LabelHTMLAttributes } from 'react'

const InputLabel: FC<LabelHTMLAttributes<HTMLLabelElement> & { value?: string }> = ({ value, children, ...props }) => {
  return (
    <Typography
      variant='body1' {...props} sx={{
        display: 'block',
        fontWeight: '500',
        fontSize: '0.875rem',
        color: '#4B5563'
      }}
    >
      {value || children}
    </Typography>
  )
}
export default InputLabel
