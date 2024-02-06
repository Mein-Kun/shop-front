/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getBestsellersOrNewPartsFx } from '@/app/api/avtoParts'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { IAvtoParts } from '@/types/avtoparts'
import styles from '@/styles/dashboard/index.module.scss'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import ServiceForm from '@/components/modules/FeedbackForm/ServiceForm'
// import { $shoppingCart } from '@/context/shopping-cart'
// import { AnimatePresence, motion } from 'framer-motion'
// import CartAlert from '@/components/modules/DashboardPage/CartAlert'

const DashboardPage = () => {
  const [newParts, setNewParts] = useState<IAvtoParts>({} as IAvtoParts)
  const [bestsellers, setBestsellers] = useState<IAvtoParts>({} as IAvtoParts)
  const [spinner, setSpinner] = useState(false)
  // const shoppingCart = useStore($shoppingCart)
  // const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadAvtoParts()
  }, [])

  // useEffect(() => {
  //   if (shoppingCart.length) {
  //     setShowAlert(true)
  //     return
  //   }

  //   setShowAlert(false)
  // }, [shoppingCart.length])

  const loadAvtoParts = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewPartsFx(
        '/avto-parts/bestsellers'
      )
      const newParts = await getBestsellersOrNewPartsFx('/avto-parts/new')

      setBestsellers(bestsellers)
      setNewParts(newParts)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  // const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        {/* <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert
                count={shoppingCart.reduce(
                  (defaultCount, item) => defaultCount + item.count,
                  0
                )}
                closeAlert={closeAlert}
              />
            </motion.div>
          )}
        </AnimatePresence> */}
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Детали для всех марок авто
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner} />
        </div>
        <div className={`${styles.dashboard__service} ${darkModeClass}`}>
          <div
            className={`${styles.dashboard__service__wrapper} ${darkModeClass}`}
          >
            <div
              className={`${styles.dashboard__service__wrapper__title} ${darkModeClass}`}
            >
              Записаться в автосервис
            </div>
            <div
              className={`${styles.dashboard__service__wrapper__text} ${darkModeClass}`}
            >
              <div>
                Компания Land Motors предоставляет услуги по ремонту и
                обслуживанию автомобилей в нашем автосервисе. Наши опытные
                механики готовы помочь вам с любыми проблемами, связанными с
                вашим автомобилем. Мы используем только качественные запчасти и
                оборудование, чтобы обеспечить нашим клиентам высокий уровень
                сервиса. Подробнее можно узнать в нашей{' '}
                <a
                  href="https://vk.com/landmotors59"
                  title="Land Motors"
                  className={`${styles.dashboard__service__wrapper__text__link} ${darkModeClass}`}
                >
                  вк группе.
                </a>
              </div>
              <img src="/img/serviceImg.jpg" alt="Сервис Land Motors" />
            </div>
          </div>
          <div
            className={`${styles.dashboard__service__form} ${darkModeClass}`}
          >
            <ServiceForm />
          </div>
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Land Motors - это компания, которая занимается продажей
            автозапчастей для автомобилей разных марок и моделей. Мы предлагаем
            широкий ассортимент запчастей для различных марок автомобилей,
            включая такие известные бренды, как Toyota, Honda, Volkswagen, BMW,
            Mercedes-Benz и многие другие.
          </p>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Наш интернет-магазин предоставляет возможность покупки запчастей
            онлайн, что удобно и экономит время на поиски нужной детали. В нашем
            каталоге вы найдете все необходимые запчасти для своего автомобиля,
            начиная от фильтров и тормозных колодок до двигателей и коробок
            передач.
          </p>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Кроме того, мы предоставляем услуги по ремонту и обслуживанию
            автомобилей в нашем автосервисе. Наши опытные механики готовы помочь
            вам с любыми проблемами, связанными с вашим автомобилем. Мы
            используем только качественные запчасти и оборудование, чтобы
            обеспечить нашим клиентам высокий уровень сервиса.
          </p>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Мы стремимся обеспечить нашим клиентам лучший сервис и качество
            продукции. Наша команда профессионалов готова ответить на все ваши
            вопросы и помочь вам с выбором нужной запчасти или услуги. Мы
            уверены, что вы останетесь довольны нашими услугами и продукцией.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
