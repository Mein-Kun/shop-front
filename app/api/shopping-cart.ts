import { createEffect } from 'effector-next'
import api from '../axiosClient'
import {
  IAddToCartFx,
  IGetCardForAdmin,
  IUpdateCartItemFx,
} from '@/types/shopping-cart'

export const getCartItemsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getCartForAdminItemsFx = createEffect(async (url: string) => {
  const { data } = await api.patch(url)

  return data
})

export const addToCartFx = createEffect(
  async ({ url, username, partId }: IAddToCartFx) => {
    const { data } = await api.post(url, { username, partId })

    return data
  }
)

export const removeFromCartFx = createEffect(async (url: string) => {
  await api.delete(url)
})

export const updateCartItemFx = createEffect(
  async ({ url, payload }: IUpdateCartItemFx) => {
    const { data } = await api.patch(url, payload)

    return data
  }
)

export const updateCardForAdminFx = createEffect(
  async ({ url, payload }: IGetCardForAdmin) => {
    const { data } = await api.post(url, payload)

    return data
  }
)
