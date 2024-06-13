import { Link, InertiaLinkProps } from '@inertiajs/react'
import { FC } from 'react'

const NavLinkSidebar: FC<InertiaLinkProps & { active: boolean }> = ({ active = false, className = '', children, ...props }) => {
  return (
    <Link
      {...props}
      className={
                'inline-flex items-center px-5 rounded-md text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                  ? 'bg-[#464646] text-white'
                  : 'border-transparent text-[#898787] hover:text-gray-200') +
                className
            }
    >
      {children}
    </Link>
  )
}
export default NavLinkSidebar
