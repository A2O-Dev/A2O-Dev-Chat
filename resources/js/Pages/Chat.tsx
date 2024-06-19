import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { FC, useState } from 'react'
import ChatList from '@/Components/ChatList'
import ChatContent from '@/Components/ChatContent'
import { Grid, Typography } from '@mui/material'

const Chat: FC<PageProps> = ({ auth }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  const handleSelectChat = (id: number) => {
    setSelectedChat(id)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header='Chat'
    >
      <Grid container spacing={1} sx={{ backgroundColor: '#fff' }}>
        <Grid item xs={4} sx={{ height: '100%', paddingRight: 2, borderRight: '1px solid #f2f2f2' }}>
          <ChatList onSelectChat={handleSelectChat} />
        </Grid>
        <Grid item xs={8}>
          {selectedChat
            ? <ChatContent chatId={selectedChat} />
            : <Typography align='center'>
              Seleccione un chat
            </Typography>}
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  )
}
export default Chat
