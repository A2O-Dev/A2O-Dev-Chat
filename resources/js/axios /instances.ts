import axios from 'axios'

export const mainApi = axios.create({
  params: {
    reload: 1
  }
})
