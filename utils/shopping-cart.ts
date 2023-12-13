import { toast } from 'react-toastify'
import {
  addToCartFx,
  updateCardForAdminFx,
  removeFromCartFx,
  updateCartItemFx,
} from '@/app/api/shopping-cart'
import {
  removeShoppingCartItem,
  updateCartItemTotalPrice,
  updateOrderShoppingCart,
  updateShoppingCart,
} from '@/context/shopping-cart'
import { addToFavoriteFx, removeFavoriteFx } from '@/app/api/favorite'
import { removeFavorite, updateFavorite } from '@/context/favorites'

export const toggleCartItem = async (
  username: string,
  partId: number,
  isInCart: boolean
) => {
  try {
    if (isInCart) {
      await removeFromCartFx(`/shopping-cart/one/${partId}`)
      removeShoppingCartItem(partId)
      return
    }

    const data = await addToCartFx({
      url: '/shopping-cart/add',
      username,
      partId,
    })

    updateShoppingCart(data)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const removeItemFromCart = async (partId: number) => {
  try {
    await removeFromCartFx(`/shopping-cart/one/${partId}`)
    removeShoppingCartItem(partId)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const updateTotalPrice = async (total_price: number, partId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total-price/${partId}`,
    payload: { total_price },
  })

  updateCartItemTotalPrice({ partId, total_price: data.total_price })
}

export const updateCardForAdmin = async (order: number, userId: number) => {
  const data = await updateCardForAdminFx({
    url: `/shopping-cart/admin/order/${userId}`,
    payload: { order },
  })

  updateOrderShoppingCart({ userId, order: data.order })
}

export const addToFavoriteItem = async (
  userId: number,
  partId: number,
  isInFavorite: boolean
) => {
  try {
    if (isInFavorite) {
      await removeFavoriteFx(`/favorite/one/${partId}`)
      removeFavorite(partId)
      return
    }
    const data = await addToFavoriteFx({
      url: '/favorite/add',
      userId,
      partId,
    })

    updateFavorite(data)
  } catch (error) {
    toast.error((error as Error).message)
  }
}
