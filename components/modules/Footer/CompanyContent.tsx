
import Link from 'next/link'
import styles from '@/styles/Footer/index.module.scss'
const CompanyContent = () => {
  return (
    <ul className={styles.footer__top__item__list}>
      <li className={styles.footer__top__item__list__item}>
         <Link href={`/about`}>
            О компании
         </Link>
      </li>
      <li className={styles.footer__top__item__list__item}>
         <Link href={`/contacts`}>
            Обратная связь
         </Link>
      </li>
      <li className={styles.footer__top__item__list__item}>
         <Link href={`/shopping-payment`}>
            Оптовым покупателя
         </Link>
      </li>
      <li className={styles.footer__top__item__list__item}>
         <Link href={`/contacts`}>
            Контакты
         </Link>
      </li>
    </ul>
  )
}

export default CompanyContent