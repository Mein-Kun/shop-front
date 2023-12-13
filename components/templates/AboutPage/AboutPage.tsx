/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/about/index.module.scss'

const AboutPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>
          О компании
        </h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
              Land Motors - это компания, которая занимается продажей
              автозапчастей для автомобилей разных марок и моделей. Мы
              предлагаем широкий ассортимент запчастей для различных марок
              автомобилей, включая такие известные бренды, как Toyota, Honda,
              Volkswagen, BMW, Mercedes-Benz и многие другие.
            </p>
            <p>
              Наш интернет-магазин предоставляет возможность покупки запчастей
              онлайн, что удобно и экономит время на поиски нужной детали. В
              нашем каталоге вы найдете все необходимые запчасти для своего
              автомобиля, начиная от фильтров и тормозных колодок до двигателей
              и коробок передач.
            </p>
            <p>
              Кроме того, мы предоставляем услуги по ремонту и обслуживанию
              автомобилей в нашем автосервисе. Наши опытные механики готовы
              помочь вам с любыми проблемами, связанными с вашим автомобилем. Мы
              используем только качественные запчасти и оборудование, чтобы
              обеспечить нашим клиентам высокий уровень сервиса.
            </p>
            <p>
              Мы стремимся обеспечить нашим клиентам лучший сервис и качество
              продукции. Наша команда профессионалов готова ответить на все ваши
              вопросы и помочь вам с выбором нужной запчасти или услуги. Мы
              уверены, что вы останетесь довольны нашими услугами и продукцией.
            </p>
            <p>
              Если вы ищете надежного поставщика автозапчастей и сервисного
              центра, то Land Motors - это именно то, что вам нужно. Свяжитесь с
              нами сегодня, чтобы получить более подробную информацию о наших
              услугах и продукции. Мы с нетерпением ждем вашего звонка или
              посещения нашего интернет-магазина и автосервиса.
            </p>
          </div>
          <div className={`${styles.about__img} ${styles.about__img__top}`}>
            <img src="/img/about-img.jpeg" alt="image-1" />
          </div>
          {/* <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
            <img src="/img/about-img.jpeg" alt="image-2" />
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default AboutPage
