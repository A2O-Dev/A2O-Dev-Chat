import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { FC, useEffect, useState } from 'react'
import { Box, Button, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from '@mui/material'
import ChatList from '@/Components/ChatList'
import ChatContent from '@/Components/ChatContent'
import { AddCircle, Menu } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import Modal from '@mui/material/Modal'
import { router, usePage } from '@inertiajs/react'
import echo from '../services/echo'

const Dashboard: FC<PageProps> = ({ auth, rooms, room, messages }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [openChatList, setOpenChatList] = useState<boolean>(false)
  const [selectedChat, setSelectedChat] = useState<number | null>(room)
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const user = usePage().props.auth.user

  useEffect(() => {
    echo.channel('chat')
      .listen('MessageSent', (e: any) => {
        if (e.message.user_id !== user.id) {
          goToChat(room?.id)
        }
      })
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setOpenChatList(false)
    }
  }, [isMobile])

  const handleSelectChat = (id: number): void => {
    setSelectedChat(id)
    goToChat(id)

    if (isMobile) {
      setOpenChatList(false)
    }
  }

  const goToChat = (id: number | undefined): void => {
    router.get(id !== undefined ? `/dashboard/${id}` : '/dashboard/', {}, {
      preserveState: true,
      replace: true,
      onError: (error) => {
        console.log(error)
      }
    })
  }

  const toggleChatList: () => void = () => {
    setOpenChatList(prevOpen => !prevOpen)
  }

  return (
    <>
      {
        open &&
          <Modal
            open={open}
            onClose={() => setOpen(false)}
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              gap: 2,
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #ccc',
              boxShadow: 24,
              p: 4
            }}
            >
              <Typography
                sx={{
                  fontWeight: 'fontWeightBold'
                }}
              >
                New Message
              </Typography>
              <TextField label='Email' variant='outlined' type='email' fullWidth />
              <Button variant='outlined'>Validate Email</Button>
            </Box>
          </Modal>
      }
      <AuthenticatedLayout
        user={auth.user}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '1920px', marginInline: 'auto', backgroundColor: '#fff' }}>
          <Box sx={{ display: 'flex', height: '80px', width: '100%', boxShadow: 3 }}>
            <Box
              sx={{
                width: isMobile ? '100%' : '25%',
                display: !isMobile || openChatList ? 'flex' : 'none',
                height: '100%',
                backgroundColor: '#0049A8',
                justifyContent: 'center',
                alignItems: 'center',
                paddingInline: 2,
                borderBottom: '#002C87 2px solid'
              }}
            >
              <Box sx={{ color: '#fff', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TextField
                  sx={{
                    backgroundColor: '#5580C5',
                    borderRadius: '5px',
                    width: '100%',
                    input: { color: '#fff' },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#fff'
                      },
                      '& .Mui-focused input': {
                        fontWeight: 'bold'
                      }
                    }
                  }}
                  variant='outlined'
                  placeholder='Search...'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon sx={{ color: '#fff' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ width: isMobile ? '100%' : '75%', display: !isMobile || !openChatList ? '' : 'none', height: '100%', backgroundColor: '#EEEEEE' }}>
              {isMobile && (
                <IconButton
                  onClick={toggleChatList}
                  sx={{ position: 'fixed' }}
                >
                  <Menu sx={{ color: '#0049A8' }} />
                </IconButton>
              )}
              <Typography
                sx={{
                  fontWeight: 'fontWeightBold',
                  color: 'text.secondary',
                  padding: 3,
                  textAlign: 'center'
                }}
              >
                {room?.name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', height: 'calc(100vh - 80px - 4rem)' }}>
            <Box sx={{
              display: openChatList || !isMobile ? 'block' : 'none',
              position: 'relative',
              width: { xs: '100%', sm: '25%' },
              height: '100%',
              color: '#fff',
              backgroundColor: '#0049A8',
              boxShadow: 3,
              overflowY: 'auto'
            }}
            >
              <ChatList rooms={rooms} selected={selectedChat} onSelectChat={handleSelectChat} />

              <IconButton onClick={() => setOpen(true)} sx={{ position: 'absolute', left: 10, bottom: 10 }}>
                <AddCircle sx={{ color: '#fff', width: '60px', height: '60px' }} />
              </IconButton>

            </Box>
            <Box sx={{ width: openChatList || !isMobile ? '75%' : '100%', display: openChatList && isMobile ? 'none' : 'block' }}>
              {selectedChat !== null
                ? <ChatContent messages={messages} room={room} />
                : <Typography align='center' padding={2}>Select a Chat</Typography>}
            </Box>
          </Box>
        </Box>
      </AuthenticatedLayout>
    </>
  )
}
export default Dashboard
