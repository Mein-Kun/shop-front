/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
} from '@/context/shopping-cart'
import { formatPrice } from '@/utils/common'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'
import { $mode } from '@/context/mode'
import { checkPaymentFx, makePaymentFx } from '@/app/api/payment'
import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import Link from 'next/link'
import { updateCardForAdmin } from '@/utils/shopping-cart'

const OrderPage = () => {
  const mode = useStore($mode)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  // const userCity = useStore($userCity)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [orderIsReady, setOrderIsReady] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const spinner = useStore(makePaymentFx.pending)
  const router = useRouter()
  const date = Number(
    Date.now()
      .toString()
      .replace(/\d\d\d\d/, '')
  )

  const handleAgreementChange = () => setAgreement(!agreement)

  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')
    const dateNow = sessionStorage.getItem('description')

    if (paymentId && dateNow) {
      const datee = Number(dateNow.replace(/[^\d]/g, ''))
      checkPayment(paymentId, datee)
    }
  }, [])

  const makePay = async () => {
    try {
      const data = await makePaymentFx({
        url: '/payment',
        order: date,
        amount: totalPrice,
        description: `Заказ № ${date}`,
      })
      const ddd = sessionStorage.setItem('paymentId', data.id)
      sessionStorage.setItem('description', data.description)
      router.push(data.confirmation.confirmation_url)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const checkPayment = async (paymentId: string, datee: number) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId,
      })

      if (data.status === 'succeeded') {
        resetCart(datee)
        return
      }
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  const resetCart = async (datee: number) => {
    sessionStorage.removeItem('paymentId')
    try {
      await updateCardForAdmin(datee, user.userId)
    } catch (error) {
      console.log((error as Error).message)
    }
    setShoppingCart([])
  }

  return (
    <section className={styles.order}>
      <div className="container">
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Оформление заказа
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
              Итого
            </h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div className={styles.order__pay__goods}>
                <span>Товары</span>
                <span>
                  {shoppingCart.reduce(
                    (defaultCount, item) => defaultCount + item.count,
                    0
                  )}
                </span>
              </div>
              <div className={styles.order__pay__total}>
                <span>На сумму</span>
                <span className={darkModeClass}>
                  {formatPrice(totalPrice)} P
                </span>
              </div>
              <button
                disabled={!(orderIsReady && agreement)}
                className={styles.order__pay__btn}
                onClick={makePay}
              >
                {spinner ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: '6px', left: '47%' }}
                  />
                ) : (
                  'Подтвердить заказ'
                )}
              </button>
              <label
                className={`${styles.order__pay__rights} ${darkModeClass}`}
              >
                <input
                  className={styles.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>Согласен с условиями</strong>{' '}
                  <Link href="/policy" passHref legacyBehavior>
                    <a>Политики конфиденциальности и возврата</a>
                  </Link>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
