import { PropsWithChildren, ReactNode } from 'react'
import { User } from '@/types'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Navbar from '@/Components/Navbar'

const Authenticated = ({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#fff'
      }}
    >
      <Navbar user={user} />
      <Box
        sx={{
          backgroundColor: '#0049A8',
          height: 'calc(100vh - 60px)',
          overflow: 'hidden'
        }}
      >

        {header && (
          <Box sx={{ display: 'flex', height: '80px' }}>
            <Box
              sx={{
                width: '30%',
                height: '100%',
                backgroundColor: '#0049A8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingInline: 5,
                borderBottom: '#002C87 1px solid'
              }}
            >
              <Box sx={{ color: '#fff', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TextField
                  sx={{ backgroundColor: '#577FC2', color: '#fff' }}
                  variant='outlined'
                  placeholder='Search...'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ width: '70%', height: '100%', backgroundColor: '#EEEEEE' }}>
              <Typography
                variant='h2'
                sx={{
                  fontWeight: 'fontWeightBold',
                  fontSize: '1.25rem',
                  color: 'text.secondary',
                  padding: 3,
                  textAlign: 'center'
                }}
              >
                {header}
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ width: '100%', height: 'calc(100vh - 140px)', backgroundColor: 'white' }}>{children}</Box>
      </Box>
    </Box>
  )
}

export default Authenticated
