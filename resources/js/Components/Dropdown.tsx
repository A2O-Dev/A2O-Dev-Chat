import { useState, createContext, useContext, Fragment, PropsWithChildren, Dispatch, SetStateAction, FC } from 'react'
import { Link, InertiaLinkProps } from '@inertiajs/react'
import { Transition } from '@headlessui/react'

const DropDownContext = createContext<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  toggleOpen: () => void
}>({
      open: false,
      setOpen: () => {},
      toggleOpen: () => {}
    })

const Dropdown: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen: () => void = () => {
    setOpen((previousState) => !previousState)
  }

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className='relative'>{children}</div>
    </DropDownContext.Provider>
  )
}

const Trigger: FC<PropsWithChildren> = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext)

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />}
    </>
  )
}

const Content: FC<PropsWithChildren<{ align?: 'left' | 'right', width?: '48', contentClasses?: string }>> = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', children }) => {
  const { open, setOpen } = useContext(DropDownContext)

  let alignmentClasses = 'origin-top'

  if (align === 'left') {
    alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0'
  } else if (align === 'right') {
    alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0'
  }

  let widthClasses = ''

  if (width === '48') {
    widthClasses = 'w-48'
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <div
          className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
          onClick={() => setOpen(false)}
        >
          <div className={'rounded-md ring-1 ring-black ring-opacity-5 ' + contentClasses}>{children}</div>
        </div>
      </Transition>
    </>
  )
}

const DropdownLink: FC<InertiaLinkProps> = ({ className = '', children, ...props }) => {
  return (
    <Link
      {...props}
      className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ' +
                className
            }
    >
      {children}
    </Link>
  )
}

// @ts-expect-error
Dropdown.Trigger = Trigger
// @ts-expect-error
Dropdown.Content = Content
// @ts-expect-error
Dropdown.Link = DropdownLink

export default Dropdown
