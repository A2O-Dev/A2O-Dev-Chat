import { render, screen, fireEvent } from '@testing-library/react'
import NewRoom from '../Components/NewRoom'

describe('NewRoom Component', () => {
  const defaultProps = {
    form: { name: '' },
    onChange: jest.fn(),
    handleSubmit: jest.fn(),
    users: [],
    errors: undefined
  }

  test('renders NewRoom correctly', () => {
    render(<NewRoom {...defaultProps} />)

    expect(screen.getByLabelText('Room Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument()
  })

  test('calls onChange when input value changes', () => {
    render(<NewRoom {...defaultProps} />)

    const roomNameInput = screen.getByLabelText('Room Name')
    fireEvent.change(roomNameInput, { target: { value: 'New Room' } })

    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.anything())
  })

  test('calls handleSubmit when the button is clicked', () => {
    render(<NewRoom {...defaultProps} />)

    const button = screen.getByRole('button', { name: /Register/i })
    fireEvent.click(button)

    expect(defaultProps.handleSubmit).toHaveBeenCalled()
  })

  test('shows error message when errors are provided', () => {
    const props = {
      ...defaultProps,
      errors: { name: 'Invalid room name' }
    }

    render(<NewRoom {...props} />)

    expect(screen.getByText('Invalid room name')).toBeInTheDocument()
  })
})
