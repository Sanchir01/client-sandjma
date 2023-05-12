import SearchInput from '@/components/elements/Header/SearchInput'
import SearchSVG from '@/components/elements/SearchSVG/SearchSVG'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from '../../../styles/Header/index.module.scss'
import CartPopup from './CartPopup/CartPopup'

const HeaderBot: FC = () => {
	return (
		<div className={styles.header__bottom}>
			<div className={`container ${styles.header__bottom__container}`}>
				<h1 className={styles.header__logo}>
					<Link className={styles.header__logo__link} href={`/dashboard`}>
						<Image width={32} height={32} src='/img/logo.svg' alt='logo' />
						<span className={styles.header__logo__link__text}>
							Одежда - Sandjma
						</span>
					</Link>
				</h1>
				
				<div className={styles.header__search}>
					<SearchInput />
					<button className={styles.header__search__btn}>
						<span className={styles.header__search__btn__span}>
							<SearchSVG />
						</span>
					</button>
				</div>
				<div className={styles.header__shopping_cart}>
					<CartPopup />
				</div>
			</div>
		</div>
	)
}

export default HeaderBot
