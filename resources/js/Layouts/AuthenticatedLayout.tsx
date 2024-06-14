import { useState, PropsWithChildren, ReactNode } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link } from '@inertiajs/react'
import { User } from '@/types'
import Sidebar from '@/Components/Sidebar'

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

  return (
    <div className='min-h-screen bg-[#202022] grid grid-cols-10'>
      <div className='col-span-1'>
        <Sidebar user={user} />
      </div>
      <div className='col-span-9 bg-gray-100 rounded-xl overflow-hidden m-2'>

        {header && (
          <header className='bg-white shadow'>
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>{header}</div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </div>
  )
}
