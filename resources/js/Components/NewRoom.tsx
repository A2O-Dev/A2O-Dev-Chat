import { NewRoomProps } from '@/interfaces/app'
import { Box, Button, TextField } from '@mui/material'
import { FC, useState } from 'react'
import MultipleSelect from './MultipleSelect'

const NewRoom: FC<NewRoomProps> = ({
  form,
  onChange,
  handleSubmit,
  users,
  errors
}) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleRegister = (): void => {
    form.users = selected
    handleSubmit(2)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <TextField
        error={errors?.name !== undefined}
        label='Room Name'
        variant='outlined'
        type='text'
        name='name'
        value={form?.name}
        onChange={onChange}
        fullWidth
        helperText={errors?.name}
      />
      <MultipleSelect
        list={users}
        label='Users'
        selected={selected}
        setSelected={setSelected}
      />
      <Button
        variant='outlined'
        onClick={handleRegister}
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
    </Box>
  )
}

export default NewRoom
