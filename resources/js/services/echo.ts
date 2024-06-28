import Echo from 'laravel-echo'
import io from 'socket.io-client'

window.io = io

const echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':6001',
  client: io,
  autoConnect: true,
  forceNode: true
})

echo.connector.socket.on('connect', () => {
  console.log('WebSocket connection established')
}).on('error', (error: any) => {
  console.error('WebSocket connection error:', error)
})

export default echo
