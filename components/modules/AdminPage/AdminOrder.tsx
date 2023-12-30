import DoneSvg from '@/components/elements/DoneSvg/DoneSvg'
// import EditSvg from '@/components/elements/EditSvg/EditSvg'
import { $mode } from '@/context/mode'
import {
  $shoppingCart,
  setShoppingCart,
  setTotalPrice,
} from '@/context/shopping-cart'
import styles from '@/styles/admin/index.module.scss'
import { useStore } from 'effector-react'
import { motion, AnimatePresence } from 'framer-motion'
import CartPopupItem from '../Header/CartPopup/CartPopupItem'
import OrderItem from '../OrderPage/OrderItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useEffect, useState } from 'react'
import { IOrderAccordionProps } from '@/types/order'
import { getCartForAdminItemsFx } from '@/app/api/shopping-cart'
import { toast } from 'react-toastify'
import ArrowSvg from '@/components/elements/ArowSvg/ArowSvg'

const AdminOrder = ({ showDoneIcon }: IOrderAccordionProps) => {
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMedia550 = useMediaQuery(550)
  const [open, setOpen] = useState(true)

  const toggleCartDropDown = () => {
    setOpen(!open)
  }

  useEffect(() => {
    loadCartItems()
  }, [])

  useEffect(() => {
    setTotalPrice(
      shoppingCart.reduce(
        (defaultCount, item) => defaultCount + item.total_price,
        0
      )
    )
  }, [shoppingCart])

  const loadCartItems = async () => {
    try {
      const cartItems = await getCartForAdminItemsFx(`/shopping-cart/order-all`)

      setShoppingCart(cartItems)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <motion.div
        initial={false}
        className={`${styles.admin__cart__title} ${darkModeClass}`}
      >
        <h3 className={`${styles.admin__cart__title__text} ${darkModeClass}`}>
          {showDoneIcon && (
            <span>
              <DoneSvg />
            </span>
          )}
          Оформленные заказы
        </h3>
        <button
          className={styles.admin__cart__top__btn}
          onClick={toggleCartDropDown}
        >
          {isMedia550 ? (
            <span>
              <ArrowSvg />
            </span>
          ) : !open ? (
            'Свернуть'
          ) : (
            'Развернуть'
          )}
        </button>
      </motion.div>
      <AnimatePresence initial={false}>
        {!open && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className={`${styles.admin__cart__content} ${darkModeClass}`}>
              <ul className={styles.admin__cart__list}>
                {shoppingCart.length ? (
                  shoppingCart
                    .sort()
                    .map((item) =>
                      isMedia550 ? (
                        <CartPopupItem key={item.id} item={item} />
                      ) : (
                        <OrderItem item={item} key={item.id} />
                      )
                    )
                ) : (
                  <li className={styles.admin__cart__empty}>
                    <li
                      className={`${styles.admin__cart__empty__text} ${darkModeClass}`}
                    />
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminOrder
