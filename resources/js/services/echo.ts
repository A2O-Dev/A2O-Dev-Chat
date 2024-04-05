import Echo from 'laravel-echo';
import io from 'socket.io-client';

window.io = io;

const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:6001',
});
echo.connector.socket.on('connect', () => {
    console.log('WebSocket connection established');
}).on('error', (error) => {
    console.error('WebSocket connection error:', error);
});
console.log(window.location.hostname)
export default echo;
