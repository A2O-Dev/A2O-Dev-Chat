import { render, screen, fireEvent } from '@testing-library/react'
import EmailValidation from '../Components/EmailValidation'

describe('EmailValidation Component', () => {
  const defaultProps = {
    form: { email: '' },
    onChange: jest.fn(),
    handleSubmit: jest.fn(),
    errors: undefined
  }

  test('renders EmailValidation correctly', () => {
    render(<EmailValidation {...defaultProps} />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Validate Email/i })).toBeInTheDocument()
  })

  test('calls onChange when input value changes', () => {
    render(<EmailValidation {...defaultProps} />)

    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.anything())
  })

  test('calls handleSubmit when the button is clicked', () => {
    render(<EmailValidation {...defaultProps} />)

    const button = screen.getByRole('button', { name: /Validate Email/i })
    fireEvent.click(button)

    expect(defaultProps.handleSubmit).toHaveBeenCalled()
  })

  test('shows error message when errors are provided', () => {
    const props = {
      ...defaultProps,
      errors: { email: 'Invalid email address' }
    }

    render(<EmailValidation {...props} />)

    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
  })
})
