import { FC } from 'react'
import { ListItem, ListItemText, Badge, Typography } from '@mui/material'

interface ChatItemProps {
  chat: {
    id: number
    name: string
    lastMessage: string
    time: string
    notifications: number
  }
  onSelect: () => void
  isActive: boolean
}

const ChatItem: FC<ChatItemProps> = ({ chat, onSelect, isActive }) => {
  return (
    <ListItem onClick={onSelect} sx={{ height: '100%', width: '100%', cursor: 'pointer', backgroundColor: isActive ? '#002C87' : 'transparent', borderBottom: '#002C87 solid 1px' }}>
      <ListItemText sx={{ color: '#fff' }} primary={<Typography variant='h6' sx={{ fontSize: '0.875rem' }}>{chat.name}</Typography>} secondary={<Typography sx={{ fontSize: '0.75rem' }}>{chat.lastMessage}</Typography>} />
      {chat.notifications > 0 && (
        <Badge badgeContent={chat.notifications} color='error' sx={{ marginRight: 1, fontSize: '0.75rem' }} />
      )}
    </ListItem>
  )
}

export default ChatItem
