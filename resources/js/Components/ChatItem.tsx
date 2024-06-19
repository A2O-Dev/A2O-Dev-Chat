import { FC } from 'react'
import { ListItem, ListItemText, Badge } from '@mui/material'

interface ChatItemProps {
  chat: {
    id: number
    name: string
    lastMessage: string
    time: string
    notifications: number
  }
  onSelect: () => void
}

const ChatItem: FC<ChatItemProps> = ({ chat, onSelect }) => {
  return (
    <ListItem onClick={onSelect} sx={{ height: '100%', cursor: 'pointer' }}>
      <ListItemText primary={chat.name} secondary={chat.lastMessage} />
      {chat.notifications > 0 && (
        <Badge badgeContent={chat.notifications} color='error' />
      )}
    </ListItem>
  )
}

export default ChatItem
