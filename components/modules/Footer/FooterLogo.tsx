import styles from '@/styles/Footer/index.module.scss'
import Image from 'next/image'
import Link from 'next/link'
const FooterLogo = () => {
	return (
		<div className={styles.footer__top__item}>
			<Link href={`/dashboard`} className={styles.footer__top__item__logo}>
				<Image
					src={'/img/footer-logo.svg'}
					loading='lazy'
					alt='logo'
					width={30}
					height={40}
				/>
				<span className={styles.footer__top__item__text}>Одежда - Sandjma</span>
			</Link>
		</div>
	)
}

export default FooterLogo
