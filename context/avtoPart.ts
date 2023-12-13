import { IAvtoPart } from '@/types/avtoparts'
import { createDomain } from 'effector-next'

const avtoPart = createDomain()

export const setAvtoPart = avtoPart.createEvent<IAvtoPart>()

export const $avtoPart = avtoPart
  .createStore<IAvtoPart>({} as IAvtoPart)
  .on(setAvtoPart, (_, part) => part)
