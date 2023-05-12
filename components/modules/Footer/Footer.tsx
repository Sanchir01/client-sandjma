/* eslint-disable @next/next/no-img-element */
import MailSVG from '@/components/elements/MailSVG/MailSVG'
import MarkerSVG from '@/components/elements/MarkerSVG/MarkerSVG'
import PhoneSVG from '@/components/elements/PhoneSVG/PhoneSVG'
import Link from 'next/link'
import { FC } from 'react'
import styles from '../../../styles/Footer/index.module.scss'
import CompanyContent from './CompanyContent'
import FooterLogo from './FooterLogo'
import OnlineStorContent from './OnlineStorContent'

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__top}>
					<FooterLogo />
					<div className={styles.footer__inner}>
						<div className={styles.footer__top__item}>
							<h3 className={styles.footer__top__item__title}>
								Интернет магазин
							</h3>
							<OnlineStorContent />
						</div>
						<div className={styles.footer__top__item}>
							<h3 className={styles.footer__top__item__title}>Компания</h3>
							<CompanyContent />
						</div>
						<div className={styles.footer__top__item}>
							<h3 className={styles.footer__top__item__title}>Контакты</h3>
							<ul
								className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
							>
								<li className={styles.footer__top__item__list__item}>
									<Link
										className={styles.footer__top__item__list__item__link}
										href={`/contacts`}
									>
										<span>Наш адрес:</span>
										<span>г. Элиста ул. ... д ...</span>
										<span>
											<MarkerSVG />
										</span>
									</Link>
									<li className={styles.footer__top__item__list__item}>
										<a
											className={styles.footer__top__item__list__item__link}
											href='tel:213213213213123'
										>
											<span>Наш контактный телефо:</span>
											<span>8888888888</span>
											<span>
												<PhoneSVG />
											</span>
										</a>
									</li>
								</li>
								<li className={styles.footer__top__item__list__item}>
									<a
										className={styles.footer__top__item__list__item__link}
										href='mailto:'
									>
										<span>E-mail:</span>
										<span>E-mail</span>
										<span>
											<MailSVG />
										</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={styles.footer__bottom}>
					<div className={styles.footer__bottom__block}>
						<div className={styles.footer__bottom__block__left}>
							<h3 className={styles.footer__bottom__block__title}>
								Мы принимаем к оплате
							</h3>
							<ul className={styles.footer__bottom__block__pay}>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src='/img/pay.png' loading='lazy' alt='apple-pay' />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src='/img/gpay.png' loading='lazy' alt='google-pay' />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src='/img/master-card.png' loading='lazy' alt='master' />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src='/img/visa.png' loading='lazy' alt='visa' />
								</li>
							</ul>
						</div>
						<div className={styles.footer__bottom__block__left}>
							<h3 className={styles.footer__bottom__block__title}>
								Мы в соцсетях
							</h3>
							<ul className={styles.footer__bottom__block__social}>
								<li className={styles.footer__bottom__block__social__item}>
									<Link
										className={styles.footer__bottom__block__social__item_vk}
										href={``}
									>
										<img src='/img/pay.png' alt='apple-pay' loading='lazy' />
									</Link>
								</li>
								<li className={styles.footer__bottom__block__social__item__fb}>
									<Link href={``}>
										<img src='/img/pay.png' alt='apple-pay' loading='lazy' />
									</Link>
								</li>
								<li
									className={styles.footer__bottom__block__social__item__inst}
								>
									<Link href={``}>
										<img src='/img/pay.png' alt='apple-pay' loading='lazy' />
									</Link>
								</li>
								<li className={styles.footer__bottom__block__social__item__ytb}>
									<Link href={``}>
										<img src='/img/pay.png' alt='apple-pay' loading='lazy' />
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.footer__bottom__block}>
						<p className={styles.footer__bottom__block__copyright}>
							© «Одежда - Sandjma» 2023.
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
