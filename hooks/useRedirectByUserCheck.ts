/* eslint-disable react-hooks/exhaustive-deps */
import { checkUserAuthFx } from '@/app/api/auth'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const useRedirectByUserCheck = () => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false)
  const router = useRouter()
  const shouldCheckAuth = useRef(true)

  useEffect(() => {
    if (shouldCheckAuth.current && localStorage.getItem('access_token')) {
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const user = await checkUserAuthFx({
      url: '/users/login-check',
      accessToken: localStorage.getItem('access_token'),
    })

    if (!user) {
      setShouldLoadContent(false)
      router.push('/auth')
      return
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      setShouldLoadContent(true)
      return
    }

    router.push('/')
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
