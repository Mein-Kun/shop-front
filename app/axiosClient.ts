import axios from 'axios'

const instanse = axios.create({
  url: 'https://landmotors-client.onrender.com',
  // url: 'http://localhost:3001',
  withCredentials: true,
  baseURL: 'https://landmotors-server.onrender.com',
  // baseURL: 'http://localhost:3000',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

instanse.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  config.headers.Authorization = `Bearer ${token}`
  // const parseJwt = function (token: string | null) {
  //   if (token) {
  //     const base64Url = token.split('.')[1]
  //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split('')
  //         .map(function (c) {
  //           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  //         })
  //         .join('')
  //     )
  //     // console.log(JSON.parse(jsonPayload))
  //     return JSON.parse(jsonPayload)
  //   }
  // }
  // localStorage.setItem('user', parseJwt(token))
  // console.log(parseJwt(token))
  return config
})

// instanse.interceptors.response.use((config) => {
//   console.log(config.data)
//   return config
// })

// instanse.interceptors.response.use(
//   // в случае валидного accessToken ничего не делаем:
//   (config) => config,
//   // в случае просроченного accessToken пытаемся его обновить:
//   async (error) => {
//     // предотвращаем зацикленный запрос, добавляя свойство _isRetry
//     const originalRequest = { ...error.config }
//     originalRequest._isRetry = true
//     if (
//       // проверим, что ошибка именно из-за невалидного accessToken
//       error.response.status === 401 &&
//       // проверим, что запрос не повторный
//       error.config &&
//       !error.config._isRetry
//     ) {
//       try {
//         // запрос на обновление токенов
//         const resp = await instanse.get('/api/refresh')
//         // сохраняем новый accessToken в localStorage
//         localStorage.setItem('token', resp.data.accessToken)
//         // переотправляем запрос с обновленным accessToken
//         return instanse.request(originalRequest)
//       } catch (error) {
//         console.log('AUTH ERROR')
//       }
//     }
//     // на случай, если возникла другая ошибка (не связанная с авторизацией)
//     // пробросим эту ошибку
//     throw error
//   }
// )

export default instanse
