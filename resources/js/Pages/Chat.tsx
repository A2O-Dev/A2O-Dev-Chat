import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { FC, useState } from 'react'
import ChatList from '@/Components/ChatList'
import ChatContent from '@/Components/ChatContent'
import { Typography } from '@mui/material'

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
      <div className='grid grid-cols-3 bg-white'>
        <div className='col-span-1'>
          <ChatList onSelectChat={handleSelectChat} />
        </div>
        <div className='col-span-2'>
          {selectedChat ? <ChatContent chatId={selectedChat} /> : <p className='text-center'>Seleccione un chat</p>}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
export default Chat
