import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'

export function useForm<T = {}> (initialState: T): {
  setForm: Dispatch<SetStateAction<T>>
  form: T
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSelectChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => void
  reset: () => void
} {
  const [form, setForm] = useState<T>(initialState)

  const reset: () => void = () => {
    setForm(initialState)
  }

  const onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value
    })
  }

  const onSelectChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => void = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  return {
    setForm,
    form,
    onChange,
    onSelectChange,
    reset
  }
}
