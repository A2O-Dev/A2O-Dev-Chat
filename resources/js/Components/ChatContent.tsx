import { Box, Alert, TextField, Typography } from '@mui/material'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import moment from 'moment'
import { Auth, Message, Room } from '../interfaces/app'

interface ErrorProps {
  [key: string]: string | undefined
}
interface Props {
  messages: Message[]
  room: Room
}

const ChatContent: FC<Props> = ({ messages, room }) => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const { user } = usePage().props.auth as Auth
  const { errors } = usePage().props as { errors: ErrorProps }

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const isObjectEmpty = (obj: Record<string, unknown> | null | undefined): boolean => {
    return (obj == null) || (typeof obj === 'object' && (Object.keys(obj).length === 0))
  }

  useEffect(() => {
    if (!isObjectEmpty(errors)) {
      setOpen(true)
    }
  }, [errors])

  useEffect(() => {
    (messagesEndRef?.current as HTMLDivElement)?.scrollIntoView({ behavior: 'auto' })
  }, [messages])

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const verifyUser = (userId: number): boolean => {
    return userId === user.id
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    router.post('/message', { message, room_id: room.id, user_id: user.id }, {
      preserveState: true,
      replace: true,
      onSuccess: () => {
        setMessage('')
      }
    })
  }

  const onchangeMessage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        height: '100%',
        paddingTop: 5
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {messages?.map((message) => (
          <Box key={message.id} sx={{ display: 'flex', marginBottom: 1, justifyContent: (verifyUser(message.user_id) ? 'end' : 'start') }}>
            <Box
              sx={{
                marginLeft: (verifyUser(message.user_id) ? 3 : 1),
                marginRight: (verifyUser(message.user_id) ? 1 : 3),
                backgroundColor: (verifyUser(message.user_id) ? '#0049A8' : '#EEEEEE'),
                color: (verifyUser(message.user_id) ? '#fff' : '#000'),
                padding: 2,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: (verifyUser(message.user_id) ? 0 : 10),
                borderBottomLeftRadius: (verifyUser(message.user_id) ? 10 : 0)
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {message.user.name}
                </Typography>
                <Typography variant='body2' sx={{ color: (verifyUser(message.user_id) ? '#EEE' : 'black'), ml: 2 }}>
                  {moment(message.created_at, moment.ISO_8601).calendar()}
                </Typography>
              </Box>
              <Typography variant='body1'>
                {message.message}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ marginTop: 4, backgroundColor: '#EEEEEE', padding: 2, borderTop: '1px solid #CCC' }}>
        <form
          onSubmit={handleSubmit}
          autoComplete='off'
          data-testid='chat-form'
        >

          <TextField
            type='text'
            fullWidth
            placeholder='Type a message'
            variant='outlined'
            value={message}
            onChange={onchangeMessage}
            sx={{
              borderRadius: '10px',
              border: 0,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                borderRadius: '10px'
              },
              '& .MuiInput-underline:hover:before': {
                border: 'none !important'
              },
              backgroundColor: '#fff'
            }}
          />
        </form>
      </Box>
      {open && (
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {errors?.message}
        </Alert>
      )}
    </Box>
  )
}

export default ChatContent
