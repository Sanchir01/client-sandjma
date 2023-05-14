/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/dashboard/index.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { useMediaQuery } from '@/hooks/useMediaquery'
import skeletonStyles from '@/styles/Skeleton/index.module.scss'

import { IDashBoardSlider } from '@/types/ClotshParts.interface'
import { formatPrice } from '@/utils/common'
import Link from 'next/link'
import { FC, useEffect } from 'react'

const BrandsSlider: FC<IDashBoardSlider> = ({
	items,
	spinner,
	goToClothPage
}) => {
	const isMedia768 = useMediaQuery(768)
	const isMedia1366 = useMediaQuery(1366)
	const isMedia1030 = useMediaQuery(1030)
	const isMedia800 = useMediaQuery(800)
	const isMedia560 = useMediaQuery(560)

	useEffect(() => {
		const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

		slider.forEach(item => {
			const list = item.querySelector('.slick-list') as HTMLElement

			list.style.height = isMedia560 ? '276px' : '590px'
			list.style.padding = '0 5px'
			list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
		})
	}, [isMedia560, isMedia800])

	const settings = {
		dots: false,
		infinite: true,
		variableWidth: true,
		speed: 500,
		arrows: false,
		// slidesToShow: items.length >= 4 ? (isMedia1030 ? 3 : 4) : items.length - 1,
		slidesToScroll: isMedia768 ? 1 : 2
	}

	const width = {
		width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344
	}
	return (
		<Slider {...settings} className={styles.dashboard__slider}>
			{spinner ? (
				[...Array(8)].map(item => (
					<div
						className={skeletonStyles.skeleton__item}
						key={item}
						style={width}
					>
						<div className={skeletonStyles.skeleton__item__light} />
					</div>
				))
			) : items.length ? (
				items.map(item => (
					<Link
						href={goToClothPage ? `/catalog/${item.id}` : `/catalog`}
						className={styles.dashboard__slide}
						key={item.id}
						style={width}
					>
						<img loading='lazy' src={JSON.parse(item.images)} alt={item.name} />
						<div className={styles.dashboard__slide__inner}>
							<h3 className={styles.dashboard__slide__title}>{item.name}</h3>
							<span className={styles.dashboard__slide__code}></span>
							<span className={styles.dashboard__slide__price}>
								{formatPrice(item.price)} P
							</span>
						</div>
					</Link>
				))
			) : (
				<span>список товаров пуст</span>
			)}
		</Slider>
	)
}

export default BrandsSlider
