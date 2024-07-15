import { render, screen, fireEvent } from '@testing-library/react'
import UserValidation from '../Components/UserValidation'

describe('UserValidation Component', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    email: '',
    setEmail: jest.fn(),
    handleSubmit: jest.fn(),
    openError: false,
    setOpenError: jest.fn(),
    errors: undefined
  }

  test('renders the modal with open state', () => {
    render(<UserValidation {...defaultProps} />)

    expect(screen.getByText('Direct Message')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Validate Email/i })).toBeInTheDocument()
  })

  test('calls setEmail when input value changes', () => {
    render(<UserValidation {...defaultProps} />)

    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(defaultProps.setEmail).toHaveBeenCalledWith('test@example.com')
  })

  test('calls handleSubmit when the button is clicked', () => {
    render(<UserValidation {...defaultProps} />)

    const button = screen.getByRole('button', { name: /Validate Email/i })
    fireEvent.click(button)

    expect(defaultProps.handleSubmit).toHaveBeenCalled()
  })

  test('shows error alert when openError is true', () => {
    const props = { ...defaultProps, openError: true, errors: { email: 'Invalid email address' } }

    render(<UserValidation {...props} />)

    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
  })

  test('calls setOpenError when the alert is closed', () => {
    const props = { ...defaultProps, openError: true, errors: { email: 'Invalid email address' } }

    render(<UserValidation {...props} />)

    const alertCloseButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(alertCloseButton)

    expect(defaultProps.setOpenError).toHaveBeenCalledWith(false)
  })

  test('does not show error alert when openError is false', () => {
    render(<UserValidation {...defaultProps} />)

    expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument()
  })
})
