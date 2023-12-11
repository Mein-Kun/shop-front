import axios from 'axios'

// const instanse = axios.create({
//   withCredentials: true,
//   baseURL: `${process.env.NEXT_PABLIC_SERVER_URL}`,
// })

const instanse = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000',
})

export default instanse
