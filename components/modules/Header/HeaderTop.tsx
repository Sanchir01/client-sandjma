import CityButton from '@/components/elements/CityButton/CityButton'
import Link from 'next/link'
import styles from '../../../styles/Header/index.module.scss'
import ProfileDropDown from './ProfileDropDown'

const HeaderTop = () => {
	return (
		<div className={styles.header__top}>
			<div className={`container ${styles.header__top__container}`}>
				<CityButton />
				<nav className={styles.header__nav}>
					<ul className={styles.header__nav__list}>
						<li className={styles.header__nav__list__item}>
							<Link
								className={styles.header__nav__list__item__link}
								href={`/shopping-payment`}
								rel=''
							>
								Доставка и оплата
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								className={styles.header__nav__list__item__link}
								href={`/about`}
								rel=''
							>
								О нас
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								className={styles.header__nav__list__item__link}
								href={`/contacts`}
								rel=''
							>
								Контакты
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								className={styles.header__nav__list__item__link}
								href={`/contacts`}
								rel=''
							>
								123
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								className={styles.header__nav__list__item__link}
								href={`/wholesale-bayers`}
								rel=''
							>
								Оптовым покупателям
							</Link>
						</li>
					</ul>
				</nav>
				<ProfileDropDown />
			</div>
		</div>
	)
}

export default HeaderTop
