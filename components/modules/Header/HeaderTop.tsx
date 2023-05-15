import CityButton from '@/components/elements/CityButton/CityButton'
import { useMediaQuery } from '@/hooks/useMediaquery'
import { usePopup } from '@/hooks/usePopap'
import Link from 'next/link'
import styles from '../../../styles/Header/index.module.scss'
import ProfileDropDown from './ProfileDropDown'

const HeaderTop = () => {
	const isMedia950 = useMediaQuery(950)
	const { toggleOpen, closePopup, open } = usePopup()
	return (
		<div className={styles.header__top}>
			<div className={`container ${styles.header__top__container}`}>
				{!isMedia950 && <CityButton />}
				{isMedia950 && (
					<button
						onClick={toggleOpen}
						className={`${styles.burger_menu} ${open ? styles.open : ''}`}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				)}
				<nav className={`${styles.header__nav} ${open ? styles.open : ''}`}>
					<ul className={styles.header__nav__list}>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								className={styles.header__nav__list__item__link}
								href={`/shopping-payment`}
								rel=''
							>
								Доставка и оплата
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								className={styles.header__nav__list__item__link}
								href={`/about`}
								rel=''
							>
								О нас
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								className={styles.header__nav__list__item__link}
								href={`/contacts`}
								rel=''
							>
								Контакты
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								className={styles.header__nav__list__item__link}
								href={`/catalog`}
								rel=''
							>
								Каталог
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								className={styles.header__nav__list__item__link}
								href={`/wholesale-buyers`}
								rel=''
							>
								Оптовым покупателям
							</Link>
						</li>
						{isMedia950 && (
							<li className={styles.header__nav__list__item}>
								<CityButton />
							</li>
						)}
					</ul>
				</nav>
				<ProfileDropDown />
			</div>
		</div>
	)
}

export default HeaderTop
