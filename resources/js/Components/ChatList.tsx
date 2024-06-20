import { List } from '@mui/material'
import ChatItem from './ChatItem'
import { FC } from 'react'

const chats = [
  { id: 1, name: 'Room 1', lastMessage: 'Hey! We are ready...', time: '20m', notifications: 1 },
  { id: 2, name: 'Room 2', lastMessage: 'I prepared some var...', time: '1h', notifications: 2 }

]

const ChatList: FC<{ selected: number, onSelectChat: (id: number) => void }> = ({ selected, onSelectChat }) => {
  return (
    <List>
      {chats.map(chat => (
        <ChatItem key={chat.id} chat={chat} onSelect={() => onSelectChat(chat.id)} isActive={selected === chat.id} />
      ))}
    </List>
  )
}

export default ChatList
