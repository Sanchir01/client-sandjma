import styles from '@/styles/Footer/index.module.scss'
import Link from 'next/link'
const OnlineStorContent = () => {
	return (
		<ul className={styles.footer__top__item__list}>
			<li className={styles.footer__top__item__list__item}>
				<Link
					className={styles.footer__top__item__list__item__link}
					href={`/catalog`}
				>
					Каталог
				</Link>
			</li>
			<li className={styles.footer__top__item__list__item}>
				<Link
					href={`/shopping-payment`}
					className={styles.footer__top__item__list__item__link}
				>
					Доставка и оплата
				</Link>
			</li>
		</ul>
	)
}

export default OnlineStorContent
