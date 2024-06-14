import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import PersonIcon from '@mui/icons-material/Person'
import { ReactElement, FC } from 'react'
import ApplicationLogo from './ApplicationLogo'
import NavLinkSidebar from './NavLinkSidebar'
import { User } from '@/types'
import Dropdown from './Dropdown'
import { Divider } from '@mui/material'
import { Logout } from '@mui/icons-material'

interface MenuItem {
  href: string
  text: string
  icon: ReactElement
  notifications: number
}

const menuItems: MenuItem[] = [
  { href: 'dashboard', text: 'Dashboard', icon: <MailIcon />, notifications: 0 },
  { href: 'chat', text: 'Chats', icon: <InboxIcon />, notifications: 43 }
]

interface SidebarProps {
  user: User
}

const Sidebar: FC<SidebarProps> = ({ user }) => {
  return (
    <div className='w-full h-full text-white'>
      <div className='p-4'>
        <ApplicationLogo />
      </div>

      <div className='w-full text-center flex flex-col gap-5 items-center'>
        {menuItems.map((item, index) => (
          <NavLinkSidebar key={index} href={route(item.href)} active={route().current(item.href)}>
            <div className='relative flex flex-col justify-center items-center'>
              <p className='text-4xl'>
                {item.icon}
              </p>
              <p>{item.text}</p>
              {item.notifications > 0 && (
                <span className='bg-[#ff7a55] text-white text-xs p-1 rounded-full absolute top-0 right-0'>
                  {item.notifications}
                </span>
              )}
            </div>
          </NavLinkSidebar>
        ))}

        <NavLinkSidebar href={route('profile.edit')} active={route().current('profile.edit')}>
          <div className='relative flex flex-col justify-center items-center w-full'>
            <p className='text-4xl'>
              <PersonIcon />
            </p>
            <p>Profile </p>
          </div>
        </NavLinkSidebar>

        <NavLinkSidebar href={route('logout')} method='post' as='button' active={route().current('logout')}>
          <div className='relative flex flex-col justify-center items-center w-full'>
            <p className='text-4xl'>
              <Logout />
            </p>
            <p>Log Out</p>
          </div>
        </NavLinkSidebar>
      </div>
    </div>
  )
}

export default Sidebar
