import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import PersonIcon from '@mui/icons-material/Person'
import { ReactElement, FC } from 'react'
import ApplicationLogo from './ApplicationLogo'
import NavLinkSidebar from './NavLinkSidebar'
import { User } from '@/types'
import { Logout } from '@mui/icons-material'
import { Badge, Box, Typography } from '@mui/material'

interface MenuItem {
  id: number
  href: string
  text: string
  icon: ReactElement
  notifications: number
}

const menuItems: MenuItem[] = [
  { id: 1, href: 'dashboard', text: 'Dashboard', icon: <MailIcon fontSize='inherit' />, notifications: 0 },
  { id: 2, href: 'chat', text: 'Chats', icon: <InboxIcon fontSize='inherit' />, notifications: 43 }
]

interface SidebarProps {
  user: User
}

const Sidebar: FC<SidebarProps> = ({ user }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', color: 'white' }}>
      <Box sx={{ padding: 4 }}>
        <ApplicationLogo />
      </Box>

      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center'
        }}
      >
        {menuItems.map((item, index) => (
          <NavLinkSidebar key={item.id} href={route(item.href)} as='button' active={route().current(item.href)}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                variant='h4' component='div'
              >
                {item.icon}
              </Typography>
              <Typography>
                {item.text}
              </Typography>
              {item.notifications > 0 && (
                <Badge
                  badgeContent={item.notifications}
                  color='error'
                  sx={{
                    backgroundColor: '#ff7a55',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '0.25rem',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 0,
                    right: 0
                  }}
                />
              )}
            </Box>
          </NavLinkSidebar>
        ))}

        <NavLinkSidebar href={route('profile.edit')} as='button' active={route().current('profile.edit')}>
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
            <Typography variant='h4' component='div'>
              <PersonIcon fontSize='inherit' />
            </Typography>
            <Typography>Profile</Typography>
          </Box>
        </NavLinkSidebar>

        <NavLinkSidebar href={route('logout')} method='post' as='button' active={route().current('logout')}>
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
            <Typography variant='h4' component='div'>
              <Logout fontSize='inherit' />
            </Typography>
            <Typography>Log Out</Typography>
          </Box>
        </NavLinkSidebar>
      </Box>
    </Box>
  )
}

export default Sidebar
