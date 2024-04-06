import axios from 'axios'
// @ts-expect-error
import socketIo from 'socket.io-client'

window.axios = axios
// @ts-expect-error
window.io = socketIo

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
