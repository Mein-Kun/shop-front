import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getAvtoPartsFx } from '@/app/api/avtoParts'
import { setFilteredAvtoParts } from '@/context/avtoParts'

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const carBrands = [
  'Audi',
  'Acura',
  'Aurus',
  'BMW',
  'Ford',
  'GAZ',
  'Honda',
  'Hyundai',
  'Kia',
  'Lada',
  'Mazda',
  'Mersedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Renault',
  'Skoda',
  'Toyota',
  'Volkswagen',
  'UAZ',
  'Volkswagen',
  'Volkswagen',
].map(createManufacturerCheckboxObj)

export const productGroup = [
  'Амортизаторы Пружины Рессоры',
  'ГазоРаспределительный механизм',
  'Генераторы',
  'Датчики',
  'Двери',
  'Детали двигателя',
  'Детали КПП',
  'Детали крепежные',
  'Детали подвески',
  'Жидкости',
  'Капоты/крышки багажника',
  'Карданный вал',
  'Кузов',
  'Масла',
  'Освещение / Оптика',
  'Передняя панель кузова',
  'Подшипники',
  'Поршневая группа',
  'Привод',
  'Прокладки',
  'Радиаторы',
  'Ременный привод',
  'Рулевое управление',
  'Сальники / Уплотнители',
  'Система выпуска ОГ',
  'Система зажигания',
  'Система кондиционирования',
  'Система отопления салона',
  'Система охлаждения',
  'Система очистки стекол',
  'Система смазки',
  'Стартеры',
  'Ступицы / Подшипники ступиц',
  'Сцепление',
  'Топливная система',
  'Фильтры',
  'Цепной привод',
  'Электрооборудование',
].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const avtoQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('avto', router) as string)
  )
  const partsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
  )
  const isValidAvtoQuery =
    Array.isArray(avtoQueryValue) && !!avtoQueryValue?.length
  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidAvtoQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    avtoQueryValue,
    partsQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getAvtoPartsFx(`/avto-parts?limit=20&offset=${path}`)

  setFilteredAvtoParts(data)
}

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query

  delete params.avto
  delete params.parts
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getAvtoPartsFx(`/avto-parts?limit=20&offset=${path}`)

  setFilteredAvtoParts(data)
}
