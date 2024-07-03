import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
  headers: {
    'X-CSRF-TOKEN': csrfToken
  }
})
export default mainApi
