import axios from 'axios'
import socketIo from 'socket.io-client'

window.axios = axios
window.io = socketIo

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
