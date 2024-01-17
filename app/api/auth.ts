/* eslint-disable @typescript-eslint/ban-types */
import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import { ISignUpFx, ISignInFx, IAuthFx } from '../../types/auth'
import api from '../axiosClient'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'

export const singUpFx = createEffect(
  async ({ url, username, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { username, password, email })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }

    toast.success('Регистрация прощла успешно!')

    return data
  }
)

export const singInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { username, password })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }
    // console.log(data)
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    toast.success('Вход выполнен!')

    return data
  }
)

export const checkUserAuthFx = createEffect(
  async ({ url, accessToken }: IAuthFx) => {
    try {
      const { data } = await api.post(url, { accessToken })

      return data
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
          return false
        }
      }

      toast.error((error as Error).message)
    }
  }
)

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})
