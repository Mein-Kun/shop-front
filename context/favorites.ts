import { IFavorite } from '@/types/favorites'
import { createDomain } from 'effector-next'

const favorites = createDomain()

export const setFavorites = favorites.createEvent<IFavorite[]>()
export const updateFavorite = favorites.createEvent<IFavorite>()
export const removeFavorite = favorites.createEvent<number>()

const remove = (cartItems: IFavorite[], partId: number) =>
  cartItems.filter((item) => item.partId !== partId)

export const $favorites = favorites
  .createStore<IFavorite[]>([] as IFavorite[])
  .on(setFavorites, (_, favorites) => favorites)
  .on(updateFavorite, (state, rows) => [...state, rows])
  .on(removeFavorite, (state, partId) => [...remove(state, partId)])
