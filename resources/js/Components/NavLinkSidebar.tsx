import { Link, InertiaLinkProps } from '@inertiajs/react'
import { FC } from 'react'

const NavLinkSidebar: FC<InertiaLinkProps & { active: boolean }> = ({ active = false, children, ...props }) => {
  return (
    <Link
      {...props}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 5,
        borderRadius: '4px',
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.25rem',
        transition: 'all 0.15s ease-in-out',
        outline: 'none',
        ...(active
          ? {
              backgroundColor: '#464646',
              color: 'white'
            }
          : {
              border: '1px solid transparent',
              color: '#898787',
              '&:hover': {
                color: '#200'
              }
            })
      }}
    >
      {children}
    </Link>
  )
}
export default NavLinkSidebar
