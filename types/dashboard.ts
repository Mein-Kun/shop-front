import { IAvtoPart } from './avtoparts'

export interface IDashboardSlider {
  items: IAvtoPart[]
  spinner: boolean
  goToPartPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
