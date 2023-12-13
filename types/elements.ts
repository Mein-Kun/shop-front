import { MouseEventHandler } from 'react'
import { CustomArrowProps } from 'react-slick'

export interface IBrandsSliderArrow extends CustomArrowProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
  modeClass: string
}
