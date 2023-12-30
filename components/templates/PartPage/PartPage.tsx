/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { $avtoPart } from '@/context/avtoPart'
import { $mode } from '@/context/mode'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { addToFavoriteItem, toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartTabs from '@/components/modules/PartPage/PartTabs'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { getAvtoPartsFx } from '@/app/api/avtoParts'
import {
  $avtoParts,
  setAvtoParts,
  setAvtoPartsByPopularity,
} from '@/context/avtoParts'
import PartAccordion from '@/components/modules/PartPage/PartAccordion'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import styles from '@/styles/part/index.module.scss'
import FavoriteSvgOn from '@/components/elements/FavoriteSvg/FavoriteSvgOn'
import FavoriteSvgOff from '@/components/elements/FavoriteSvg/FavoriteSvgOff'
import { $favorites } from '@/context/favorites'

const PartPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const isMobile = useMediaQuery(850)
  const favorites = useStore($favorites)
  const avtoPart = useStore($avtoPart)
  const avtoParts = useStore($avtoParts)
  const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = cartItems.some((item) => item.partId === avtoPart.id)
  const isInFavorite = favorites.some((item) => item.partId === avtoPart.id)
  const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getAvtoPartsFx.pending)

  useEffect(() => {
    loadAvtoPart()
  }, [])

  const loadAvtoPart = async () => {
    try {
      const data = await getAvtoPartsFx('/avto-parts?limit=20&offset=0')
      setAvtoParts(data)
      setAvtoPartsByPopularity()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const updateFavorite = async () =>
    addToFavoriteItem(user.userId, avtoPart.id, isInFavorite)
  const toggleToCart = () =>
    toggleCartItem(user.username, avtoPart.id, isInCart)

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {avtoPart.parts_name}
          </h2>
          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(avtoPart.price || 0)} P
              </span>
              <span className={styles.part__info__stock}>
                {avtoPart.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>
              <span className={styles.part__info__code}>
                Артикул: {avtoPart.vendor_code}
              </span>
              <span
                className={styles.part__info__favorite}
                onClick={updateFavorite}
              >
                {isInFavorite ? <FavoriteSvgOn /> : <FavoriteSvgOff />}{' '}В
                избранное
              </span>
              <button
                className={`${styles.part__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в карзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>
              {!isMobile && <PartTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <PartAccordion title="Описание">
                <div
                  className={`${styles.part__accordion__content} ${darkModeClass}`}
                >
                  <h3
                    className={`${styles.part__tabs__content__title} ${darkModeClass}`}
                  >
                    {avtoPart.parts_name}
                  </h3>
                  <p
                    className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                  >
                    {avtoPart.description}
                  </p>
                </div>
              </PartAccordion>
            </div>
            <PartAccordion title="Совместимость">
              <div
                className={`${styles.part__accordion__content} ${darkModeClass}`}
              >
                <p
                  className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                >
                  {avtoPart.compatibility}
                </p>
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={styles.part__bottom}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider
            goToPartPage
            spinner={spinnerSlider}
            items={avtoParts.rows || []}
          />
        </div>
      </div>
    </section>
  )
}

export default PartPage
