import axios from 'axios'

const instanse = axios.create({
  url: 'https://landmotors-client.onrender.com',
  withCredentials: true,
  baseURL: 'https://landmotors-server.onrender.com',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

export default instanse
