import { render, screen, fireEvent } from '@testing-library/react'
import NewMessage from '../Components/NewMessage'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { User } from '@/interfaces/app'

describe('NewMessage Component', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    email: '',
    setEmail: jest.fn(),
    handleSubmit: jest.fn(),
    openError: false,
    setOpenError: jest.fn(),
    errors: undefined,
    users: []
  }
  const theme = createTheme()

  test('renders the modal with open state', () => {
    render(<NewMessage {...defaultProps} />)

    expect(screen.getByText('Direct Message')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Validate Email/i })
    ).toBeInTheDocument()
  })

  test('calls setEmail when input value changes', () => {
    render(<NewMessage {...defaultProps} />)

    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(defaultProps.setEmail).toHaveBeenCalledWith('test@example.com')
  })

  test('calls handleSubmit when the button is clicked', () => {
    render(<NewMessage {...defaultProps} />)

    const button = screen.getByRole('button', { name: /Validate Email/i })
    fireEvent.click(button)

    expect(defaultProps.handleSubmit).toHaveBeenCalled()
  })

  test('shows error alert when openError is true', () => {
    const props = {
      ...defaultProps,
      openError: true,
      errors: { email: 'Invalid email address' }
    }

    render(<NewMessage {...props} />)

    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
  })

  test('calls setOpenError when the alert is closed', () => {
    const props = {
      ...defaultProps,
      openError: true,
      errors: { email: 'Invalid email address' }
    }

    render(<NewMessage {...props} />)

    const alertCloseButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(alertCloseButton)

    expect(defaultProps.setOpenError).toHaveBeenCalledWith(false)
  })

  test('does not show error alert when openError is false', () => {
    render(<NewMessage {...defaultProps} />)

    expect(
      screen.queryByText('Invalid email address')
    ).not.toBeInTheDocument()
  })

  test('renders Create Room panel correctly', () => {
    const props = { ...defaultProps, open: true }
    render(
      <ThemeProvider theme={theme}>
        <NewMessage {...props} />
      </ThemeProvider>
    )

    const createRoomTab = screen.getByText('Create Room')
    fireEvent.click(createRoomTab)

    expect(screen.getByLabelText('Room Name')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Register/i })
    ).toBeInTheDocument()
  })

  test('calls handleSubmit with correct parameters in Create Room panel', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@test.com',
      created_at: '',
      email_verified_at: '',
      updated_at: ''
    }
    const props = {
      ...defaultProps,
      open: true,
      users: [user]
    }
    render(
      <ThemeProvider theme={theme}>
        <NewMessage {...props} />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText('Create Room'))

    fireEvent.change(screen.getByLabelText('Room Name'), {
      target: { value: 'New Room' }
    })
    fireEvent.click(screen.getByRole('button', { name: /Register/i }))

    expect(defaultProps.handleSubmit).toHaveBeenCalledWith(
      2,
      [],
      'New Room'
    )
  })
})
