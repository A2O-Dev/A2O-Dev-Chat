import { FC, PropsWithChildren, ReactNode } from 'react'
import { User } from '@/types'
import { Box } from '@mui/material'
import Navbar from '@/Components/Navbar'

const Authenticated: FC<PropsWithChildren<{ user: User, header?: ReactNode }>> = ({ user, header, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        backgroundColor: '#fff',
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      <Navbar user={user} />
      <Box
        sx={{
          backgroundColor: '#fff',
          height: 'calc(100vh - 70px)',
          overflow: 'hidden'
        }}
      >

        {header !== null && (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
            {header}
          </Box>
        )}

        <Box sx={{ width: '100%', height: 'calc(100vh - 150px)', backgroundColor: 'white' }}>{children}</Box>
      </Box>
    </Box>
  )
}

export default Authenticated
