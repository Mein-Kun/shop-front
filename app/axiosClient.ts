import axios from 'axios'

const instanse = axios.create({
  url: 'https://landmotors-client.onrender.com/api',
  // url: 'http://localhost:3001/api',
  withCredentials: true,
  baseURL: 'https://landmotors-server.onrender.com/api',
  // baseURL: 'http://localhost:3000/api',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

export default instanse
