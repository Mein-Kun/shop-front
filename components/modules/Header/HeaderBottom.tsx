/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { $mode } from '@/context/mode'
import SearchInput from '@/components/elements/Header/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import CartPopup from './CartPopup/CartPopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { setDisableCart } from '@/context/shopping-cart'
import styles from '@/styles/header/index.module.scss'
import LogoImgBlack from '@/components/elements/Header/logoImgBlack'
import LogoImgWhite from '@/components/elements/Header/logoImgWhite'

const HeaderBottom = () => {
  const isMedia950 = useMediaQuery(950)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/order') {
      setDisableCart(true)
      return
    }

    setDisableCart(false)
  }, [router.pathname])

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/" legacyBehavior passHref>
            {!isMedia950 ? (
              <a className={styles.header__logo__link}>
                {darkModeClass ? <LogoImgWhite /> : <LogoImgBlack />}
                {!isMedia950 && (
                  <span
                    className={`${styles.header__logo__link__text} ${darkModeClass}`}
                  >
                    Интернет-магазин автозапчастей
                  </span>
                )}
              </a>
            ) : (
              <LogoImgWhite />
            )}
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
        </div>
        <div className={styles.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          {router.pathname === '/admin' ? <></> : <CartPopup />}
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
