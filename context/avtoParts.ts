import { IAvtoParts } from '@/types/avtoparts'
import { IFilterCheckboxItem } from '@/types/catalog'
import { carBrands, productGroup } from '@/utils/catalog'
import { createDomain } from 'effector-next'

const avtoParts = createDomain()

export const setAvtoParts = avtoParts.createEvent<IAvtoParts>()
export const setAvtoPartsCheapFirst = avtoParts.createEvent()
export const setAvtoPartsExpensiveFirst = avtoParts.createEvent()
export const setAvtoPartsByPopularity = avtoParts.createEvent()
export const setFilteredAvtoParts = avtoParts.createEvent()
export const setCarBrands = avtoParts.createEvent<IFilterCheckboxItem[]>()
export const updateCarBrand = avtoParts.createEvent<IFilterCheckboxItem>()
export const setProductGroup = avtoParts.createEvent<IFilterCheckboxItem[]>()
export const updateProductGroup = avtoParts.createEvent<IFilterCheckboxItem>()
export const setCarBrandsFromQuery = avtoParts.createEvent<string[]>()
export const setProductGroupFromQuery = avtoParts.createEvent<string[]>()

const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

const updateManufacturerFromQuery = (
  manufacturers: IFilterCheckboxItem[],
  manufacturersFromQuery: string[]
) =>
  manufacturers.map((item) => {
    if (manufacturersFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      }
    }

    return item
  })

export const $avtoParts = avtoParts
  .createStore<IAvtoParts>({} as IAvtoParts)
  .on(setAvtoParts, (_, parts) => parts)
  .on(setAvtoPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort(
      (a: { price: number }, b: { price: number }) => a.price - b.price
    ),
  }))
  .on(setAvtoPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort(
      (a: { price: number }, b: { price: number }) => b.price - a.price
    ),
  }))
  .on(setAvtoPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort(
      (a: { popularity: number }, b: { popularity: number }) =>
        b.popularity - a.popularity
    ),
  }))

export const $carBrands = avtoParts
  .createStore<IFilterCheckboxItem[]>(carBrands as IFilterCheckboxItem[])
  .on(setCarBrands, (_, parts) => parts)
  .on(updateCarBrand, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setCarBrandsFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $productGroup = avtoParts
  .createStore<IFilterCheckboxItem[]>(productGroup as IFilterCheckboxItem[])
  .on(setProductGroup, (_, parts) => parts)
  .on(updateProductGroup, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setProductGroupFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery),
  ])

export const $filteredAvtoParts = avtoParts
  .createStore<IAvtoParts>({} as IAvtoParts)
  .on(setFilteredAvtoParts, (_, parts) => parts)
