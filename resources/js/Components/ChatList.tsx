import { List } from '@mui/material'
import ChatItem from './ChatItem'
import { FC } from 'react'
import { Room } from '../interfaces/app'

interface ChatListProps {
  selected: number | undefined
  onSelectChat: (id: number) => void
  rooms?: Room[]
}

const ChatList: FC<ChatListProps> = ({ rooms = [], selected, onSelectChat }) => {
  return (
    <List>
      {rooms?.map(room => (
        <ChatItem key={room.id} room={room} onSelect={() => onSelectChat(room.id)} isActive={selected === room.id} />
      ))}
    </List>
  )
}

export default ChatList
