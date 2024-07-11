import { FC } from 'react'
import { ListItem, ListItemText, Badge, Typography } from '@mui/material'
import { Room } from '../interfaces/app'

interface ChatItemProps {
  room: Room
  onSelect: () => void
  isActive: boolean
}

const ChatItem: FC<ChatItemProps> = ({ room, onSelect, isActive }) => {
  return (
    <ListItem onClick={onSelect} sx={{ height: '100%', width: '100%', cursor: 'pointer', backgroundColor: isActive ? '#002C87' : 'transparent', borderBottom: '#002C87 solid 1px' }}>
      <ListItemText sx={{ color: '#fff' }} primary={<Typography variant='h6' sx={{ fontSize: '0.875rem' }}>{room.name}</Typography>} secondary={<Typography noWrap>{room.messages[0]?.message ?? ''}</Typography>} />
      {room?.notifications > 0 && (
        <Badge badgeContent={room.notifications} color='error' sx={{ marginRight: 1 }} />
      )}
    </ListItem>
  )
}

export default ChatItem
