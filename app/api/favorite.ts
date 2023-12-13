import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { IFavoriteFx } from '@/types/favorites'

export const addToFavoriteFx = createEffect(
  async ({ url, userId, partId }: IFavoriteFx) => {
    const { data } = await api.post(url, { userId, partId })

    return data
  }
)

export const getFavoriteFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const removeFavoriteFx = createEffect(async (url: string) => {
  await api.delete(url)
})
