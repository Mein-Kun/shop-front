import axios from 'axios'

const instanse = axios.create({
  url: 'https://landmotors-client.onrender.com',
  // url: 'http://localhost:3001',
  withCredentials: true,
  baseURL: 'https://landmotors-server.onrender.com',
  // baseURL: 'http://localhost:3000',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

export default instanse
