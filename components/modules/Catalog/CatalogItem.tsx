/* eslint-disable @next/next/no-img-element */
import CartHoverSvg from '@/components/elements/CartHoverSVG/CartHoverSVG'
import styles from '@/styles/Catalog/index.module.scss'
import spinnerStyles from '@/styles/Spinner/index.module.scss'
import { IClothParts } from '@/types/ClotshParts.interface'
import { formatPrice } from '@/utils/common'
import Link from 'next/link'
import { useState } from 'react'

const CatalogItem = ({ item }: { item: IClothParts }) => {
	const [spinner, setSpinner] = useState(false)
	return (
		<li className={styles.catalog__list__item}>
			<Link href={`/catalog/${item.id}`}>
				<img src={JSON.parse(item.images)[0]} alt={item.name} />
			</Link>
			<div className={styles.catalog__list__item__inner}>
				<h3 className={styles.catalog__list__item__title}>{item.name}</h3>
				<span className={styles.catalog__list__item__code}>
					Артикул: {item.vendor_code}
				</span>
				<span className={styles.catalog__list__item__price}>
					{formatPrice(item.price)} P
				</span>
			</div>
			<button
				className={`${styles.catalog__list__item__cart} `}
				disabled={spinner}
			>
				{spinner ? (
					<div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
				) : (
					<CartHoverSvg />
				)}
			</button>
		</li>
	)
}

export default CatalogItem
