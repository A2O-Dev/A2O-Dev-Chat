import { render, screen, fireEvent } from '@testing-library/react'
import NewMessage from '../Components/NewMessage'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

describe('NewMessage Component', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    setSelectedChat: jest.fn(),
    errors: undefined,
    users: []
  }
  const theme = createTheme()

  test('renders the modal with open state', () => {
    render(
      <ThemeProvider theme={theme}>
        <NewMessage {...defaultProps} />
      </ThemeProvider>
    )
    expect(screen.getByText('Direct Message')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Validate Email/i })).toBeInTheDocument()
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
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument()
  })
})
