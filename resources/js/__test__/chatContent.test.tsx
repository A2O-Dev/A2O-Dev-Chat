import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { usePage, router } from '@inertiajs/react'
import ChatContent from '../Components/ChatContent'
import { Message, Room } from '../interfaces/app'

jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  usePage: jest.fn(),
  router: { post: jest.fn() }
}))

const date = new Date().toString()
const mockMessages: Message[] = [
  { id: 1, message: 'Hello', user_id: 1, room_id: 1, updated_at: date, user: { id: 1, name: 'User1', created_at: date, updated_at: date, email: 'email@email.com', email_verified_at: date }, created_at: new Date().toString() },
  { id: 2, message: 'Hi', room_id: 1, user_id: 2, updated_at: date, user: { id: 2, name: 'User2', created_at: date, updated_at: date, email: 'email@email.com', email_verified_at: date }, created_at: new Date().toString() }
]

const mockRoom: Room = {
  id: 1,
  name: 'Room1',
  updated_at: date,
  created_at: date,
  messages: [
    { id: 1, message: 'Hello', user_id: 1, room_id: 1, updated_at: date, user: { id: 1, name: 'User1', created_at: date, updated_at: date, email: 'email@email.com', email_verified_at: date }, created_at: new Date().toString() },
    { id: 2, message: 'Hi', room_id: 1, user_id: 2, updated_at: date, user: { id: 2, name: 'User2', created_at: date, updated_at: date, email: 'email@email.com', email_verified_at: date }, created_at: new Date().toString() }
  ],
  notifications: 2
}
const mockUsePage = usePage as jest.Mock

describe('ChatContent', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn()
    mockUsePage.mockReturnValue({
      component: 'Dashboard',
      url: '/dashboard/1',
      version: '',
      scrollRegions: [],
      rememberedState: {},
      props: {
        auth: { user: { id: 1, name: 'User1' } },
        errors: {}
      }
    } as any)
  })

  it('renders messages correctly', () => {
    render(<ChatContent messages={mockMessages} room={mockRoom} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi')).toBeInTheDocument()
  })

  it('does not show error Message when there are no errors', () => {
    mockUsePage.mockReturnValueOnce({
      component: 'ChatContent',
      url: '/dashboard/1',
      version: '',
      scrollRegions: [],
      rememberedState: {},
      props: {
        auth: { user: { id: 1, name: 'User1' } },
        errors: {}
      }
    } as any)

    render(<ChatContent messages={mockMessages} room={mockRoom} />)

    expect(screen.queryByText('Error message')).not.toBeInTheDocument()
  })

  it('sends a message on form submit', () => {
    render(<ChatContent messages={mockMessages} room={mockRoom} />)
    const input = screen.getByPlaceholderText('Type a message')
    const form = screen.getByTestId('chat-form')

    fireEvent.change(input, { target: { value: 'New message' } })
    fireEvent.submit(form)

    expect(router.post).toHaveBeenCalledWith('/message', {
      message: 'New message',
      room_id: mockRoom.id,
      user_id: 1
    }, {
      preserveState: true,
      replace: true,
      onError: expect.any(Function),
      onSuccess: expect.any(Function)
    })
  })

  it('shows error message when errors exist', () => {
    mockUsePage.mockReturnValue({
      component: 'ChatContent',
      url: '/dashboard/1',
      version: '',
      scrollRegions: [],
      rememberedState: {},
      props: {
        auth: { user: { id: 1, name: 'User1' } },
        errors: { error: 'Error message' }
      }
    })

    render(<ChatContent messages={mockMessages} room={mockRoom} />)

    const errorMessage = screen.getByText('Error message')
    expect(errorMessage).toBeInTheDocument()
  })
})
