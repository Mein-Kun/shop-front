// import { IShoppingCartItem } from './shopping-cart'

export interface IOrderAccordionProps {
  setOrderIsReady: (arg0: boolean) => void
  showDoneIcon: boolean
}

export interface IMakePayFx {
  url: string
  order: number
  amount: number
  description: string
}

export interface ICheckPayFx {
  url: string
  paymentId: string
}

// export interface IGetPayFx {
//   items: IShoppingCartItem[]
//   payment: boolean
// }
