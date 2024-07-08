
import { Box, Snackbar, TextField, Typography } from '@mui/material'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import moment from 'moment'
import _ from 'lodash'

interface Props {
  messages: any[]
  room: object
}

const ChatContent: FC<Props> = ({ messages, room }) => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const user = usePage().props.auth.user
  const { errors } = usePage().props
  useEffect(() => {
    if (!_.isEmpty(errors)) {
      setOpen(true)
    }
  }, [errors])
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const verifyUser = (userId: string): boolean => {
    return userId === user.id
  }

  const handleSubmit = (e): void => {
    e.preventDefault()

    router.post('/message', { message, room_id: room.id, user_id: user.id }, {
      preserveState: true,
      replace: true,
      onError: (error) => {
        console.log(error)
      },
      onSuccess: () => {
        setMessage('')
      }
    })
  }

  const onchangeMessage = useCallback((e) => {
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
                  {moment(message.created_at).calendar()}
                </Typography>
              </Box>
              <Typography variant='body1'>
                {message.message}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: 4, backgroundColor: '#EEEEEE', padding: 2, borderTop: '1px solid #CCC' }}>
        <Box component='form' onSubmit={handleSubmit} autoComplete='off' sx={{ mx: 2, mt: 3 }}>
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
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errors.error}
      />
    </Box>
  )
}

export default ChatContent
