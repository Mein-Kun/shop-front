/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const FooterLogo = () => (
  <div className={styles.footer__top__item}>
    <Link href="/" passHref legacyBehavior>
      <a className={styles.footer__top__item__logo}>
        <img
          src="/img/logo-footer-text-2.png"
          alt="logo"
          className={styles.footer__top__item__logo__imgtext2}
        />
        <img
          src="/img/logo-footer-text-1.png"
          alt="logo"
          className={styles.footer__top__item__logo__imgtext1}
        />
        <img
          src="/img/logo-footer.png"
          alt="logo"
          className={styles.footer__top__item__logo__img}
        />
      </a>
    </Link>
  </div>
)

export default FooterLogo
