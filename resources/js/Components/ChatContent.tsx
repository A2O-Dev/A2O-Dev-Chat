
import { Avatar } from '@mui/material'
import { FC } from 'react'

interface Message {
  id: number
  user: string
  avatar: string
  content: string
  time: string
}

const messages: Message[][] = [
  [
    { id: 1, user: 'Jasmin Lowery', avatar: '/path/to/avatar1.jpg', content: 'I added new flows to our design system. Now you can use them for your projects!', time: '09:20' },
    { id: 2, user: 'Alex Hunt', avatar: '/path/to/avatar2.jpg', content: 'Hey guys! Important news!', time: '09:24' },
    { id: 3, user: 'Alex Hunt', avatar: '/path/to/avatar2.jpg', content: 'Our intern @jchurch has successfully completed his probationary period and is now part of our team!', time: '09:26' },
    { id: 4, user: 'Jaden Church', avatar: '/path/to/avatar3.jpg', content: 'Jaden, my congratulations! I will be glad to work with you on a new project 😉', time: '09:27' }
  ],
  [
    { id: 1, user: 'Samantha Lee', avatar: '/path/to/avatar4.jpg', content: 'Just finished the presentation for the new project. Excited to share it with the team!', time: '10:10' },
    { id: 2, user: 'Michael Brown', avatar: '/path/to/avatar5.jpg', content: 'Hey everyone, I’ve updated the repository with the latest code changes. Please review.', time: '10:12' },
    { id: 3, user: 'Isabella Davis', avatar: '/path/to/avatar6.jpg', content: 'Reminder: We have a team meeting at 2 PM. Don’t be late!', time: '10:15' },
    { id: 4, user: 'Ethan Johnson', avatar: '/path/to/avatar7.jpg', content: 'Can someone help me with the design specs? I need some clarifications.', time: '10:20' },
    { id: 5, user: 'Olivia Martinez', avatar: '/path/to/avatar8.jpg', content: 'I have finished the draft of the new blog post. Feedback is welcome!', time: '10:25' },
    { id: 6, user: 'William Smith', avatar: '/path/to/avatar9.jpg', content: 'Check out the new feature I added to the app. Looking forward to your thoughts.', time: '10:30' },
    { id: 7, user: 'Emma Wilson', avatar: '/path/to/avatar10.jpg', content: 'I have some ideas for the next sprint. Let’s discuss them in the meeting.', time: '10:35' },
    { id: 8, user: 'Liam Anderson', avatar: '/path/to/avatar11.jpg', content: 'Don’t forget to submit your timesheets by the end of the day.', time: '10:40' },
    { id: 9, user: 'Ava Thompson', avatar: '/path/to/avatar12.jpg', content: 'Great job on the project, everyone! Let’s keep up the good work.', time: '10:45' },
    { id: 10, user: 'James Martinez', avatar: '/path/to/avatar13.jpg', content: 'The client is happy with the latest update. Good work team!', time: '10:50' }
  ]
]
const ChatContent: FC<{ chatId: number }> = ({ chatId }) => {
  return (
    <div className='flex flex-col p-4 h-full'>
      <div className='flex-grow overflow-y-auto'>
        {messages[chatId - 1].map((message) => (
          <div key={message.id} className='flex mb-4'>
            <Avatar alt={message.user} src={message.avatar} variant='rounded' />
            <div className='ml-4'>
              <div className='flex items-center'>
                <h4 className='font-semibold'>{message.user}</h4>
                <span className='text-gray-500 ml-2 text-sm'>{message.time}</span>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4'>
        <input
          type='text'
          className='w-full p-2 border rounded'
          placeholder='Type a message'
        />
      </div>
    </div>
  )
}

export default ChatContent