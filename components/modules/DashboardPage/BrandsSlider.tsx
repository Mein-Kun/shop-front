/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'
import styles from '@/styles/dashboard/index.module.scss'

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const brandItemsWhite = [
    { id: 1, img: '/img/manufacturerWhite/brand-1.svg', alt: 'brand-1' },
    { id: 2, img: '/img/manufacturerWhite/brand-2.svg', alt: 'brand-2' },
    { id: 3, img: '/img/manufacturerWhite/brand-3.svg', alt: 'brand-3' },
    { id: 4, img: '/img/manufacturerWhite/brand-4.svg', alt: 'brand-4' },
    { id: 5, img: '/img/manufacturerWhite/brand-5.svg', alt: 'brand-5' },
    { id: 6, img: '/img/manufacturerWhite/brand-6.svg', alt: 'brand-6' },
    { id: 7, img: '/img/manufacturerWhite/brand-7.svg', alt: 'brand-7' },
    { id: 8, img: '/img/manufacturerWhite/brand-8.svg', alt: 'brand-8' },
    { id: 9, img: '/img/manufacturerWhite/brand-9.svg', alt: 'brand-9' },
    { id: 10, img: '/img/manufacturerWhite/brand-10.svg', alt: 'brand-10' },
    { id: 11, img: '/img/manufacturerWhite/brand-11.svg', alt: 'brand-11' },
    { id: 12, img: '/img/manufacturerWhite/brand-12.svg', alt: 'brand-12' },
  ]

  const brandItemsBlack = [
    { id: 1, img: '/img/manufacturerBlack/brand-1.svg', alt: 'brand-1' },
    { id: 2, img: '/img/manufacturerBlack/brand-2.svg', alt: 'brand-2' },
    { id: 3, img: '/img/manufacturerBlack/brand-3.svg', alt: 'brand-3' },
    { id: 4, img: '/img/manufacturerBlack/brand-4.svg', alt: 'brand-4' },
    { id: 5, img: '/img/manufacturerBlack/brand-5.svg', alt: 'brand-5' },
    { id: 6, img: '/img/manufacturerBlack/brand-6.svg', alt: 'brand-6' },
    { id: 7, img: '/img/manufacturerBlack/brand-7.svg', alt: 'brand-7' },
    { id: 8, img: '/img/manufacturerBlack/brand-8.svg', alt: 'brand-8' },
    { id: 9, img: '/img/manufacturerBlack/brand-9.svg', alt: 'brand-9' },
    { id: 10, img: '/img/manufacturerBlack/brand-10.svg', alt: 'brand-10' },
    { id: 11, img: '/img/manufacturerBlack/brand-11.svg', alt: 'brand-11' },
    { id: 12, img: '/img/manufacturerBlack/brand-12.svg', alt: 'brand-12' },
  ]

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia768 ? '60px' : '80px'
  }, [isMedia768])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    nextArrow: (
      <BrandsSliderNextArrow modeClass={darkModeClass} onClick={undefined} />
    ),
    prevArrow: (
      <BrandsSliderPrevArrow modeClass={darkModeClass} onClick={undefined} />
    ),
  }

  let slideImg = []
  if (darkModeClass) {
    slideImg = brandItemsWhite
  } else {
    slideImg = brandItemsBlack
  }

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {slideImg.map((item) => (
        <div
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          key={item.id}
          style={{
            width: isMedia768 ? 124 : 180,
          }}
        >
          <div
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      ))}
    </Slider>
  )
}

export default BrandsSlider
