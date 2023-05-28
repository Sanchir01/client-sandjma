/* eslint-disable @next/next/no-img-element */

import styles from '@/styles/CartPopup/index.module.scss'

import Link from 'next/link'

import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import DeleteSVG from '@/components/elements/DeleteSVG/DeleteSVG'
import spinnerStyles from '@/styles/Spinner/index.module.scss'
import { IShoppingCart } from '@/types/Shopping-car.interface'

import { usePrice } from '@/hooks/usePrice'
import { formatPrice } from '@/utils/common'

const CartPopupItem = ({ item }: { item: IShoppingCart }) => {
	const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
		usePrice(item.count, item.partId, item.price)

	return (
		<li className={styles.cart__popup__list__item}>
			<div className={styles.cart__popup__list__item__top}>
				<div className={styles.cart__popup__list__item__img}>
					<img src={JSON.parse(item.images)[0]} alt={item.name} />
				</div>
				<Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
					<a className={`${styles.cart__popup__list__item__text} }`}>
						<span>
							{item.name.replace('.', '')}, {item.cloth_manufacturer},{' '}
							{item.cloth_size}
						</span>
					</a>
				</Link>
				<button onClick={deleteCartItem}>
					<span>
						{spinner ? (
							<span
								className={`${spinnerStyles.spinner} `}
								style={{ top: 0, left: 0, width: 20, height: 20 }}
							/>
						) : (
							<DeleteSVG />
						)}
					</span>
				</button>
			</div>
			<div className={styles.cart__popup__list__item__bottom}>
				{item.in_stock === 0 ? (
					<span className={styles.cart__popup__list__item__empty}>
						Нет на складе
					</span>
				) : (
					<CartItemCounter
						totalCount={item.in_stock}
						partId={item.partId}
						initialCount={item.count}
						increasePrice={increasePrice}
						decreasePrice={decreasePrice}
					/>
				)}
				<span className={`${styles.cart__popup__list__item__price} `}>
					{formatPrice(price )} P
				</span>
			</div>
		</li>
	)
}

export default CartPopupItem
