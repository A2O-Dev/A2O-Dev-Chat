import { FC, useEffect } from 'react'
import echo from '../services/echo'
import Button from '@mui/material/Button'

const TestSocket: FC = () => {
  useEffect(() => {
    echo.channel('TestChat')
      .listenForWhisper('TestChatEvent', (e) => {
        console.log('Received whisper:', e)
      })
  }, [])
  const handleClick = () => {
    console.log('send msg')
    echo.join('TestChat').whisper('TestChatEvent', {
      user: 'userid',
      typing: true
    })
  }
  return (
    <div>
      <Button variant='contained' onClick={handleClick}>Send Message</Button>
    </div>
  )
}
export default TestSocket
