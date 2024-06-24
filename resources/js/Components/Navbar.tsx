import { Link } from '@inertiajs/react'
import PersonIcon from '@mui/icons-material/Person'
import { FC } from 'react'
import ApplicationLogo from './ApplicationLogo'
import { User } from '@/types'
import { Logout } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import NavLink from './NavLink'

interface NavbarProps {
  user: User
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '70px', padding: '15px', color: '#3c3a3a' }}>
      <Link href={route('dashboard')} as='button'>
        <ApplicationLogo fill='#000' width={50} height={50}/>
      </Link>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
          padding: '10px'
        }}
      >
        <NavLink href={route('profile.edit')} as='button' active={route().current('profile.edit')}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography component='div'>
              <PersonIcon fontSize='inherit' />
            </Typography>
            <Typography>Profile</Typography>
          </Box>
        </NavLink>

        <NavLink href={route('logout')} method='post' as='button' active={route().current('logout')}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography component='div'>
              <Logout fontSize='inherit' />
            </Typography>
            <Typography>Log Out</Typography>
          </Box>
        </NavLink>
      </Box>
    </Box>
  )
}

export default Navbar
