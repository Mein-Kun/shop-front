import Link from 'next/link'
import { useStore } from 'effector-react'
// import CityButton from '@/components/elements/CityButton/CityButton'
import ProfileDropDown from '@/components/modules/Header/ProfileDropdown'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { $mode } from '@/context/mode'
import { usePopup } from '@/hooks/usePoup'
import styles from '@/styles/header/index.module.scss'
import { $user } from '@/context/user'
// import LogoImgWhite from '@/components/elements/Header/logoImgWhite'
// import LogoImgBlack from '@/components/elements/Header/logoImgBlack'

const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950)
  const { toggleOpen, open, closePopup } = usePopup()
  const mode = useStore($mode)
  const user = useStore($user)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {/* {!isMedia950 && <CityButton />} */}
        {isMedia950 && (
          <button
            onClick={toggleOpen}
            className={`${styles.burger_menu} ${
              open ? styles.open : ''
            } ${darkModeClass}`}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <nav
          className={`${styles.header__nav} ${
            open ? styles.open : ''
          } ${darkModeClass}`}
        >
          <ul className={styles.header__nav__list}>
            {user.userId == 1 ? (
              <li className={styles.header__nav__list__item}>
                <Link href="/admin" passHref legacyBehavior>
                  <a
                    className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                    onClick={closePopup}
                  >
                    Для администратора
                  </a>
                </Link>
              </li>
            ) : (
              false
            )}
            <li className={styles.header__nav__list__item}>
              <Link href="/shopping-payment" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Доставка и оплата
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/about" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  О компании
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Каталог
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/contacts" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Контакты
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/wholesale-buyers" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Оптовым покупателям
                </a>
              </Link>
            </li>
            {/* {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <CityButton />
              </li>
            )} */}
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <ModeToggler />
              </li>
            )}
          </ul>
        </nav>
        {/* {isMedia950 && (
          <a className={styles.header__top__logo}>
            {darkModeClass ? <LogoImgWhite /> : <LogoImgBlack />}
          </a>
        )} */}
        <ProfileDropDown />
      </div>
    </div>
  )
}

export default HeaderTop
