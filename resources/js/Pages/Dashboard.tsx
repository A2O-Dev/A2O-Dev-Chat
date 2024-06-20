import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { FC, useState } from 'react'
import { Box, Icon, Typography } from '@mui/material'
import ChatList from '@/Components/ChatList'
import ChatContent from '@/Components/ChatContent'
import { AddCircle } from '@mui/icons-material'

const Dashboard: FC<PageProps> = ({ auth }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  const handleSelectChat = (id: number) => {
    setSelectedChat(id)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header='Dashboard'
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ width: '30%', height: '100%', color: '#fff', backgroundColor: '#0049A8' }}>
          <ChatList selected={selectedChat} onSelectChat={handleSelectChat} />

          <AddCircle sx={{ position: 'absolute', width: '60px', height: '60px', left: 10, bottom: 10 }} />

        </Box>
        <Box sx={{ width: '70%' }}>
          {selectedChat
            ? <ChatContent chatId={selectedChat} />
            : <Typography align='center'>
              Seleccione un chat
            </Typography>}
        </Box>
      </Box>
    </AuthenticatedLayout>
  )
}
export default Dashboard
