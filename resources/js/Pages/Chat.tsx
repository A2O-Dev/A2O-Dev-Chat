import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { FC, useState } from 'react'
import ChatList from '@/Components/ChatList'
import ChatContent from '@/Components/ChatContent'

const Chat: FC<PageProps> = ({ auth }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  const handleSelectChat = (id: number) => {
    setSelectedChat(id)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Chat</h2>}
    >
      <div className='grid grid-cols-3'>
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
