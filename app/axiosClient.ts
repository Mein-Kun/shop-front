import axios from 'axios'

const instanse = axios.create({
  // url: 'https://landmotors-client.onrender.com',
  url: 'http://localhost:3001',
  withCredentials: true,
  // baseURL: 'https://landmotors-server.onrender.com',
  baseURL: 'http://localhost:3000',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'access_token'
  )}`
  return config
})

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
