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
        onClick={() => handleSubmit(2, selected, form?.name)}
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
      {/* openError && (
              <Alert
                onClose={() => setOpenError(false)}
                severity='error'
                variant='filled'
                sx={{ width: '100%' }}
              >
                {errors?.name}
              </Alert>
            ) */}
    </Box>
  )
}

export default NewRoom
