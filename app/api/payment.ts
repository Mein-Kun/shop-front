import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { ICheckPayFx, IMakePayFx } from '@/types/order'

export const makePaymentFx = createEffect(
  async ({ url, order, amount, description }: IMakePayFx) => {
    const { data } = await api.post(url, { order, amount, description })

    return data
  }
)

export const checkPaymentFx = createEffect(
  async ({ url, paymentId }: ICheckPayFx) => {
    const { data } = await api.post(url, { paymentId })

    return data
  }
)

// export const getPaymentFx = createEffect(
//   async ({ url, payment }: IGetPayFx) => {
//     const { data } = await api.post(url, { payment })

//     return data
//   }
// )
