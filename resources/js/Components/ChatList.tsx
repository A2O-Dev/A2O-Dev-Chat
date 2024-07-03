import { List } from '@mui/material'
import ChatItem from './ChatItem'
import { FC } from 'react'

interface ChatListProps {
  selected: number | null
  onSelectChat: (id: number) => void
}

const ChatList: FC<ChatListProps> = ({ rooms, selected, onSelectChat }) => {
  return (
    <List>
      {rooms.map(chat => (
        <ChatItem key={chat.id} chat={chat} onSelect={() => onSelectChat(chat.id)} isActive={selected === chat.id} />
      ))}
    </List>
  )
}

export default ChatList
