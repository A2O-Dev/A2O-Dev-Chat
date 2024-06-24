import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { shadows } from '@mui/system'
import { PageProps } from '@/types'
import { FC, useState } from 'react'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import ChatList from '@/Components/ChatList'
import ChatContent from '@/Components/ChatContent'
import { AddCircle } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'

const Dashboard: FC<PageProps> = ({ auth }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  const handleSelectChat = (id: number) => {
    setSelectedChat(id)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<Box sx={{ display: 'flex', height: '80px', width: '100%', boxShadow: 3 }}>
        <Box
          sx={{
            width: '25%',
            height: '100%',
            backgroundColor: '#0049A8',
            display: 'flex',
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
                input: { color: '#fff' }, 
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                  '& .Mui-focused input': {
                    fontWeight: 'bold',
                  },
                },
              }}
              variant='outlined'
              placeholder='Search...'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon sx={{ color: '#fff'}}/>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Box>
        <Box sx={{ width: '75%', height: '100%', backgroundColor: '#EEEEEE' }}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 'fontWeightBold',
              fontSize: '1.25rem',
              color: 'text.secondary',
              padding: 3,
              textAlign: 'center'
            }}
          >
            {auth?.user?.name}
          </Typography>
        </Box>
      </Box>}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ position: 'relative', width: '25%', height: '100%', color: '#fff', backgroundColor: '#0049A8', boxShadow: 3 }}>
          <ChatList selected={selectedChat} onSelectChat={handleSelectChat} />

          <AddCircle sx={{ position: 'absolute', width: '60px', height: '60px', left: 10, bottom: 10 }} />

        </Box>
        <Box sx={{ width: '75%' }}>
          {selectedChat
            ? <ChatContent chatId={selectedChat} />
            : <Typography align='center' padding={2}>
              Seleccione un chat
            </Typography>}
        </Box>
      </Box>
    </AuthenticatedLayout>
  )
}
export default Dashboard
