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
          backgroundColor: '#fff',
          height: 'calc(100vh - 60px)',
          overflow: 'hidden'
        }}
      >

        {header && (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
            {header}
          </Box>
        )}

        <Box sx={{ width: '100%', height: 'calc(100vh - 140px)', backgroundColor: 'white' }}>{children}</Box>
      </Box>
    </Box>
  )
}

export default Authenticated
