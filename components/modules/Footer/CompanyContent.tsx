import styles from '@/styles/Footer/index.module.scss'
import Link from 'next/link'
const CompanyContent = () => {
	return (
		<ul className={styles.footer__top__item__list}>
			<li className={styles.footer__top__item__list__item}>
				<Link
					href={`/about`}
					className={styles.footer__top__item__list__item__link}
				>
					О компании
				</Link>
			</li>
			<li className={styles.footer__top__item__list__item}>
				<Link
					href={`/contacts`}
					className={styles.footer__top__item__list__item__link}
				>
					Обратная связь
				</Link>
			</li>
			<li className={styles.footer__top__item__list__item}>
				<Link
					href={`/shopping-payment`}
					className={styles.footer__top__item__list__item__link}
				>
					Оптовым покупателя
				</Link>
			</li>
			<li className={styles.footer__top__item__list__item}>
				<Link
					href={`/contacts`}
					className={styles.footer__top__item__list__item__link}
				>
					Контакты
				</Link>
			</li>
		</ul>
	)
}

export default CompanyContent
