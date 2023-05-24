/* eslint-disable @next/next/no-img-element */
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheked/CartHoverChekedSVG'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { $shoppingCart } from '@/effector/shopping-cart'
import { AllAuth } from '@/service/Users.service'
import styles from '@/styles/Catalog/index.module.scss'
import spinnerStyles from '@/styles/Spinner/index.module.scss'
import { IUser } from '@/types/Auth.interface'
import { IClothParts } from '@/types/ClotshParts.interface'
import { toggleCartItem } from '@/utils/Shopping-cart'
import { formatPrice } from '@/utils/common'
import { useQuery } from '@tanstack/react-query'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useState } from 'react'

const CatalogItem = ({ item }: { item: IClothParts }) => {
	const [spinner, setSpinner] = useState(false)

	const shoppingCart = useStore($shoppingCart)
	const { data: id } = useQuery<IUser>({
		queryFn: () => AllAuth.loginCheck(),
		queryKey: ['logic']
	})
	const isInCart = shoppingCart.some(cartItem => cartItem.partId === item.id)
	const toggleToCart = () =>
		toggleCartItem(id!.username, item.id, isInCart, setSpinner)

	return (
		<li className={styles.catalog__list__item}>
			<Link href={`/catalog/${item.id}`}>
				<img src={JSON.parse(item.images)[0]} alt={item.name} loading='lazy' />
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
				className={`${styles.catalog__list__item__cart} ${
					isInCart ? styles.added : ''
				}`}
				disabled={spinner}
				onClick={toggleToCart}
			>
				{spinner ? (
					<div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
				) : (
					<span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
				)}
			</button>
		</li>
	)
}

export default CatalogItem
