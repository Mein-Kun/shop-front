import { IFavorite } from '@/types/favorites'
import { createDomain } from 'effector-next'

const favorite = createDomain()

export const setFavorite = favorite.createEvent<IFavorite>()

export const $favorite = favorite
  .createStore<IFavorite>({} as IFavorite)
  .on(setFavorite, (_, favorite) => favorite)
