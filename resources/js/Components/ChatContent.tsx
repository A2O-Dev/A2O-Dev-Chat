
import { Box, TextField, Typography } from '@mui/material'
import { FC } from 'react'

interface Message {
  id: number
  user: string
  content: string
  time: string
}

const messages: Message[][] = [
  [
    { id: 1, user: 'Jasmin Lowery', content: 'I added new flows to our design system. Now you can use them for your projects!', time: '09:20' },
    { id: 2, user: 'Alex Hunt', content: 'Hey guys! Important news!', time: '09:24' },
    { id: 3, user: 'Alex Hunt', content: 'Our intern @jchurch has successfully completed his probationary period and is now part of our team!', time: '09:26' },
    { id: 4, user: 'Jaden Church', content: 'Jaden, my congratulations! I will be glad to work with you on a new project 😉', time: '09:27' }
  ],
  [
    { id: 1, user: 'Alex Hunt', content: 'Just finished the presentation for the new project. Excited to share it with the team!', time: '10:10' },
    { id: 2, user: 'Alex Hunt', content: 'Hey everyone, I’ve updated the repository with the latest code changes. Please review.', time: '10:12' },
    { id: 3, user: 'Isabella Davis', content: 'Reminder: We have a team meeting at 2 PM. Don’t be late!', time: '10:15' },
    { id: 4, user: 'Ethan Johnson', content: 'Can someone help me with the design specs? I need some clarifications.', time: '10:20' },
    { id: 5, user: 'Alex Hunt', content: 'I have finished the draft of the new blog post. Feedback is welcome!', time: '10:25' },
    { id: 6, user: 'William Smith', content: 'Check out the new feature I added to the app. Looking forward to your thoughts.', time: '10:30' },
    { id: 7, user: 'Emma Wilson', content: 'I have some ideas for the next sprint. Let’s discuss them in the meeting.', time: '10:35' },
    { id: 8, user: 'Alex Hunt', content: 'Don’t forget to submit your timesheets by the end of the day.', time: '10:40' },
    { id: 9, user: 'Ava Thompson', content: 'The client is happy with the latest update. Good work team!', time: '10:50' }
  ]
]
const ChatContent: FC<{ chatId: number }> = ({ chatId }) => {
  const verifyUser = (user: string): boolean => {
    // This must be changed by the user id or name
    return user === 'Alex Hunt'
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        height: '100%',
        paddingTop: 5
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {messages[chatId - 1].map((message) => (
          <Box key={message.id} sx={{ display: 'flex', marginBottom: 1, justifyContent: (verifyUser(message.user) ? 'end' : 'start') }}>
            <Box
              sx={{
                marginLeft: (verifyUser(message.user) ? 0 : 4),
                marginRight: (verifyUser(message.user) ? 4 : 2),
                backgroundColor: (verifyUser(message.user) ? '#0049A8' : '#EEEEEE'),
                color: (verifyUser(message.user) ? '#fff' : '#000'),
                padding: 2,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: (verifyUser(message.user) ? 0 : 10),
                borderBottomLeftRadius: (verifyUser(message.user) ? 10 : 0)
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                  {message.user}
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '0.75rem', color: (verifyUser(message.user) ? '#EEE' : 'gray'), ml: 2 }}>
                  {message.time}
                </Typography>
              </Box>
              <Typography variant='body1' sx={{ fontSize: '0.75rem' }}>
                {message.content}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: 4, backgroundColor: '#EEEEEE', padding: 2, borderTop: '1px solid #CCC' }}>
        <TextField
          type='text'
          fullWidth
          placeholder='Type a message'
          variant='outlined'
          sx={{
            input: { fontSize: '0.875rem' },
            borderRadius: '10px',
            fontSize: '0.875rem',
            border: 0,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              borderRadius: '10px'

            },
            '& .MuiInput-underline:hover:before': {
              border: 'none !important'
            },
            backgroundColor: '#fff'
          }}
        />
      </Box>
    </Box>
  )
}

export default ChatContent
