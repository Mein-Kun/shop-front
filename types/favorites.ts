export interface IFavorite {
  id: number
  userId: number
  partId: number
}

export interface IFavorites {
  count: number
  rows: IFavorite[]
}

export interface IFavoriteFx {
  url: string
  userId: number
  partId: number
}
