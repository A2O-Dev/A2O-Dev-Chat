import { CheckboxProps, Checkbox as MuiCheckbox } from '@mui/material'
import { FC } from 'react'

const Checkbox: FC<CheckboxProps> = (props) => {
  return <MuiCheckbox {...props} />
}
export default Checkbox
