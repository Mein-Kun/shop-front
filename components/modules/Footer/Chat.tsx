/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/footer/index.module.scss'
import MassangeSvg from '@/components/elements/MassangeSvg/MassangeSvg'
import { useState } from 'react'
import CloseMassangeSvg from '@/components/elements/MassangeSvg/CloseMassageSvg'
import VkSvg from '@/components/elements/SocialSvg/VkSvg'
import TelegramSvg from '@/components/elements/SocialSvg/TelegramSvg'

const Chat = () => {
  const [closeMassage, setCloseMassage] = useState(false)
  const [closeButton, setCloseButton] = useState(false)

  const handleClick1 = () => {
    setCloseMassage(true)
  }
  const handleClick2 = () => {
    closeButton ? setCloseButton(false) : setCloseButton(true)
  }

  return (
    <div className={styles.footer__chat}>
      {!closeMassage ? (
        <div className={styles.footer__chat__massage} id={'massange'}>
          <span
            className={styles.footer__chat__massage__close}
            onClick={handleClick1}
          />
          <div className={styles.footer__chat__massage__triangle} />
          <div className={styles.footer__chat__massage__content}>
            <div className={styles.footer__chat__massage__content__img} />
            <div className={styles.footer__chat__massage__content__text}>
              <div
                className={styles.footer__chat__massage__content__text__name}
              >
                Менеджер
              </div>
              <div
                className={
                  styles.footer__chat__massage__content__text__direction
                }
              >
                Здравствуйте! Мы всегда на связи, пишите нам если возникнут
                вопросы!
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
      {closeButton ? (
        <>
          <div className={styles.footer__chat__social}>
            <a
              className={styles.footer__chat__social__vk}
              href=""
              target="_blank"
            >
              <VkSvg />
            </a>
            <a
              className={styles.footer__chat__social__telegram}
              href=""
              target="_blank"
            >
              <TelegramSvg />
            </a>
          </div>
          <div className={styles.footer__chat__inner}>
            <div className={styles.footer__chat__inner__mask} />
            <div
              className={styles.footer__chat__inner__batton}
              onClick={handleClick2}
            >
              <div className={styles.footer__chat__inner__batton__pulse} />
              <div className={styles.footer__chat__inner__batton__block}>
                <CloseMassangeSvg />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* <div className={styles.footer__chat__social} /> */}
          <div className={styles.footer__chat__inner}>
            <div className={styles.footer__chat__inner__mask} />
            <div
              className={styles.footer__chat__inner__batton}
              onClick={handleClick2}
            >
              <div className={styles.footer__chat__inner__batton__pulse} />
              <div className={styles.footer__chat__inner__batton__block}>
                <MassangeSvg />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Chat
