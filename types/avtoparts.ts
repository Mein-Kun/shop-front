/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAvtoPart {
  id: number
  car_brand: string
  price: number
  parts_name: string
  product_group: string
  vendor_code: string
  name: string
  description: string
  images: string
  in_stock: number
  bestsellers: boolean
  new: boolean
  popularity: number
  compatibility: string
}

export interface IAvtoParts {
  count: number
  rows: IAvtoPart[]
}
