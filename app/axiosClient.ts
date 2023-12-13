import axios from 'axios'

const instanse = axios.create({
  url: 'http://localhost:3001',
  withCredentials: true,
  baseURL: 'http://localhost:3000',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

export default instanse
