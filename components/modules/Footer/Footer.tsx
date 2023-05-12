/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/Footer/index.module.scss'
import FooterLogo from './FooterLogo'

import CompanyContent from './CompanyContent'

import Link from 'next/link'

import Accordion from '@/components/elements/Accordion/Accordion'
import MailSVG from '@/components/elements/MailSVG/MailSVG'
import MarkerSVG from '@/components/elements/MarkerSVG/MarkerSVG'
import PhoneSVG from '@/components/elements/PhoneSVG/PhoneSVG'
import { useMediaQuery } from '@/hooks/useMediaquery'
import OnlineStorContent from './OnlineStorContent'

const Footer = () => {
	const isMedia750 = useMediaQuery(750)
	const isMedia500 = useMediaQuery(500)

	return (
		<footer className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__top}>
					{!isMedia750 && <FooterLogo />}
					<div className={styles.footer__top__inner}>
						<div className={styles.footer__top__item}>
							{!isMedia500 && (
								<>
									<h3 className={styles.footer__top__item__title}>
										Интернет-магазин
									</h3>
									<OnlineStorContent />
								</>
							)}
							{isMedia500 && (
								<Accordion
									title='Интернет-магазин'
									titleClass={styles.footer__top__item__title}
									arrowOpenClass={styles.open}
								>
									<OnlineStorContent />
									<div style={{ height: 17 }} />
								</Accordion>
							)}
						</div>
						<div className={styles.footer__top__item}>
							{!isMedia500 && (
								<>
									<h3 className={styles.footer__top__item__title}>Компания</h3>
									<CompanyContent />
								</>
							)}
							{isMedia500 && (
								<Accordion
									title='Компания'
									titleClass={styles.footer__top__item__title}
									arrowOpenClass={styles.open}
								>
									<CompanyContent />
									<div style={{ height: 17 }} />
								</Accordion>
							)}
						</div>
					</div>
					<div className={styles.footer__top__item}>
						<h3 className={styles.footer__top__item__title}>Контакты</h3>
						<ul
							className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
						>
							<li className={styles.footer__top__item__list__item}>
								<Link
									href='/contacts'
									className={styles.footer__top__item__list__item__link}
								>
									<span>Наш адрес:</span>
									<span>г. Элиста, ул. ... д....</span>
									<span>
										<MarkerSVG />
									</span>
								</Link>
							</li>
							<li className={styles.footer__top__item__list__item}>
								<a
									href='tel:+780955555555'
									className={styles.footer__top__item__list__item__link}
								>
									<span>Наш контактный телефон:</span>
									<span>+7(8095) 555-55-55</span>
									<span>
										<PhoneSVG />
									</span>
								</a>
							</li>
							<li className={styles.footer__top__item__list__item}>
								<a
									href='mailto:info@zapchasti.com.ru'
									className={styles.footer__top__item__list__item__link}
								>
									<span>E-mail:</span>
									<span>test@test.com.ru</span>
									<span>
										<MailSVG />
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.footer__bottom}>
					<div className={styles.footer__bottom__block}>
						<div className={styles.footer__bottom__block__left}>
							<h3 className={styles.footer__bottom__block__title}>
								Мы принимаем к оплате:
							</h3>
							<ul className={styles.footer__bottom__block__pay}>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src='/img/pay.png' alt='apple-pay' />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src='/img/gpay.png' alt='google-pay' />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src='/img/master-card.png' alt='master-card' />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src='/img/visa.png' alt='visa' />
								</li>
							</ul>
						</div>
						<div className={styles.footer__bottom__block__right}>
							<h3 className={styles.footer__bottom__block__title}>
								Мы в соцсети:
							</h3>
							<ul className={styles.footer__bottom__block__social}>
								<li className={styles.footer__bottom__block__social__item}>
									<a
										href='#'
										className={styles.footer__bottom__block__social__item_vk}
									/>
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<a
										href='#'
										className={styles.footer__bottom__block__social__item_fb}
									/>
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<a
										href='#'
										className={styles.footer__bottom__block__social__item_inst}
									/>
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<a
										href='#'
										className={styles.footer__bottom__block__social__item_ytb}
									/>
								</li>
							</ul>
						</div>
					</div>
					{isMedia750 && <FooterLogo />}
					<div className={styles.footer__bottom__block}>
						<p className={styles.footer__bottom__block__copyright}>
							© «Детали для газовых котлов» 2021.
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
