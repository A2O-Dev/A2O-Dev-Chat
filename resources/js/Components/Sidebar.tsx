import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { ReactElement, FC } from 'react'
import ApplicationLogo from './ApplicationLogo'
import NavLinkSidebar from './NavLinkSidebar'

interface MenuItem {
  href: string
  text: string
  icon: ReactElement
  notifications: number
}

const menuItems: MenuItem[] = [
  { href: 'chats', text: 'All chats', icon: <InboxIcon />, notifications: 43 },
  { href: 'dashboard', text: 'News', icon: <MailIcon />, notifications: 0 }
]

const Sidebar: FC = () => {
  return (
    <div className='w-full h-full text-white'>
      <div className='p-4'>
        <ApplicationLogo />
      </div>

      <div className='w-full text-center'>
        {menuItems.map((item, index) => (
          <NavLinkSidebar key={index} href={route(item.href)} active={route().current(item.href)}>
            <div className='relative flex flex-col justify-center items-center w-full'>
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
      </div>
    </div>
  )
}

export default Sidebar
