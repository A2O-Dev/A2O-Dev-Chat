import { EmailValidationProps } from "@/interfaces/app";
import { Box, Button, TextField } from "@mui/material";
import { FC } from "react";

const EmailValidation: FC<EmailValidationProps> = ({
    form, onChange, handleSubmit, errors
}) => {
    return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2
    }}
  >
    <TextField
      error={errors?.email !== undefined}
      label='Email'
      variant='outlined'
      type='email'
      name='email'
      value={form.email}
      onChange={onChange}
      fullWidth
      helperText={errors?.email}
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
  </Box>
}

export default EmailValidation
